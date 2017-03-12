<template>
<div v-if="fetching" class="loader">
</div>
<div v-else>
  <h1 class="page-header" v-if="job">{{'Job: ' + job.name}}</h1>

  <pagesection id="jobdetails" v-if="job" :renderImmediately="true">
    <span slot="title">Job Details</span>
    <div slot="body">
      <div class="col-md-12">
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
              <td class="name">Submit Time:</td>
              <td class="value" v-if="job.submit_time">{{dateFormat(job.submit_time)}}</td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr class="entry">
              <td class="name">Start Time:</td>
              <td class="value" v-if="job.start_time">{{dateFormat(job.start_time)}}</td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr class="entry">
              <td class="name">Finish Time:</td>
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
                <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">
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
      </div>
    </div>
  </pagesection>
</div>
</template>

<script>
import QueryStrings from '../mixins/QueryStrings.vue'
import FieldsFormat from '../mixins/FieldsFormat.vue'
import Api from '../mixins/Api.vue'
export default {
  mixins: [QueryStrings, FieldsFormat, Api],
  data() {
    return {
      job: null,
      fetching: true,
      taskfields: [{
        name: 'url',
        title: 'URL',
        sortField: 'url'
      }, {
        name: '_state',
        title: 'Status',
        sortField: '_state',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'exploits',
        title: 'Classification',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }]
    }
  },
  methods: {
    fetchJob() {
      this.$http.get(this.jobsUrl + this.$route.params.id).then((response) => {
        this.job = response.body.job
        this.fetching = false
      }, (response) => {
        this.fetching = false
        console.log('error loading job: ', response.status)
      })
    }
  },
  mounted() {
    this.fetchJob()
  }
}
</script>

<style scoped>

</style>
