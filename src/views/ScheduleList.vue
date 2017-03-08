<template>
  <div>
    <h1 class="page-header">Schedule Overview</h1>
    <a class="anchor" id="scheduleList"></a>
    <h2 class="sub-header">Schedule list</h2>
    <datatable :colunmsProp="columns" :url="scheduleListUrl">
    </datatable>
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
          name: 'crontab',
          title: 'Cron',
          titleClass: 'text-center',
          dataClass: 'text-center',
          callback: 'cronCallback'
        }, {
          name: 'last_run_at',
          title: 'Last run',
          titleClass: 'text-center',
          dataClass: 'text-center',
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
        }]
      }
    }
  }

</script>
