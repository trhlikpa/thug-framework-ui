<template>
  <div>
    <h1 class="page-header">Jobs Overview</h1>

    <pagesection id="joblist" :renderImmediately="true">
      <span slot="title">Job List</span>
      <div slot="body">
        <datatable :colunmsProp="columns" :url="jobListUrl" :advancedSearchEnabled=true :pageProp=page :perPageProp=perPage :filterTextProp=filter
          :sortOrder="[{field: sort, sortField: sort, direction: direction}]">
        </datatable>
      </div>
    </pagesection>

    <pagesection id="dataset" :renderImmediately="true">
      <span slot="title">Dataset</span>
      <div slot="body">
        <div class="row placeholders">
          <div class="col-xs-6 <col>-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive"
              alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
          </div>
          <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive"
              alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
          </div>
          <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive"
              alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
          </div>
          <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive"
              alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
          </div>
        </div>
      </div>
    </pagesection>

  </div>
</template>


<script>
  import QueryStrings from '../mixins/QueryStrings.vue'
  import Api from '../mixins/Api.vue'
  export default {
    mixins: [QueryStrings, Api],
    data() {
      return {
        columns: [{
          name: 'type',
          title: 'Type',
          sortField: 'type',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'select',
          selections: ['singleurl', 'extensive']
        }, {
          name: 'name',
          title: 'Name',
          sortField: 'name',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'string'
        }, {
          name: 'submitter_id',
          title: 'Submitter',
          sortField: 'submitter_id',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'string'
        }, {
          name: 'url',
          title: 'URL',
          sortField: 'url',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'string'
        }, {
          name: 'useragent',
          title: 'User Agent',
          sortField: 'useragent',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'string'
        }, {
          name: 'schedule_id',
          title: 'Schedule',
          sortField: 'schedule_id',
          titleClass: 'text-center',
          dataClass: 'text-center'
        }, {
          name: 'end_time',
          title: 'Finish Time',
          sortField: 'end_time',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'date',
          datepickers: [{
            id: 'end_time_1'
          }, {
            id: 'end_time_2'
          }]
        }, {
          name: '_state',
          title: 'Status',
          sortField: '_state',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'select',
          selections: ['PENDING', 'STARTED', 'SUCCESSFUL', 'FAILURE']
        }, {
          name: 'classification',
          title: 'Classification',
          sortField: 'classification',
          titleClass: 'text-center',
          dataClass: 'text-center',
          searchType: 'select',
          selections: ['CLEAR', 'SUSPICIOUS', 'MALICIOUS']
        }]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
