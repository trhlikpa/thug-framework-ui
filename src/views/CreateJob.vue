<template>
<div>
  <h1 class="page-header">Create new job</h1>
  <form class="form-horizontal" v-on:submit.prevent>
    <a class="anchor main-anchor" id="generalparameters" title="General parameters"></a>
    <pagesection :renderImmediately="true">
      <span slot="title">General parameters</span>
      <div slot="body">
        <div class="row">
          <div class="form-group">
            <label for="inputName" class="control-label col-sm-2">Name:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="inputName" placeholder="Job name" v-model="name" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputUrl" class="control-label col-sm-2">URL:</label>
            <div class="input-group col-sm-8">
              <div class="input-group-addon">
                <select class="selectpicker" id="protocol" v-model="protocol">
                  <option>http://</option>
                  <option>https://</option>
                </select>
              </div>
              <input type="url" class="form-control" id="inputUrl" placeholder="URL" v-model="url" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">User agent:</label>
            <div class="col-sm-3">
              <div class="btn-group btn-group-justified">
                <vueselect v-model="selectedUserAgents" :options="userAgents" multiple search>
                </vueselect>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Type:</label>
            <div class="col-sm-8">
              <div class="radio">
                <label><input type="radio" value="singleurl" name="crawlradio" v-model="type">Single URL</label>
              </div>
              <div class="radio">
                <label><input type="radio" value="extensive" name="crawlradio" v-model="type">Extensive crawling</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Run job:</label>
            <div class="col-sm-3">
              <div class="radio">
                <label><input type="radio" value="once" name="scheduleradio" v-model="scheduling">Once, as soon as possible</label>
              </div>
              <div class="radio">
                <label><input type="radio" value="date" name="scheduleradio" v-model="scheduling">Once, on specified date</label>
              </div>
              <div class="radio">
                <label><input type="radio" value="schedule" name="scheduleradio" v-model="scheduling">Periodically</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </pagesection>
    <a class="anchor main-anchor" id="thugparameters" title="Thug parameters"></a>
    <pagesection :renderImmediately="true">
      <span slot="title">Thug parameters</span>
      <div slot="body">
        <div class="row">
          <div class="form-group">
            <label for="inputThugLimit" class="col-sm-2 control-label">Thug time limit:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" id="inputThugLimit" v-model="thugTimeLimit" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputReferer" class="col-sm-2 control-label">Referer:</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="inputReferer" placeholder="about:blank" v-model="referer" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputJava" class="col-sm-2 control-label">Java plugin:</label>
            <div class="col-sm-3">
              <div class="btn-group btn-group-justified">
                <vueselect v-model="java" :options="plugins.java" search>
                </vueselect>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputAdobe" class="col-sm-2 control-label">Adobe Reader plugin:</label>
            <div class="col-sm-3">
              <div class="btn-group btn-group-justified">
                <vueselect v-model="adobepdf" :options="plugins.adobepdf" search>
                </vueselect>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputFlash" class="col-sm-2 control-label">Shockwave Flash plugin:</label>
            <div class="col-sm-3">
              <div class="btn-group btn-group-justified">
                <vueselect v-model="shockwave" :options="plugins.shockwave" search>
                </vueselect>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputProxy" class="col-sm-2 control-label">Proxy:</label>
            <div class="input-group col-sm-8">
              <div class="input-group-addon">
                <select class="selectpicker" id="proxyscheme" v-model="proxyScheme">
                  <option>http://</option>
                  <option>socks4://</option>
                  <option>socks5://</option>
                </select>
              </div>
              <input type="url" class="form-control" id="inputProxy" placeholder="[username:password@]host:port" v-model="proxy" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Disable local web cache:</label>
            <div class="col-sm-3">
              <togglebutton v-model="noCache" true-type="success" false-type="danger"></togglebutton>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Enable web tracking inspection:</label>
            <div class="col-sm-3">
              <togglebutton v-model="webTracking" true-type="success" false-type="danger"></togglebutton>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">DOM events:</label>
            <div class="col-sm-3">
              <div class="btn-group btn-group-justified">
                <vueselect v-model="selectedDomEvents" :options="supportedDomEvents" multiple search>
                </vueselect>
              </div>
            </div>
          </div>
        </div>
      </div>
    </pagesection>
    <a class="anchor main-anchor" id="crawlerparameter" title="Crawler parameters"></a>
    <pagesection :renderImmediately="true" :disabled="type != 'extensive'">
      <span slot="title">Crawler parameters</span>
      <div slot="body">
        <div class="row">
          <div class="form-group">
            <label for="inputDepth" class="control-label col-sm-2">Depth:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" id="inputDepth" v-model="depth" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Only interval:</label>
            <div class="col-sm-3">
              <togglebutton v-model="onlyInternal" true-type="success" false-type="danger"></togglebutton>
            </div>
          </div>
          <div class="form-group" v-if="!onlyInternal">
            <label for="inputDomains" class="control-label col-sm-2">Allowed domains:</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" v-model.lazy="allowedDomains" id="inputDomains" />
            </div>
          </div>
          <div class="form-group" v-if="!onlyInternal && (domainList && domainList.length > 0)">
            <label class="control-label col-sm-2">Domain list:</label>
            <div class="col-sm-8">
              <span>{{domainList}}</span>
            </div>
          </div>
        </div>
      </div>
    </pagesection>
  </form>
</div>
</template>

<script>
import Api from '../mixins/Api.vue'
export default {
  mixins: [Api],
  data() {
    return {
      name: null,
      protocol: null,
      proxyScheme: null,
      urlTmp: null,
      proxyTmp: null,
      type: 'singleurl',
      java: null,
      adobepdf: null,
      shockwave: null,
      plugins: {
        'java': [],
        'adobepdf': [],
        'shockwave': []
      },
      userAgents: [],
      selectedUserAgents: [],
      selectedDomEvents: [],
      supportedDomEvents: [],
      scheduling: 'once',
      referer: null,
      thugTimeLimit: 600,
      noCache: false,
      webTracking: false,
      depth: 1,
      onlyInternal: true,
      currentDomain: '',
      domainList: []
    }
  },
  computed: {
    allowedDomains: {
      get() {
        return this.currentDomain
      },
      set(value) {
        this.currentDomain = value
        this.domainList.push(value)
      }
    },
    url: {
      get() {
        return this.urlTmp
      },
      set(value) {
        if (value.slice(0, 8).includes('http://')) {
          this.protocol = 'http://'
          this.urlTmp = value.slice(7)
        } else if (value.slice(0, 8).includes('https://')) {
          this.protocol = 'https://'
          this.urlTmp = value.slice(8)
        } else {
          this.urlTmp = value
        }
      }
    },
    proxy: {
      get() {
        return this.proxyTmp
      },
      set(value) {
        if (value.startsWith('http://')) {
          this.proxyScheme = 'http://'
          this.proxyTmp = value.slice(7)
        } else if (value.startsWith('socks4://')) {
          this.proxyScheme = 'socks4://'
          this.proxyTmp = value.slice(9)
        } else if (value.startsWith('socks5://')) {
          this.proxyScheme = 'socks5://'
          this.proxyTmp = value.slice(9)
        } else {
          this.proxyTmp = value
        }
      }
    }
  },
  methods: {
    fetchUserAgents() {
      this.$http.get(this.userAgentsUrl).then((response) => {
        this.userAgents = response.body.map(function(obj) {
          return obj.name;
        });
      }, (response) => {
        console.log('error loading useragents: ', response.status)
      })
    },
    fetchPlugins() {
      this.$http.get(this.pluginsUrl).then((response) => {
        this.plugins = response.body
      }, (response) => {
        console.log('error loading plugins: ', response.status)
      })
    },
    fetchDomEvents() {
      this.$http.get(this.domEvents).then((response) => {
        var obj = response.body
        if (obj.mouse_events) {
          for (var i = 0; i < obj.mouse_events.length; i++) {
            this.supportedDomEvents.push('Mouse event: ' + obj.mouse_events[i])
          }
        }
        if (obj.html_events) {
          for (var i = 0; i < obj.html_events.length; i++) {
            this.supportedDomEvents.push('Html event: ' + obj.html_events[i])
          }
        }
        if (obj.storage_events) {
          for (var i = 0; i < obj.storage_events.length; i++) {
            this.supportedDomEvents.push('Storage event: ' + obj.storage_events[i])
          }
        }
        if (obj.ui_events) {
          for (var i = 0; i < obj.ui_events.length; i++) {
            this.supportedDomEvents.push('UI event: ' + obj.ui_events[i])
          }
        }

      }, (response) => {
        console.log('error loading DOM events: ', response.status)
      })
    }
  },
  mounted() {
    this.fetchUserAgents()
    this.fetchPlugins()
    this.fetchDomEvents()
  }
}
</script>

<style scoped>
.input-group {
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.form-group-header {
  border-bottom: 1px solid #E8E8E8;
  margin-top: 0px;
}
</style>
