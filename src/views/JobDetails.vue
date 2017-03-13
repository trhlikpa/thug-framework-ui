<template>
<div v-if="fetching" class="loader">
</div>
<div v-else>
  <h1 class="page-header" v-if="job">{{'Job: ' + job.name}}</h1>

  <pagesection id="jobdetails" v-if="job" :renderImmediately="true">
    <span slot="title">Job Details</span>
    <div slot="body">
      <div class="col-md-12">
        <a class="anchor" title="General Details" id="generaldetails"></a>
        <h3>General Details</h3>
        <table class="table details-table">
          <tbody>
            <tr class="entry">
              <td class="name">ID:</td>
              <td class="value">{{job._id.$oid}}</td>
            </tr>
            <tr class="entry">
              <td class="name">URL:</td>
              <td class="value">{{job.url}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Name:</td>
              <td class="value">{{job.name}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Submitter:</td>
              <td class="value">{{job.submitter}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Type:</td>
              <td class="value">{{job.type}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Submit time:</td>
              <td class="value" v-if="job.submit_time">{{dateFormat(job.submit_time)}}</td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr class="entry">
              <td class="name">Start time:</td>
              <td class="value" v-if="job.start_time">{{dateFormat(job.start_time)}}</td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr class="entry">
              <td class="name">Finish time:</td>
              <td class="value" v-if="job.end_time">{{dateFormat(job.end_time)}}</td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr class="entry">
              <td class="name">State:</td>
              <td class="value" v-if="job._state" v-html="statusFormat(job._state)"></td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr v-if="job._state && job._state=='STARTED'" class="entry">
              <td class="name">Progress:</td>
              <div class="progress">
                <div class="progress-bar" role="progressbar" v-bind:aria-valuenow="successfulTasksCount + failedTasksCount" aria-valuemin="0" v-bind:aria-valuemax="totalTasks" v-bind:style="'width:' + jobProgress + '%'">
                  {{jobProgress + '% Complete'}}
                </div>
              </div>
            </tr>
            <tr v-if="job._state && job._state=='STARTED'" class="entry">
              <td class="name">Latest URL:</td>
              <td class="value">{{job._current_url}}</td>
            </tr>
            <tr v-if="job._state && job._state=='FAILURE'" class="entry">
              <td class="name">Error:</td>
              <td class="value">{{job._error}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Classification:</td>
              <td class="value" v-if="job.classification" v-html="classificationFormat(job.classification)"></td>
              <td class="value" v-else>TBD</td>
            </tr>
          </tbody>
        </table>
        <a class="anchor" title="Thug Details" id="thugdetails"></a>
        <h3>Thug Details</h3>
        <table class="table details-table">
          <tbody>
            <tr class="entry">
              <td class="name">Thug time limit:</td>
              <td class="value">{{job.thug_time_limit + 's'}}</td>
            </tr>
            <tr class="entry">
              <td class="name">User Agent:</td>
              <td class="value">{{job.useragent}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Referer:</td>
              <td class="value" v-if="job.args.referer">{{job.args.referer}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">No cache:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="job.args.no_cache"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Web tracking:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="job.args.web_tracking"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Java:</td>
              <td class="value" v-if="job.args.java">{{job.args.java}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Adobe Reader:</td>
              <td class="value" v-if="job.args.adobepdf">{{job.args.adobepdf}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Shockwave Flash:</td>
              <td class="value" v-if="job.args.shockwave">{{job.args.shockwave}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Proxy:</td>
              <td class="value" v-if="job.args.proxy">{{job.args.proxy}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">DOM events:</td>
              <td class="value" v-if="job.args.dom_events">{{job.args.dom_events}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">URL classifiers:</td>
              <td class="value" v-if="job.args.url_classifiers">{{job.args.url_classifiers}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">HTML classifiers:</td>
              <td class="value" v-if="job.args.html_classifiers">{{job.args.html_classifiers}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">JS classifiers:</td>
              <td class="value" v-if="job.args.js_classifiers">{{job.args.js_classifiers}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">VB classifiers:</td>
              <td class="value" v-if="job.args.vb_classifiers">{{job.args.vb_classifiers}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Sample classifiers:</td>
              <td class="value" v-if="job.args.sample_classifiers">{{job.args.sample_classifiers}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
          </tbody>
        </table>
        <a v-if="job.type == 'extensive'" class="anchor" title="Crawl Details" id="crawldetails"></a>
        <h3 v-if="job.type == 'extensive'">Crawl Details</h3>
        <table v-if="job.type == 'extensive'" class="table details-table">
          <tbody>
            <tr class="entry">
              <td class="name">Crawler time limit:</td>
              <td class="value">{{job.crawler_time_limit + 's'}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Crawler start time:</td>
              <td class="value" v-if="job.crawler_start_time">{{dateFormat(job.crawler_start_time)}}</td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr class="entry">
              <td class="name">Crawler end time:</td>
              <td class="value" v-if="job.crawler_end_time">{{dateFormat(job.crawler_end_time)}}</td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr class="entry">
              <td class="name">Depth limit:</td>
              <td class="value" v-if="job.args.depth_limit">{{job.args.depth_limit}}</td>
              <td class="value" v-else>1</td>
            </tr>
            <tr class="entry">
              <td class="name">Only Internal:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="job.args.only_internal"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Allowed domains:</td>
              <td class="value" v-if="job.allowed_domains">{{job.allowed_domains}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Download delay:</td>
              <td class="value" v-if="job.args.download_delay">{{job.args.download_delay + 's'}}</td>
              <td class="value" v-else>0s</td>
            </tr>
            <tr class="entry">
              <td class="name">Randomize download delay:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="job.args.randomize_download_delay"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Redirect max times:</td>
              <td class="value" v-if="job.args.redirect_max_times">{{job.args.redirect_max_times}}</td>
              <td class="value" v-else>0</td>
            </tr>
            <tr class="entry">
              <td class="name">Obey robotstxt rules:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="job.args.robotstxt_obey"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
          </tbody>
        </table>
        <a v-if="schedule" class="anchor" title="Schedule Details" id="scheduledetails"></a>
        <h3 v-if="schedule">Schedule Details</h3>
        <table v-if="schedule" class="table details-table">
          <tbody>
            <tr class="entry">
              <td class="name">Schedule ID:</td>
              <td class="value">{{schedule._id.$oid}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Schedule Name:</td>
              <td class="value" v-if="schedule.name">{{schedule.name}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Enabled:</td>
              <td class="glyphicon glyphicon-ok text-success" v-if="schedule.enabled"></td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Sequence:</td>
              <td class="value" v-if="schedule.previous_runs">{{ sequenceFormat(entry._id.$oid, schedule) }}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Max run count:</td>
              <td class="value" v-if="schedule.max_run_count">{{schedule.max_run_count}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Next run:</td>
              <td class="value" v-if="schedule.cron || schedule.interval">{{nextRunFormat(schedule)}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </pagesection>

  <pagesection id="tasklist" :renderImmediately="true">
    <span slot="title">Task List</span>
    <div slot="body">
      <datatable ref="datatable" :colunmsProp="taskcolumns" detailsRoute="taskDetails" :url="this.jobsUrl + this.$route.params.id + '/tasks'">
      </datatable>
    </div>
  </pagesection>
</div>
</template>

<script>
import QueryStrings from '../mixins/QueryStrings.vue'
import DataFormating from '../mixins/DataFormating.vue'
import Api from '../mixins/Api.vue'
export default {
  mixins: [QueryStrings, DataFormating, Api],
  data() {
    return {
      job: null,
      schedule: null,
      tasks: null,
      fetching: true,
      taskcolumns: [{
        name: 'url',
        title: 'URL',
        sortField: 'url',
        dataClass: 'urlcell hoverable'
      }, {
        name: '_state',
        title: 'Status',
        sortField: '_state',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'statusFormat'
      }, {
        name: 'classification',
        title: 'Classification',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'classificationFormat'
      }]
    }
  },
  computed: {
    selectedTasks() {
      return this.$refs.datatable.data
    },
    jobProgress() {
      return Math.ceil((this.successfulTasksCount + this.failedTasksCount) / this.totalTasks * 100)
    },
    totalTasks() {
      return this.job.tasks.length
    },
    successfulTasksCount() {
      return this.count('SUCCESSFUL', '_state')
    },
    failedTasksCount() {
      return this.count('FAILURE', '_state')
    },
    pendingTasksCount() {
      return this.count('PENDING', '_state')
    },
    startedTasksCount() {
      return this.count('STARTED', '_state')
    },
    maliciousTasksCount() {
      return this.count('MALICIOUS', 'classification')
    },
    suspiciousTasksCount() {
      return this.count('SUSPICIOUS', 'classification')
    },
    clearTasksCount() {
      return this.count('CLEAR', 'classification')
    }
  },
  methods: {
    count: function(value, field) {
      var count = 0
      for (var key in this.tasks) {
        if (this.tasks[key][field] == value) {
          count++
        }
      }
      return count
    },
    fetchJob() {
      this.$http.get(this.jobsUrl + this.$route.params.id).then((response) => {
        this.job = response.body.job

        if (this.job.schedule_id) {
          this.fetchSchedule(this.job.schedule_id.$oid)
        }

        if (this.job.tasks != null && this.job.tasks.length > 0) {
          this.getTasks()
        }

        this.fetching = false
      }, (response) => {
        this.fetching = false
        console.log('error loading job: ', response.status)
      })
    },
    getSchedule(scheduleId) {
      this.$http.get(this.schedulestUrl + scheduleId).then((response) => {
        this.schedule = response.body.schedule
      }, (response) => {
        console.log('error loading schedule: ', response.status)
      })
    },
    getTasks() {
      var pagesize = this.job.tasks.length + 1;
      this.$http.get(this.jobsUrl + this.$route.params.id + '/tasks/?per_page=' + pagesize).then((response) => {
        this.tasks = response.body.data
      }, (response) => {
        console.log('error loading tasks: ', response.status)
      })
    }
  },
  mounted() {
    this.fetchJob()
  }
}
</script>

<style>

</style>
