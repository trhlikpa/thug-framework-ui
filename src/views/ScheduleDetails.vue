<template>
<div v-if="fetching" class="loader">
</div>
<div v-else>
  <h1 class="page-header" v-if="schedule">{{'Schedule: ' + schedule.name}}</h1>
  <div class="row" v-if="schedule">
    <a class="btn btn-info" href="/schedules/">Back to list</a>
  </div>
  <a class="anchor main-anchor" id="scheduledetails" title="Schedule details"></a>
  <pagesection v-if="schedule" :renderImmediately="true">
    <span slot="title">Schedule Details</span>
    <div slot="body">
      <div class="row control-row">
        <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2><i class="glyphicon glyphicon-trash"></i> Delete schedule?</h2>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <a class="btn btn-danger btn-ok" data-dismiss="modal" @click="deleteSchedule">Delete</a>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-danger btn-lg control-btn" data-toggle="modal" data-target="#confirm-delete"><i class="glyphicon glyphicon-trash"></i>Delete schedule</button>
        <button v-if="schedule.enabled" @click="pauseSchedule" class="btn btn-warning btn-lg control-btn"><i class="glyphicon glyphicon-pause"></i>Pause schedule</button>
        <button v-else @click="resumeSchedule" class="btn btn-success btn-lg control-btn"><i class="glyphicon glyphicon-play"></i>Resume schedule</button>
      </div>
      <div class="col-md-12">
        <a class="anchor" title="General Details" id="generaldetails"></a>
        <h3>General Details</h3>
        <table class="table details-table">
          <tbody>
            <tr class="entry">
              <td class="name">ID:</td>
              <td class="value">{{schedule._id.$oid}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Name:</td>
              <td class="value">{{schedule.name}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Submitter:</td>
              <td class="value">{{schedule.submitter}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Total runs:</td>
              <td class="value">{{schedule.previous_runs.length}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Max runs:</td>
              <td class="value">{{schedule.max_run_count}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Run after:</td>
              <td class="value">{{dateFormat(schedule.run_after)}}</td>
            </tr>
            <tr class="entry" v-if="schedule.cron">
              <td class="name">Cron:</td>
              <td class="value">{{schedule.cron}}</td>
            </tr>
            <tr class="entry" v-if="!schedule.cron && schedule.interval">
              <td class="name">Interval:</td>
              <td class="value">{{schedule.interval}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Last run at:</td>
              <td class="value">{{dateFormat(schedule.last_run_at)}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Enabled:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="schedule.enabled"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
          </tbody>
        </table>
        <a class="anchor" title="Job Template" id="jobtemplate"></a>
        <h3>Job template</h3>
        <table class="table details-table">
          <tbody>
            <tr class="entry">
              <td class="name">Url:</td>
              <td class="value">{{schedule.args[0].url}}</td>
            </tr>
            <tr class="entry">
              <td class="name">User agent:</td>
              <td class="value">{{schedule.args[0].useragent}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Referer:</td>
              <td class="value" v-if="schedule.args[0].args.referer">{{schedule.args[0].args.referer}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Proxy:</td>
              <td class="value" v-if="schedule.args[0].args.proxy">{{schedule.args[0].args.proxy}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Type:</td>
              <td class="value">{{schedule.args[0].type}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Depth limit:</td>
              <td class="value" v-if="schedule.args[0].args.type != 'singleurl'">{{schedule.args[0].args.depth_limit}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry" v-if="schedule.args[0].args.type != 'singleurl'">
              <td class="name">Domains:</td>
              <td class="value" v-if="schedule.args[0].args.allowed_domains && schedule.args[0].args.allowed_domains.length > 0">{{schedule.args[0].args.allowed_domains}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry" v-if="schedule.args[0].args.type != 'singleurl' && (!schedule.args[0].args.allowed_domains || schedule.args[0].args.allowed_domains.length < 1)">
              <td class="name">Only internal:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="schedule.args[0].args.only_internal"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="joblist" title="Previous runs"></a>
  <pagesection :renderImmediately="true">
    <span slot="title">Previous runs</span>
    <div slot="body">
      <datatable ref="datatable" :colunmsProp="jobcolumns" detailsRoute="JobDetails" :pageProp=page :perPageProp=perPage :filterTextProp=filter :sortOrder="[{field: sort, sortField: sort, direction: direction}]" :url="this.schedulestUrl + this.$route.params.id + '/jobs'">
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
      schedule: null,
      fetching: true,
      jobcolumns: [{
        name: 'name',
        title: 'Name',
        sortField: 'name',
        titleClass: 'text-center',
        dataClass: 'text-center namecell'
      }, {
        name: 'url',
        title: 'URL',
        sortField: 'url',
        dataClass: 'urlcell hoverable'
      }, {
        name: 'end_time',
        title: 'Finish Time',
        sortField: 'end_time',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'dateFormat'
      }, {
        name: '_state',
        title: 'Status',
        sortField: '_state',
        titleClass: 'text-center',
        dataClass: 'text-center statuscell',
        callback: 'statusFormat'
      }, {
        name: 'classification',
        title: 'Classification',
        sortField: 'classification',
        titleClass: 'text-center',
        dataClass: 'text-center classificationcell',
        callback: 'classificationFormat'
      }]
    }
  },
  methods: {
    pauseSchedule() {
      this.$http.put(this.schedulestUrl + this.$route.params.id + '/', {
        enabled: false,
        name: this.schedule.name
      }).then(response => {
        if (response.body.schedule) {
          this.schedule.enabled = false
          console.log('schedule paused: ', response.status)
        }
      }, response => {
        console.log('error pausing schedule: ', response.status)
      });
    },
    resumeSchedule() {
      this.$http.put(this.schedulestUrl + this.$route.params.id + '/', {
        enabled: true,
        name: this.schedule.name
      }).then(response => {
        if (response.body.schedule) {
          this.schedule.enabled = true
          console.log('schedule resumed: ', response.status)
        }
      }, response => {
        console.log('error resuming schedule: ', response.status)
      });
    },
    deleteSchedule() {
      this.$http.delete(this.schedulestUrl + this.$route.params.id + '/').then(response => {
        if (response.body.schedule) {
          console.log('schedule deleted: ', response.status)
          this.$router.push({
            name: 'Schedules'
          })
        }
      }, response => {
        console.log('error deleting schedule: ', response.status)
      });
    },
    fetchSchedule() {
      this.$http.get(this.schedulestUrl + this.$route.params.id).then((response) => {
        this.schedule = response.body.schedule
        this.fetching = false
        this.parseAnchors()
      }, (response) => {
        this.fetching = false
        console.log('error loading schedule: ', response.status)
      })
    }
  },
  mounted() {
    this.fetchSchedule()
  }
}
</script>

<style>

</style>
