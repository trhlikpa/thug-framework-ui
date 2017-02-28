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
    <div>
      <filtertable></filtertable>
      <vuetable ref="vuetable" :api-url="url" :perPage=perPage :css="css" :fields="collums" pagination-path="" :per-page=perPage :sort-order="sortOrder"
        :appendParams="moreParams" @vuetable:pagination-data="onPaginationData" @vuetable:cell-clicked="onCellClicked"></vuetable>
      <div class="vuetable-pagination">
        <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
        <vuetable-pagination ref="pagination" :css="cssPagination" :icons="icons" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue'
  import FilterTable from './FilterTable.vue'
  import Vue from 'vue'

  Vue.component('filtertable', FilterTable)

  export default {
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo
    },
    data() {
      return {
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
          pageClass: 'btn btn-border',
          linkClass: 'btn btn-border',
        },
        icons: {
          first: '',
          prev: '',
          next: '',
          last: '',
        },
        searchFor: '',
        moreParams: {}
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
      searchFields: {
        type: Array,
        required: true
      },
      sortOrder: {
        type: Array,
        required: true
      },
      page: {
        type: Number
      },
      perPage: {
        type: Number
      }
    },
    methods: {
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)

        if (this.firstLoad) {
          this.$refs.vuetable.changePage(this.page)
          this.firstLoad = false
        }
      },
      onChangePage(page) {
        this.$refs.vuetable.changePage(page)
      },
      onCellClicked(data, field, event) {
        console.log('cellClicked: ', field.name)
        this.$refs.vuetable.toggleDetailRow(data.id)
      }
    },
    events: {
      'vuetable:load-success': function(response) {
        console.log('updating meta fields')
      },
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
    },
    beforeRouteLeave (to, from, next) {
      console.log('updating meta fields')
      console.log(to)
      this.$route.meta['page'] = this.$refs.vuetable.currentPage
      this.$route.meta['perPage'] = this.$refs.vuetable.perPage
      this.$route.meta['sort'] = this.$refs.vuetable.sortOrder[0].field
      this.$route.meta['direction'] = this.$refs.vuetable.sortOrder[0].direction  
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
