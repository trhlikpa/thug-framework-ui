<template>
<div>
  <h1 class="page-header">Create new job</h1>
  <form class="form-horizontal" v-on:submit.prevent>
    <a class="anchor main-anchor" id="jobdetails" title="Job details"></a>
    <pagesection :renderImmediately="true">
      <span slot="title">Job Details</span>
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
            <label class="col-sm-2 control-label">User agent:</label>
            <div class="col-sm-3">
              <div class="btn-group btn-group-justified">
                <vueselect v-model="selectedUserAgents" :options="userAgents" multiple>
                </vueselect>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputJava" class="col-sm-2 control-label">Java Plugin:</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="inputJava" placeholder="default: 1.6.0.32" v-model="java" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAdobe" class="col-sm-2 control-label">Adobe Reader Plugin:</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="inputAdobe" placeholder="default: 9.1.0" v-model="adobepdf" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputFlash" class="col-sm-2 control-label">Shockwave Flash Plugin:</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="inputFlash" placeholder="default: 10.0.64.0" v-model="shockwave" />
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
      type: null,
      java: null,
      adobepdf: null,
      shockwave: null,
      userAgents: [],
      selectedUserAgents: [],
      scheduling: null
    }
  },
  computed: {
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
    }
  },
  mounted() {
    this.fetchUserAgents()
  }
}
</script>

<style scoped>
.input-group {
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.glyphicon-exclamation-sign {
  font-size: 18px;
}
</style>
