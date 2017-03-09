<template>
  <div>
    <h1 class="page-header">Schedule Overview</h1>

    <pagesection id="schedulelist" :renderImmediately="true">
      <h2 slot="header" class="sub-header">Schedule List</h2>
      <div slot="body">
        <datatable :colunmsProp="columns" :url="scheduleListUrl">
        </datatable>
     </div> 
    </pagesection>

    <pagesection id="schedule" :renderImmediately="true" v-on:fetchdata="loadSchedule">
      <h2 slot="header" class="sub-header">Schedule</h2>
      <div slot="body">
        <p></p>
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
    },
    methods: {
      loadSchedule() {
        console.log('loading schedule')
      }
    }
  }

</script>
