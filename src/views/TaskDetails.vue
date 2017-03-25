<template>
<div v-if="fetching" class="loader">
</div>
<div v-else>
  <h1 class="page-header" v-if="task">{{'Task: ' + task._id.$oid}}</h1>
  <div class="row" v-if="task">
    <a class="btn btn-info" v-bind:href="/jobs/ + task.job_id.$oid">Back to list</a>
  </div>
  <a class="anchor main-anchor" id="taskdetails" title="Task Details"></a>
  <pagesection v-if="task" :renderImmediately="true">
    <span slot="title">Task Details</span>
    <div slot="body">
      <div class="row control-row">
        <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2><i class="glyphicon glyphicon-trash"></i> Delete task?</h2>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <a class="btn btn-danger btn-ok" data-dismiss="modal" @click="deleteTask">Delete</a>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-danger btn-lg control-btn" data-toggle="modal" data-target="#confirm-delete"><i class="glyphicon glyphicon-trash"></i>Delete task</button>
      </div>
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

  <a class="anchor main-anchor" id="exploits" title="Exploits"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchExploits">
    <span slot="title">Exploits</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.exploits">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.exploits || subresources.exploits.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.exploits">
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

  <a class="anchor main-anchor" id="graphs" title="Graphs"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchGraphs">
    <span slot="title">Graphs</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.graphs">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.graphs || subresources.graphs.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.graphs">
          <h3>{{'Graph ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry" v-if="subresources.options">
                <td colspan="2"><graph :valuesProp="item.graph" :baseUrl="task.url" :referer="subresources.options[0].thug.options.referer"></graph></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="locations" title="Locations"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchLocations">
    <span slot="title">Locations</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.locations">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.locations || subresources.locations.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.locations">
          <h3>{{'Location ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">URL:</td>
                <td class="value">{{item.url}}</td>
              </tr>
              <tr class="entry">
                <td class="name">HTTP status code:</td>
                <td class="value">{{item.status}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Content type:</td>
                <td class="value">{{item['content-type']}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Mime type:</td>
                <td class="value">{{item['mime-type']}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Data size:</td>
                <td class="value">{{item.size}}</td>
              </tr>
              <tr class="entry">
                <td class="name">MD5 checksum:</td>
                <td class="value">{{item.md5}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Sha-256 checksum:</td>
                <td class="value">{{item.sha256}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Flags:</td>
                <td class="value">{{item.flags}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Content ID:</td>
                <td class="value" v-if="item.content_id">{{item.content_id.$oid}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="connections" title="Connections"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchConnections">
    <span slot="title">Connections</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.connections">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.connections || subresources.connections.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.connections">
          <h3>{{'Connection ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Source URL:</td>
                <td class="value">{{item.source_url}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Destination URL:</td>
                <td class="value">{{item.destination_url}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Chain ID:</td>
                <td class="value">{{item.chain_id}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Method:</td>
                <td class="value">{{item.method}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Flags:</td>
                <td class="value">{{item.flags}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="samples" title="Samples"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchSamples">
    <span slot="title">Samples</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.samples">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.samples || subresources.samples.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.samples">
          <h3>{{'Sample ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">URL:</td>
                <td class="value">{{item.url}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Type:</td>
                <td class="value">{{item.type}}</td>
              </tr>
              <tr class="entry">
                <td class="name">MD5 checksum:</td>
                <td class="value">{{item.md5}}</td>
              </tr>
              <tr class="entry">
                <td class="name">SHA-1 checksum:</td>
                <td class="value">{{item.sha1}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Imphash:</td>
                <td class="value">{{item.imphash}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Sample ID:</td>
                <td class="value">{{item.sample_id}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="classifiers" title="Classifiers"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchClassifiers">
    <span slot="title">Classifiers</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.classifiers">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.classifiers || subresources.classifiers.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.classifiers">
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

  <a class="anchor main-anchor" id="behaviors" title="Behaviors"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchBehaviors">
    <span slot="title">Behaviors</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.behaviors">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.behaviors || subresources.behaviors.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.behaviors">
          <h3>{{'Behavior ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">CVE:</td>
                <td class="value">{{item.cve}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Method:</td>
                <td class="value">{{item.method}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Description:</td>
                <td class="value">{{item.description}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Timestamp:</td>
                <td class="value">{{dateFormat(item.timestamp)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="certificates" title="Certificates"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchCertificates">
    <span slot="title">Certificates</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.certificates">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.certificates || subresources.certificates.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.certificates">
          <h3>{{'Certificate ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">URL:</td>
                <td class="value">{{item.url}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Certificate:</td>
                <td class="value">{{item.certificate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="codes" title="Codes"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchCodes">
    <span slot="title">Codes</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.codes">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.codes || subresources.codes.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.codes">
          <h3>{{'Code ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Language:</td>
                <td class="value">{{item.language}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Method:</td>
                <td class="value">{{item.method}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Relationship:</td>
                <td class="value">{{item.relationship}}</td>
              </tr>
              <tr class="entry">
                <td colspan="2" v-html="codeFormat(item.snippet)"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="virustotal" title="Virustotal"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchVirusTotal">
    <span slot="title">Virus Total</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.virustotal">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.virustotal || subresources.virustotal.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.virustotal">
          <h3>{{'Virustotal ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Sample ID:</td>
                <td class="value" v-if="item.sample_id">{{item.sample_id.$oid}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Report:</td>
                <td class="value">{{item.report}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="honeyagent" title="Honeyagent"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchHoneyagent">
    <span slot="title">Honeyagent</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.honeyagent">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.honeyagent || subresources.honeyagent.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.honeyagent">
          <h3>{{'Honeyagent ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Sample ID:</td>
                <td class="value" v-if="item.sample_id">{{item.sample_id.$oid}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Report:</td>
                <td class="value">{{item.report}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="androguard" title="Androguard"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchAndroguard">
    <span slot="title">Androguard</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.androguard">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.androguard || subresources.androguard.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.androguard">
          <h3>{{'Androguard ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Sample ID:</td>
                <td class="value" v-if="item.sample_id">{{item.sample_id.$oid}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Report:</td>
                <td class="value">{{item.report}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <a class="anchor main-anchor" id="peepdf" title="Peepdf"></a>
  <pagesection :renderImmediately="false" v-on:fetchdata="fetchPeepdf">
    <span slot="title">Peepdf</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.peepdf">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.peepdf || subresources.peepdf.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.peepdf">
          <h3>{{'Peepdf ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Sample ID:</td>
                <td class="value" v-if="item.sample_id">{{item.sample_id.$oid}}</td>
              </tr>
              <tr class="entry">
                <td class="name">Report:</td>
                <td class="value">{{item.report}}</td>
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
import Anchors from '../mixins/Anchors.vue'
export default {
  mixins: [Api, DataFormating, Anchors],
  data() {
    return {
      fetching: true,
      task: null,
      subresourcesLoaded: {},
      subresources: {}
    }
  },
  methods: {
    deleteTask() {
      this.$http.delete(this.tasksUrl + this.$route.params.id + '/').then(response => {
        if (response.body.task) {
          console.log('task deleted: ', response.status)
          this.$router.push({
            name: 'JobDetails',
            params: {
              id: this.task.job_id.$oid
            }
          })
        }
      }, response => {
        console.log('error deleting task: ', response.status)
      });
    },
    fetchTask() {
      this.$http.get(this.tasksUrl + this.$route.params.id).then((response) => {
        this.task = response.body.task
        this.fetchSubresource('options')
        this.fetchSubresource('geolocation')
        this.fetching = false
        this.parseAnchors()
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
    fetchConnections() {
      this.fetchSubresource('connections')
    },
    fetchLocations() {
      this.fetchSubresource('locations')
    },
    fetchSamples() {
      this.fetchSubresource('samples')
    },
    fetchBehaviors() {
      this.fetchSubresource('behaviors')
    },
    fetchCertificates() {
      this.fetchSubresource('certificates')
    },
    fetchGraphs() {
      this.fetchSubresource('graphs')
    },
    fetchCodes() {
      this.fetchSubresource('codes')
    },
    fetchVirusTotal() {
      this.fetchSubresource('virustotal')
    },
    fetchHoneyagent() {
      this.fetchSubresource('honeyagent')
    },
    fetchAndroguard() {
      this.fetchSubresource('androguard')
    },
    fetchPeepdf() {
      this.fetchSubresource('peepdf')
    },
    fetchSubresource(subresource) {
      if (this.task._state != 'SUCCESSFUL') {
        Vue.set(this.subresourcesLoaded, subresource, true)
        return
      }
      Vue.set(this.subresourcesLoaded, subresource, false)
      this.$http.get(this.tasksUrl + this.$route.params.id + '/' + subresource).then((response) => {
        Vue.set(this.subresources, subresource, response.body[subresource])
        Vue.set(this.subresourcesLoaded, subresource, true)
        this.parseAnchors()
      }, (response) => {
        console.log('error loading task ' + subresource + ': ', response.status)
        Vue.set(this.subresourcesLoaded, subresource, true)
      })
    }
  },
  mounted() {
    this.fetchTask()
  }
}
</script>
