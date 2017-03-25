<template>
<div>
  <h1 class="page-header">Schedule Overview</h1>

  <a class="anchor main-anchor" id="schedulelist" title="Schedule list"></a>
  <pagesection :renderImmediately="true">
    <span slot="title">Schedule List</span>
    <div slot="body">
      <datatable :colunmsProp="columns" detailsRoute="ScheduleDetails" :pageProp=page :perPageProp=perPage :filterTextProp=filter :url="schedulestUrl">
      </datatable>
    </div>
  </pagesection>
</div>
</template>

<script>
import QueryStrings from '../mixins/QueryStrings.vue'
import Anchors from '../mixins/Anchors.vue'
import Api from '../mixins/Api.vue'
export default {
  mixins: [QueryStrings, Api, Anchors],
  data() {
    return {
      columns: [{
        name: 'name',
        title: 'Name',
        sortField: 'name',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'submitter',
        title: 'Submitter',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'last_run_at',
        title: 'Last run',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'dateFormat'
      }, {
        name: 'next_run',
        title: 'Next run',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'dateFormat'
      }, {
        name: 'previous_runs.length',
        title: 'Total run count',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'max_run_count',
        title: 'Max run count',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'enabled',
        title: 'Enabled',
        sortField: 'enabled',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'boolFormat'
      }]
    }
  },
  mounted() {
    this.parseAnchors()
  }
}
</script>
