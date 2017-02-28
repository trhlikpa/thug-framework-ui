<template>
  <div>
    <h1 class="page-header">Jobs Overview</h1>
    <a class="anchor" id="section1"></a>
    <h2 class="sub-header">Job list: </h2>
    <datatable :collums="columns" url="http://localhost:5000/api/v1.0/jobs/" :pageProp=page :perPageProp=perPage :sortOrder="[{field: sort, sortField: sort, direction: direction}]" :search-fields="['url', 'name', 'finish_time', '_state', 'classification']">
    </datatable>
    <a class="anchor" id="dataset"></a>
    <h2 class="sub-header">Dataset</h2>
    <div class="row placeholders">
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
  export default {
    data() {
      return {
        perPage: parseInt(this.$route.query['per_page']) || 20,
        page: parseInt(this.$route.query['page']) || 1,
        sort: this.$route.query['sort'] || 'finish_time',
        direction: this.$route.query['dir'] || 'desc',
        columns: [{
          name: 'type',
          title: 'Type',
          sortField: 'type'
        }, {
          name: 'name',
          title: 'Name',
          sortField: 'name'
        }, {
          name: 'submitter_id',
          title: 'Submitter',
          sortField: 'submitter_id'
        }, {
          name: 'url',
          title: 'URL',
          sortField: 'url'
        }, {
          name: 'schedule_id',
          title: 'Schedule',
          sortField: 'schedule_id'
        }, {
          name: 'end_time',
          title: 'Finish Time',
          sortField: 'end_time'
        }, {
          name: '_state',
          title: 'Status',
          sortField: '_state'
        }, {
          name: 'classification',
          title: 'Classification',
          sortField: 'classification'
        }]
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
