<template>
<div class="col-md-12">
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
    <template v-for="item in colunmsProp">
        <div v-if="item.searchType" class="form-group">
          <label class="control-label col-md-offset-1 col-sm-2" v-bind:for="item.name">{{ item.title }}: </label>
          <div v-if="item.searchType == 'string'" class="col-sm-6">
            <input type="text" class="form-control" v-model="item.value" v-bind:for="item.name">
          </div>
          <div v-else-if="item.searchType == 'select'" class="col-sm-6">
            <select class="form-control" v-model="item.value">
              <option v-for="selection in item.selections" v-bind:value="selection">
                {{ selection }}
              </option>
            </select>
          </div>
          <div v-else-if="item.searchType == 'date'">
            <template v-for="datepicker in item.datepickers">
              <div class="col-sm-3">
                  <datepicker v-model="datepicker.value" ref="datepicker" v-bind:id="datepicker.id"></datepicker>
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
      <div class="loader" v-show="fetching"></div>
      <vuetable
        v-show="!fetching"
        ref="vuetable"
        :load-on-start="false"
        :api-url="url"
        :detail-row-id="rowId"
        :perPage=perPage
        :css="css"
        :fields="collums"
        pagination-path=""
        :per-page=perPage
        :sort-order="sortOrder"
        :appendParams="moreParams"
        @vuetable:load-success="onTableLoad"
        @vuetable:loading="onTableLoading"
        @vuetable:loaded="onTableLoaded"
        @vuetable:pagination-data="onPaginationData"
        @vuetable:row-clicked="onRowClicked"></vuetable>
    </div>
    <div v-show="!fetching" class="vuetable-pagination">
      <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
      <vuetable-pagination ref="pagination" :css="cssPagination" :icons="icons" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue'
import DataFormating from '../mixins/DataFormating.vue'

export default {
  mixins: [DataFormating],
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
      advancedFilterTextTmp: null,
      simpleFilterText: '',
      fetching: true,
      css: {
        tableClass: 'table table-striped',
        ascendingIcon: 'glyphicon glyphicon-chevron-up',
        descendingIcon: 'glyphicon glyphicon-chevron-down',
        sortHandleIcon: 'glyphicon glyphicon-menu-hamburger'
      },
      cssPagination: {
        wrapperClass: 'pagination pull-right',
        activeClass: 'btn-primary',
        disabledClass: 'disabled',
        pageClass: 'btn btn-default',
        linkClass: 'btn btn-default'
      },
      icons: {
        first: '',
        prev: '',
        next: '',
        last: ''
      },
      moreParams: {}
    }
  },
  computed: {
    data() {
      return this.$refs.vuetable.tableData
    },
    advancedFilterText: {
      get: function() {
        if (this.advancedFilterTextTmp == null) {
          this.advancedFilterTextTmp = this.filterTextProp
        }
        return this.advancedFilterTextTmp
      },
      set: function(value) {
        this.advancedFilterTextTmp = value
      }
    },
    perPage: {
      get: function() {
        if (this.perPageTmp == 0) {
          this.perPageTmp = this.perPageProp
        }
        return this.perPageTmp
      },
      set: function(value) {
        this.perPageTmp = value
      }
    },
    collums: {
      get: function() {
        if (this.collumsTmp == null) {
          this.collumsTmp = this.colunmsProp.slice()
        }
        return this.collumsTmp
      },
      set: function(value) {
        this.collumsTmp = value
      }
    }
  },
  props: {
    advancedSearchEnabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      required: true
    },
    colunmsProp: {
      type: Array,
      required: true
    },
    sortOrder: {
      type: Array
    },
    pageProp: {
      type: Number
    },
    perPageProp: {
      type: Number
    },
    filterTextProp: {
      type: String
    },
    detailsRoute: {
      type: String,
      required: true
    }
  },
  methods: {
    onTableLoading() {
      this.fetching = true
    },
    onTableLoaded() {
      this.fetching = false
    },
    doSimpleFilter() {
      this.moreParams = {
        'filter': 'all|' + this.simpleFilterText.replace(/\|\|/g, '')
      }

      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    doAdvancedFilter() {
      var filterString = '';

      for (var i = 0; i < this.colunmsProp.length; i++) {
        if (this.colunmsProp[i].value) {
          var value = this.colunmsProp[i].value.replace(/\|\|/g, '')
          var entryFilter = this.colunmsProp[i].name + '|' + value + '||'
          filterString += entryFilter
        } else if (this.colunmsProp[i].datepickers) {
          var entryFilter = this.colunmsProp[i].name + '|'
          var empty = true
          for (var j = 0; j < this.colunmsProp[i].datepickers.length; j++) {
            if (this.colunmsProp[i].datepickers[j].value) {
              var value = this.colunmsProp[i].datepickers[j].value.replace(/\|\|/g, '')
            } else {
              if (j == 1) {
                var value = '9999-99-99T99:99:99.999999'
              } else {
                var value = 0
              }
            }
            entryFilter += value + '|'
            empty = false
          }
          if (!empty) {
            entryFilter += '|'
            filterString += entryFilter
          }
        }
      }

      this.advancedFilterText = filterString.slice(0, -2)

      this.moreParams = {
        'filter': this.advancedFilterText
      }

      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    activateAdvancedSearch() {
      this.isAdvancedSearch = true
    },
    deactivateAdvancedSearch() {
      this.isAdvancedSearch = false
      this.simpleFilterText = ''
      this.doSimpleFilter()
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
    onRowClicked(data, event) {
      this.$router.push({
        name: this.detailsRoute,
        params: {
          id: data._id.$oid
        }
      })
    },
    onTableLoad(response) {
      var page = this.$refs.vuetable.currentPage
      var perPage = this.$refs.vuetable.perPage
      var filter = this.moreParams['filter']
      var sort = null
      var dir = null

      var query = {}

      if (this.$refs.vuetable.sortOrder[0]) {
        var sort = this.$refs.vuetable.sortOrder[0].field
        var dir = this.$refs.vuetable.sortOrder[0].direction
      }

      if (page && page != 1) {
        query['page'] = page
      }

      if (perPage && perPage != 10) {
        query['per_page'] = perPage
      }

      if (sort && sort != 'submit_time' || dir && dir != 'desc') {
        query['sort'] = sort
        query['dir'] = dir
      }

      if (filter) {
        query['filter'] = filter
      }

      this.$router.push({
        query: query
      })
    }
  },
  watch: {
    'perPage': function(val, oldVal) {
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    }
  },
  mounted() {
    this.moreParams = {
      'filter': this.filterTextProp
    }

    Vue.nextTick(() => this.$refs.vuetable.refresh())
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
  width: 50%;
  float: left;
  margin-right: auto;
}

.control-label {
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
