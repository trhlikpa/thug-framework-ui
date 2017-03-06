<template>
  <div>
    <h1 class="page-header">Jobs Overview</h1>
    <a class="anchor" id="joblist"></a>
    <h2 class="sub-header">Job list</h2>
    <datatable :collumsProp="columns" url="http://localhost:5000/api/v1.0/jobs/" :advancedSearchEnabled=true :pageProp=page :perPageProp=perPage :filterTextProp=filter :sortOrder="[{field: sort, sortField: sort, direction: direction}]">
    </datatable>
    <a class="anchor" id="dataset"></a>
    <h2 class="sub-header">Dataset</h2>
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
</template>

<script>
  import QueryStrings from '../mixins/QueryStrings.vue'
  export default {
    mixins: [QueryStrings],
    data() {
      return {
        columns: [{
          name: 'type',
          title: 'Type',
          sortField: 'type',
          searchType: 'select',
          selections: ['singleurl', 'extensive']
        }, {
          name: 'name',
          title: 'Name',
          sortField: 'name',
          searchType: 'string'
        }, {
          name: 'submitter_id',
          title: 'Submitter',
          sortField: 'submitter_id',
          searchType: 'string'
        }, {
          name: 'url',
          title: 'URL',
          sortField: 'url',
          searchType: 'string'
        }, {
          name: 'useragent',
          title: 'User Agent',
          sortField: 'useragent',
          searchType: 'string'
        }, {
          name: 'schedule_id',
          title: 'Schedule',
          sortField: 'schedule_id'
        }, {
          name: 'end_time',
          title: 'Finish Time',
          sortField: 'end_time',
          searchType: 'date',
          datepickers: [{id: 'end_time_1'}, {id: 'end_time_2'}]
        }, {
          name: '_state',
          title: 'Status',
          sortField: '_state',
          searchType: 'select',
          selections: ['PENDING', 'STARTED', 'SUCCESSFUL', 'FAILURE']
        }, {
          name: 'classification',
          title: 'Classification',
          sortField: 'classification',
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
