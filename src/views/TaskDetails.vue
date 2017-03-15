<template>
<div v-if="fetching" class="loader">
</div>
<div v-else>
  <h1 class="page-header" v-if="task">{{'Task: ' + task._id.$oid}}</h1>

  <pagesection id="taskdetails" v-if="task" :renderImmediately="true">
    <span slot="title">Task Details</span>
    <div slot="body">
      <div class="col-md- 12">
        <a class="anchor" title="General Details" id="generaldetails"></a>
        <h3>General Details</h3>
        <table class="table details-table">
          <tbody>
            <tr class="entry">
              <td class="name">ID:</td>
              <td class="value">{{task._id.$oid}}</td>
            </tr>
            <tr class="entry">
              <td class="name">URL:</td>
              <td class="value">{{task.url}}</td>
            </tr>
            <tr class="entry" v-if="subresources.geolocation">
              <td class="name">Country:</td>
              <td class="value" v-if="subresources.geolocation.country.iso_code">{{subresources.geolocation.country.iso_code}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry" v-if="subresources.geolocation">
              <td class="name">IP address:</td>
              <td class="value" v-if="subresources.geolocation.traits.ip_address">{{subresources.geolocation.traits.ip_address}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry" v-if="subresources.geolocation">
              <td class="name">Autonomous system number:</td>
              <td class="value" v-if="subresources.geolocation.traits.autonomous_system_number">{{subresources.geolocation.traits.autonomous_system_number}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Submit time:</td>
              <td class="value">{{dateFormat(task.submit_time)}}</td>
            </tr>
            <tr class="entry">
              <td class="name">Start time:</td>
              <td class="value">{{dateFormat(task.start_time)}}</td>
            </tr>
            <tr class="entry">
              <td class="name">End time:</td>
              <td class="value">{{dateFormat(task.end_time)}}</td>
            </tr>
            <tr class="entry font-bold">
              <td class="name">State:</td>
              <td class="value" v-if="task._state" v-html="statusFormat(task._state)"></td>
              <td class="value" v-else>TBD</td>
            </tr>
            <tr v-if="task._state && task._state=='FAILURE'" class="entry">
              <td class="name">Error:</td>
              <td class="value">{{task._error}}</td>
            </tr>
            <tr class="entry font-bold">
              <td class="name">Classification:</td>
              <td class="value" v-if="task.classification" v-html="classificationFormat(task.classification)"></td>
              <td class="value" v-else>TBD</td>
            </tr>
          </tbody>
        </table>
        <a class="anchor" v-if="subresources.options" title="Thug Details" id="thugdetails"></a>
        <h3 v-if="subresources.options">Thug Details</h3>
        <table class="table details-table" v-if="subresources.options && subresources.options[0].thug">
          <tbody>
            <tr class="entry">
              <td class="name">Thug Version:</td>
              <td class="value" v-if="subresources.options[0].thug.version">{{subresources.options[0].thug.version}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">User Agent:</td>
              <td class="value" v-if="subresources.options[0].thug.personality.useragent">{{subresources.options[0].thug.personality.useragent}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Referer:</td>
              <td class="value" v-if="subresources.options[0].thug.options.referer">{{subresources.options[0].thug.options.referer}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Java Plugin:</td>
              <td class="value" v-if="subresources.options[0].thug.plugins.javaplugin">{{subresources.options[0].thug.plugins.javaplugin}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Adobe Reader:</td>
              <td class="value" v-if="subresources.options[0].thug.plugins.acropdf">{{subresources.options[0].thug.plugins.acropdf}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Shockwave Flash:</td>
              <td class="value" v-if="subresources.options[0].thug.plugins.shockwaveflash">{{subresources.options[0].thug.plugins.shockwaveflash}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">Proxy:</td>
              <td class="value" v-if="subresources.options[0].thug.options.proxy">{{subresources.options[0].thug.options.proxy}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
            <tr class="entry">
              <td class="name">DOM events:</td>
              <td class="value" v-if="subresources.options[0].thug.options.events">{{subresources.options[0].thug.options.events}}</td>
              <td class="glyphicon glyphicon-remove text-danger" v-else></td>
            </tr>
          </tbody>
      </div>
    </div>
  </pagesection>

  <pagesection id="exploits" :renderImmediately="false" v-on:fetchdata="fetchExploits">
    <span slot="title">Exploits</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.exploits">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.exploits || subresources.exploits.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.exploits">
          <a class="anchor" v-bind:title="'Exploit ' + (index + 1)" v-bind:id="'exploit'+ (index + 1)"></a>
          <h3>{{'Exploit ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">URL:</td>
                <td class="value">{{item.url}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Module:</td>
                <td class="value">{{item.module}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Description:</td>
                <td class="value">{{item.description}}</td>
              </tr>
              <tr class="entry">
                <td class="name">CVE:</td>
                <td class="value" v-if="item.cve">{{item.cve}}</td>
                <td class="glyphicon glyphicon-remove text-danger" v-else></td>
              </tr>
              <tr class="entry">
                <td class="name">Data url:</td>
                <td class="value">{{item.data.url}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Data method:</td>
                <td >{{item.data.method}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Data async:</td>
                <td class="glyphicon glyphicon-ok text-success" v-if="item.data.async"></td>
                <td class="glyphicon glyphicon-remove text-danger" v-else></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <pagesection id="classifiers" :renderImmediately="false" v-on:fetchdata="fetchClassifiers">
    <span slot="title">Classifiers</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.classifiers">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.classifiers || subresources.classifiers.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.classifiers">
          <a class="anchor" v-bind:title="'Classifier ' + (index + 1)" v-bind:id="'classifier'+ (index + 1)"></a>
          <h3>{{'Classifier ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Classifier:</td>
                <td class="value">{{item.classifier}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Rule:</td>
                <td class="value">{{item.rule}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Tags:</td>
                <td class="value">{{item.tags}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>
</div>
</template>

<script>
import Vue from 'vue'
import Api from '../mixins/Api.vue'
import DataFormating from '../mixins/DataFormating.vue'
export default {
  mixins: [Api, DataFormating],
  data() {
    return {
      fetching: true,
      task: null,
      subresourcesLoaded: {},
      subresources: {}
    }
  },
  methods: {
    fetchTask() {
      this.$http.get(this.tasksUrl + this.$route.params.id).then((response) => {
        this.task = response.body.task
        this.fetchSubresource('options')
        this.fetchSubresource('geolocation')
        this.fetching = false
      }, (response) => {
        this.fetching = false
        console.log('error loading task: ', response.status)
      })
    },
    fetchExploits() {
      this.fetchSubresource('exploits')
    },
    fetchClassifiers() {
      this.fetchSubresource('classifiers')
    },
    fetchSubresource(subresource) {
      Vue.set(this.subresourcesLoaded, subresource, false)
      this.$http.get(this.tasksUrl + this.$route.params.id + '/' + subresource).then((response) => {
        Vue.set(this.subresources, subresource, response.body[subresource])
      }, (response) => {
        console.log('error loading task ' + subresource + ': ', response.status)
      })
      Vue.set(this.subresourcesLoaded, subresource, true)
    },
  },
  mounted() {
    this.fetchTask()
  }
}
</script>
