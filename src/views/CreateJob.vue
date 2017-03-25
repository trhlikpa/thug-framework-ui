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
              <input type="number" class="form-control" id="inputThugLimit" v-model.number="thugTimeLimit" />
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
        </div>
      </div>
    </pagesection>
    <a class="anchor main-anchor" id="crawlerparameter" title="Crawler parameters"></a>
    <pagesection :renderImmediately="true" :disabled="type != 'extensive'">
      <span slot="title">Crawler parameters</span>
      <div slot="body">
        <div class="row">
          <div class="form-group">
            <label for="inputCrawlerLimit" class="col-sm-2 control-label">Crawler time limit:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" id="inputCrawlerLimit" v-model.number="crawlerTimeLimit" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputDepth" class="control-label col-sm-2">Depth:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" id="inputDepth" v-model.number="depth" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputMaxRedirects" class="control-label col-sm-2">Redirect max times:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" id="inputMaxRedirects" v-model.number="redirectMaxTimes" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Follow only internal links:</label>
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
            <div class="col-sm-3">
              <template v-for="domain in domainList">
                <div class="row domain-row">
                  <span @click="removeFromDomailList(domain)" class="label label-info domain-label"><span>{{domain}}</span><a><i class="glyphicon glyphicon-remove"></i></a></span>
                </div>
</template>
            </div>
          </div>
          <div class="form-group">
            <label for="inputDelay" class="control-label col-sm-2">Download delay:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" id="inputDelay" v-model.number="downloadDelay" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Randomize download delay:</label>
            <div class="col-sm-3">
              <togglebutton v-model="rndDownloadDelay" true-type="success" false-type="danger"></togglebutton>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Obey robottxt rules:</label>
            <div class="col-sm-3">
              <togglebutton v-model="robotstxtObey" true-type="success" false-type="danger"></togglebutton>
            </div>
          </div>
        </div>
      </div>
    </pagesection>
    <a class="anchor main-anchor" id="scheduleparameters" title="Schedule parameters"></a>
    <pagesection :renderImmediately="true" :disabled="scheduling == 'once'">
      <span slot="title">Schedule parameters</span>
      <div slot="body" v-if="scheduling == 'date'">
        <div class="row">
          <div class="form-group">
            <label class="col-sm-2 control-label">Run after:</label>
            <div class="col-sm-3">
              <datepicker v-model="eta" id="date-etapicker"></datepicker>
            </div>
          </div>
        </div>
      </div>
      <div slot="body" v-else>
        <div class="row">
          <div class="form-group">
            <label class="col-sm-2 control-label">Run after:</label>
            <div class="col-sm-3">
              <datepicker v-model="scheduleEta" id="schedule-etapicker"></datepicker>
            </div>
          </div>
          <div class="form-group">
            <label for="inputMaxRunCount" class="control-label col-sm-2">Max run count:</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" id="inputMaxRunCount" v-model.number="maxRunCount" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputMinute" class="col-sm-2 control-label">Minute:</label>
            <div class="col-sm-3">
              <select class="form-control" id="inputMinute" v-model="schedule.minute">
              <option value="*">Every minute</option>
              <option value="*/5">Every 5 minutes</option>
              <option value="*/15">Every 15 minutes</option>
              <option value="*/30">Every 30 minutes</option>
            </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputHour" class="col-sm-2 control-label">Hour:</label>
            <div class="col-sm-3">
              <select class="form-control" id="inputHour" v-model="schedule.hour">
              <option value="*">Every hour</option>
              <option value="*/3">Every 3 hours</option>
              <option value="*/6">Every 6 hours</option>
              <option value="*/12">Every 12 hours</option>
            </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputDay" class="col-sm-2 control-label">Day of month:</label>
            <div class="col-sm-3">
              <select class="form-control" id="inputDay" v-model="schedule.day">
              <option value="*">Every day</option>
              <option value="*/5">Every 5 days</option>
              <option value="*/10">Every 10 days</option>
              <option value="*/15">Every 15 days</option>
              <option disabled class="separator"></option>
              <option v-for="n in 31">{{ n }}</option>
            </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputMonth" class="col-sm-2 control-label">Month:</label>
            <div class="col-sm-3">
              <select class="form-control" id="inputMonth" v-model="schedule.month">
              <option value="*">Every month</option>
              <option value="*/2">Even months</option>
              <option value="1-11/2">Odd months</option>
              <option value="*/3">Every 3 months</option>
              <option value="*/4">Every 4 months</option>
              <option value="*/6">Every half a year</option>
              <option disabled class="separator"></option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputWeekday" class="col-sm-2 control-label">Weekday:</label>
            <div class="col-sm-3">
              <select class="form-control" id="inputWeekday" v-model="schedule.weekday">
              <option value="*">Every weekday</option>
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
            </div>
          </div>
          <div class="row">
            <label class="col-sm-2 control-label">Cron:</label>
            <div class="col-sm-3">
              <label>{{ cronFormat(schedule) }}</label>
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
import DataFormating from '../mixins/DataFormating.vue'
import Anchors from '../mixins/Anchors.vue'
export default {
  mixins: [Api, Anchors, DataFormating],
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
      crawlerTimeLimit: 600,
      noCache: false,
      webTracking: false,
      depth: 1,
      onlyInternal: true,
      currentDomain: '',
      downloadDelay: 2,
      rndDownloadDelay: false,
      redirectMaxTimes: 30,
      robotstxtObey: false,
      domainList: [],
      eta: null,
      scheduleEta: null,
      maxRunCount: 10,
      schedule: {
        minute: '*',
        hour: '*',
        day: '*',
        month: '*',
        weekday: '*'
      }
    }
  },
  computed: {
    allowedDomains: {
      get() {
        return this.currentDomain
      },
      set(value) {
        if (value.trim()) {
          this.currentDomain = value
          this.domainList.push(value)
        }
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
    removeFromDomailList(value) {
      this.domainList = this.domainList.filter(item => item !== value);
    },
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
    this.parseAnchors()
  }
}
</script>

<style scoped>
.input-group {
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.domain-row {
  margin-bottom: 8px;
}

.domain-label {
  font-size: 13px;
}

.domain-label>a>i {
  margin-right: 0px;
  margin-left: 5px;
  top: 3px;
}

.form-group-header {
  border-bottom: 1px solid #E8E8E8;
  margin-top: 0px;
}

#schedule-etapicker {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
