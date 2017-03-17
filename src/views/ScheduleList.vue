<template>
<div>
  <h1 class="page-header">Schedule Overview</h1>

  <pagesection id="schedulelist" :renderImmediately="true">
    <div slot="body">
      <datatable :colunmsProp="columns" detailsRoute="scheduleDetails" :pageProp=page :perPageProp=perPage :filterTextProp=filter :url="schedulestUrl">
      </datatable>
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
        dataClass: 'text-center'
      }, {
        name: 'crontab',
        title: 'Next run',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'previous_runs.length',
        title: 'Total runs',
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
  methods: {
    loadSchedule() {
      console.log('loading schedule')
    }
  }
}
</script>
