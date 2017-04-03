<template>
<div>
  <h1 class="page-header">Jobs Overview</h1>

  <a class="anchor main-anchor" id="joblist" title="Job list"></a>
  <pagesection :renderImmediately="true">
    <span slot="title">Job list</span>
    <div slot="body">
      <div class="row control-row">
        <router-link to="/createjob"><a class="btn btn-success btn-lg control-btn"><i class="glyphicon glyphicon-plus"></i>Create new job</a></router-link>
      </div>
      <datatable :colunmsProp="columns" detailsRoute="JobDetails" :url="jobsUrl" :advancedSearchEnabled=true :pageProp=page :perPageProp=perPage :filterTextProp=filter :sortOrder="[{field: sort, sortField: sort, direction: direction}]">
      </datatable>
    </div>
  </pagesection>
</div>
</template>


<script>
import QueryStrings from '../mixins/QueryStrings.vue'
import DataFormating from '../mixins/DataFormating.vue'
import Anchors from '../mixins/Anchors.vue'
import Api from '../mixins/Api.vue'
export default {
  mixins: [QueryStrings, DataFormating, Api, Anchors],
  data() {
    return {
      columns: [{
        name: 'type',
        title: 'Type',
        sortField: 'type',
        titleClass: 'text-center',
        dataClass: 'typecell',
        callback: 'typeFormat',
        searchType: 'select',
        selections: ['singleurl', 'extensive']
      }, {
        name: 'name',
        title: 'Name',
        sortField: 'name',
        titleClass: 'text-center',
        dataClass: 'text-center namecell',
        searchType: 'string'
      }, {
        name: 'submitter_id',
        title: 'Submitter',
        sortField: 'submitter_id',
        titleClass: 'text-center',
        dataClass: 'text-center submittercell'
      }, {
        name: 'url',
        title: 'URL',
        sortField: 'url',
        titleClass: 'text-center',
        dataClass: 'urlcell hoverable',
        searchType: 'string'
      }, {
        name: 'useragent',
        title: 'User agent',
        sortField: 'useragent',
        titleClass: 'text-center',
        dataClass: 'text-center',
        searchType: 'string'
      }, {
        name: 'schedule_id',
        title: 'Schedule',
        sortField: 'schedule_id',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'scheduleFormat'
      }, {
        name: 'end_time',
        title: 'Finish time',
        sortField: 'end_time',
        titleClass: 'text-center',
        dataClass: 'text-center',
        searchType: 'date',
        callback: 'dateFormat',
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
        dataClass: 'text-center statuscell',
        callback: 'statusFormat',
        searchType: 'select',
        selections: ['PENDING', 'STARTED', 'SUCCESSFUL', 'FAILURE']
      }, {
        name: 'classification',
        title: 'Classification',
        sortField: 'classification',
        titleClass: 'text-center',
        dataClass: 'text-center classificationcell',
        callback: 'classificationFormat',
        searchType: 'select',
        selections: ['CLEAR', 'SUSPICIOUS', 'MALICIOUS']
      }]
    }
  },
  mounted() {
    this.parseAnchors()
  }
}
</script>

<style>
</style>
