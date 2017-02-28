// The MIT License (MIT) // // Copyright (c) 2017 Rati Wannapanop // // Permission is hereby granted, free of charge, to
any person obtaining a copy // of this software and associated documentation files (the "Software"), to deal // in the Software
without restriction, including without limitation the rights // to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell // copies of the Software, and to permit persons to whom the Software is // furnished to do so, subject to the
following conditions: // // The above copyright notice and this permission notice shall be included in all // copies or substantial
portions of the Software. // // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR // IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
SHALL THE // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER // LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE. // // Modified 2017 Pavel Trhlík

<template>
  <div>
    <filtertable></filtertable>
    <div class="table-responsive">
      <vuetable ref="vuetable" :api-url="url" :detail-row-id="rowId" :perPage=perPage :css="css" :fields="collums" pagination-path=""
        :per-page=perPage :sort-order="sortOrder" :appendParams="moreParams" @vuetable:load-success="onTableLoad" @vuetable:pagination-data="onPaginationData"
        @vuetable:cell-clicked="onCellClicked"></vuetable>
    </div>
    <div class="vuetable-pagination">
      <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
      <vuetable-pagination ref="pagination" :css="cssPagination" :icons="icons" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>

  </div>
</template>

<script>
  import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue'
  import FilterTable from './FilterTable.vue'
  import VueEvents from 'vue-events'
  import Vue from 'vue'

  Vue.use(VueEvents)
  Vue.component('filtertable', FilterTable)

  export default {
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo
    },
    data() {
      return {
        rowId: '_id.$oid',
        perPageTmp: 0,
        firstLoad: true,
        css: {
          tableClass: 'table table-striped table-bordered',
          loadingClass: 'loading',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down',
          sortHandleIcon: 'glyphicon glyphicon-menu-hamburger',
        },
        cssPagination: {
          wrapperClass: 'pagination pull-right',
          activeClass: 'btn-primary',
          disabledClass: 'disabled',
          pageClass: 'btn btn-default',
          linkClass: 'btn btn-default',
        },
        icons: {
          first: '',
          prev: '',
          next: '',
          last: '',
        },
        moreParams: {}
      }
    },
    computed: {
      perPage: function () {
        if (this.perPageTmp != 0) {
          return this.perPageTmp
        }

        return this.perPageProp
      }
    },
    props: {
      collums: {
        type: Array,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      sortOrder: {
        type: Array,
        required: true
      },
      pageProp: {
        type: Number
      },
      perPageProp: {
        type: Number
      }
    },
    methods: {
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)

        if (this.firstLoad) {
          this.$refs.vuetable.changePage(this.pageProp)
          this.firstLoad = false
        }
      },
      onChangePage(page) {
        this.$refs.vuetable.changePage(page)
      },
      onCellClicked(data, field, event) {
        console.log('cellClicked: ', field.name)
      },
      onTableLoad(response) {
        var page = this.$refs.vuetable.currentPage
        var perPage = this.$refs.vuetable.perPage
        var sort = this.$refs.vuetable.sortOrder[0].field
        var dir = this.$refs.vuetable.sortOrder[0].direction

        this.$router.push({
          query: {
            page: page,
            per_page: perPage,
            sort: sort,
            dir: dir
          }
        })
      }
    },
    events: {
      'filter-set' (filterText) {
        this.moreParams = {
          'filter': filterText
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      'filter-reset' () {
        this.moreParams = {}
        this.$refs.vuetable.refresh()
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vuetable-pagination {
    background-color: #fff !important;
    display: flex;
    justify-content: space-between;
  }
  
  .vuetable-pagination-info {
    margin-top: 8px !important;
  }

</style>
