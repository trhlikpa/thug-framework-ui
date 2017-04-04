<template>
<div v-if="this.user.authenticated">
  <h1 class="page-header">Schedule Overview</h1>
  <a class="anchor main-anchor" id="schedulelist" title="Schedule list"></a>
  <pagesection :renderImmediately="true">
    <span slot="title">Schedule list</span>
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
import UserAuthentication from '../mixins/UserAuthentication.vue'
export default {
  mixins: [QueryStrings, Api, Anchors, UserAuthentication],
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
    if (this.user.authenticated) {
      this.parseAnchors()
    } else {
      this.$router.push('login')
    }
  }
}
</script>
