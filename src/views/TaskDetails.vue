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

  <pagesection id="locations" :renderImmediately="false" v-on:fetchdata="fetchLocations">
    <span slot="title">Locations</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.locations">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.locations || subresources.locations.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.locations">
          <a class="anchor" v-bind:title="'Location ' + (index + 1)" v-bind:id="'location'+ (index + 1)"></a>
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

  <pagesection id="connections" :renderImmediately="false" v-on:fetchdata="fetchConnections">
    <span slot="title">Connections</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.connections">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.connections || subresources.connections.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.connections">
          <a class="anchor" v-bind:title="'Connection ' + (index + 1)" v-bind:id="'connection'+ (index + 1)"></a>
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

  <pagesection id="samples" :renderImmediately="false" v-on:fetchdata="fetchSamples">
    <span slot="title">Samples</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.samples">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.samples || subresources.samples.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.samples">
          <a class="anchor" v-bind:title="'Sample ' + (index + 1)" v-bind:id="'sample'+ (index + 1)"></a>
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

  <pagesection id="behaviors" :renderImmediately="false" v-on:fetchdata="fetchBehaviors">
    <span slot="title">Behaviors</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.behaviors">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.behaviors || subresources.behaviors.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.behaviors">
          <a class="anchor" v-bind:title="'Behavior ' + (index + 1)" v-bind:id="'behavior'+ (index + 1)"></a>
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
                <td class="value">{{formatDate(item.timestamp)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <pagesection id="certificates" :renderImmediately="false" v-on:fetchdata="fetchCertificates">
    <span slot="title">Certificates</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.certificates">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.certificates || subresources.certificates.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.certificates">
          <a class="anchor" v-bind:title="'Certificate ' + (index + 1)" v-bind:id="'certificate'+ (index + 1)"></a>
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

  <pagesection id="graphs" :renderImmediately="false" v-on:fetchdata="fetchGraphs">
    <span slot="title">Graphs</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.graphs">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.graphs || subresources.graphs.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.graphs">
          <a class="anchor" v-bind:title="'Graph ' + (index + 1)" v-bind:id="'graph'+ (index + 1)"></a>
          <h3>{{'Graph ' + (index + 1)}}</h3>
          <table class="table details-table">
            <tbody>
              <tr class="entry">
                <td class="name">Graph:</td>
                <td class="value">{{item.graph}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <pagesection id="codes" :renderImmediately="false" v-on:fetchdata="fetchCodes">
    <span slot="title">Codes</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.codes">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.codes || subresources.codes.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.codes">
          <a class="anchor" v-bind:title="'Code ' + (index + 1)" v-bind:id="'code'+ (index + 1)"></a>
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
                <td class="name">Snippet:</td>
                <td class="value">{{item.snippet}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagesection>

  <pagesection id="virustotal" :renderImmediately="false" v-on:fetchdata="fetchVirusTotal">
    <span slot="title">Virus Total</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.virustotal">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.virustotal || subresources.virustotal.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.virustotal">
          <a class="anchor" v-bind:title="'Virustotal ' + (index + 1)" v-bind:id="'virustotal'+ (index + 1)"></a>
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

  <pagesection id="honeyagent" :renderImmediately="false" v-on:fetchdata="fetchHoneyagent">
    <span slot="title">Honeyagent</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.honeyagent">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.honeyagent || subresources.honeyagent.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.honeyagent">
          <a class="anchor" v-bind:title="'Honeyagent ' + (index + 1)" v-bind:id="'honeyagent'+ (index + 1)"></a>
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

  <pagesection id="androguard" :renderImmediately="false" v-on:fetchdata="fetchAndroguard">
    <span slot="title">Androguard</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.androguard">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.androguard || subresources.androguard.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.androguard">
          <a class="anchor" v-bind:title="'Androguard ' + (index + 1)" v-bind:id="'androguard'+ (index + 1)"></a>
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

  <pagesection id="peepdf" :renderImmediately="false" v-on:fetchdata="fetchPeepdf">
    <span slot="title">Peepdf</span>
    <div slot="body" class="loader" v-if="!subresourcesLoaded.peepdf">
    </div>
    <div slot="body" v-else>
      <div class="col-md-12">
        <div v-if="!subresources.peepdf || subresources.peepdf.length < 1">
          <p>No relevant data</p>
        </div>
        <div v-else v-for="(item, index) in subresources.peepdf">
          <a class="anchor" v-bind:title="'Peepdf ' + (index + 1)" v-bind:id="'peepdf'+ (index + 1)"></a>
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
      Vue.set(this.subresourcesLoaded, subresource, false)
      this.$http.get(this.tasksUrl + this.$route.params.id + '/' + subresource).then((response) => {
        Vue.set(this.subresources, subresource, response.body[subresource])
        Vue.set(this.subresourcesLoaded, subresource, true)
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
