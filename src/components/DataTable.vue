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
    <div class="row">
      <div class="form-inline form-group page-form">
        <label class="control-label">Show</label>
        <select v-model.number="perPageTmp" class="form-control">
          <option value=5>5</option>
					<option value=10>10</option>
					<option value=25>25</option>
					<option value=50>50</option>
					<option value=100>100</option>
				</select>
        <label class="control-label">Entries</label>
      </div>
      <div class="form-inline form-group pull-right">
        <label v-if="!isAdvancedSearch" class="control-label">Search:</label>
        <input v-if="!isAdvancedSearch" class="form-control" type="text" v-model="simpleFilterText" @keyup.enter="doSimpleFilter">
        <button v-if="!isAdvancedSearch" class="btn btn-default" @click="doSimpleFilter">Go</button>
        <button @click="activateAdvancedSearch" v-if="!isAdvancedSearch && advancedSearchEnabled" class="btn btn-default">
        <span  class="glyphicon glyphicon-cog"></span> Advanced Search
      </button>
        <button @click="deactivateAdvancedSearch" v-if="isAdvancedSearch" class="btn btn-default">
        <span class="glyphicon glyphicon-cog"></span> Simple Search
      </button>
      </div>
    </div>
    <form v-if="isAdvancedSearch" class="form-horizontal">
      <template v-for="item in collumsProp">
        <div v-if="item.searchType" class="form-group">
          <label class="control-label col-md-offset-1 col-sm-2" v-bind:for="item.name">{{ item.title }}: </label>
          <div v-if="item.searchType == 'string'" class="col-sm-6">
            <input type="text" class="form-control" v-bind:for="item.name">
          </div>
          <div v-else-if="item.searchType == 'select'" class="col-sm-6">
            <select class="form-control">
              <option v-for="selection in item.selections" v-bind:value="selection">
                {{ selection }}
              </option>
            </select>
          </div>
          <div v-else-if="item.searchType == 'date'">
            <template v-for="datepicker in item.datepickers">
              <div class="col-sm-3">
                  <datepicker  ref="datepicker" v-bind:id="datepicker"></datepicker>
              </div>
            </template>
          </div>
        </div>
      </template>
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-4">
          <button @click.prevent="doAdvancedFilter" class="btn btn-default">Search</button>
        </div>
      </div>
    </form>
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
  import VueEvents from 'vue-events'
  import Vue from 'vue'

  Vue.use(VueEvents)

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
        collumsTmp: null,
        firstLoad: true,
        isAdvancedSearch: false,
        simpleFilterText: '',
        css: {
          tableClass: 'table table-striped',
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
      perPage: {
        get: function () {
          if (this.perPageTmp == 0) {
            this.perPageTmp = this.perPageProp
          }
          return this.perPageTmp
        },
        set: function (value) {
          this.perPageTmp = value
        }
      },
      collums: {
        get: function () {
          if (this.collumsTmp == null) {
            this.collumsTmp = this.collumsProp.slice()
          }
          return this.collumsTmp
        },
        set: function (value) {
          this.collumsTmp = value
        }
      }
    },
    props: {
      advancedSearchEnabled: {
        type: Boolean,
        required: true
      },
      collumsProp: {
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
      doSimpleFilter() {
        this.moreParams = {
          'filter': this.simpleFilterText
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      doAdvancedFilter() {
        console.log(this.$refs.datepicker[0].getDate())
      },
      activateAdvancedSearch() {
        this.isAdvancedSearch = true
      },
      deactivateAdvancedSearch() {
        this.isAdvancedSearch = false
      },
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
    watch: {
      'perPage': function (val, oldVal) {
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
  
  .row {
    justify-content: space-between;
    display: flex;
  }
  
  .page-form {
    width: 20%;
    float: left;
    margin-right: auto;
  }
  
  .control-label {
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
  }
  
  .form-horizontal {
    background-color: #F9F9F9;
    padding-top: 15px;
    border: 1px solid #ddd;
  }
  
  .form-horizontal .control-label {
    text-align: right !important;
  }

</style>
