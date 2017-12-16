<template>
<div v-if="this.user.authenticated">
  <div class="loader" v-if="fetching">
  </div>
  <div v-else>
    <h1 class="page-header">Statistics</h1>
    <div class="row">
      <form class="form-horizontal" v-on:submit.prevent>
        <div class="form-group">
          <label for="inputUrl" class="control-label col-sm-2">URL:</label>
          <div class="col-sm-8">
            <input type="url" class="form-control" id="inputUrl" placeholder="URL" v-model="url" />
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2">Date from:</label>
          <div class='col-sm-3'>
            <datepicker v-model="from" id="fromDatepicker"></datepicker>
          </div>
          <label class="control-label col-sm-2">Date to:</label>
          <div class='col-sm-3'>
            <datepicker v-model="to" id="toDatepicker"></datepicker>
          </div>
        </div>
      </form>
    </div>
    <a class="anchor main-anchor" id="dataset" title="Dataset"></a>
    <pagesection v-if="tasks.length > 0" :renderImmediately="true">
      <span slot="title">Dataset</span>
      <div slot="body">
        <sunburstgraph v-model="selected"></sunburstgraph>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-5">
            <div class="row">
              <label><i class="colorbox allcolor" aria-hidden="true"></i> Total: {{selected.length}} </label>
            </div>
            <div class="row">
              <label><i class="colorbox successfulcolor" aria-hidden="true"></i> Successful: {{successfulCount}} </label>
            </div>
            <div class="row">
              <label><i class="colorbox failurecolor" aria-hidden="true"></i> Failed: {{failureCount}} </label>
            </div>
            <div class="row">
              <label><i class="colorbox pendingcolor" aria-hidden="true"></i> Pending: {{pendingCount}} </label>
            </div>
            <div class="row">
              <label><i class="colorbox startedcolor" aria-hidden="true"></i> Started: {{startedCount}} </label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="row">
              <label><i class="colorbox clearcolor" aria-hidden="true"></i> Clear: {{clearCount}} </label>
            </div>
            <div class="row">
              <label><i class="colorbox maliciouscolor" aria-hidden="true"></i> Malicious: {{maliciousCount}} </label>
            </div>
            <div class="row">
              <label><i class="colorbox sucpiciouscolor" aria-hidden="true"></i> Suspicious: {{suspicousCount}} </label>
            </div>
          </div>
          <div>
    </pagesection>

    <a class="anchor main-anchor" id="exploits" title="Exploits stats"></a>
    <pagesection v-if="exploits && tasks.length > 0" :renderImmediately="true">
      <span slot="title">Exploits stats</span>
      <div slot="body">
        <bargraph v-model="selectedExploits"></bargraph>
      </div>
    </pagesection>
    </div>
  </div>
</template>

<script>
import Anchors from '../mixins/Anchors.vue'
import Api from '../mixins/Api.vue'
import UserAuthentication from '../mixins/UserAuthentication.vue'
export default {
  mixins: [Api, Anchors, UserAuthentication],
  data() {
    return {
      tasks: [],
      exploits: [],
      selectedExploits: [],
      selected: [],
      url: null,
      from: null,
      to: null,
      fetching: true
    }
  },
  computed: {
    successfulCount() {
      var count = 0;
      for (var i = 0; i < this.selected.length; ++i) {
        if (this.selected[i]._state == 'SUCCESSFUL')
          count++;
      }
      return count
    },
    failureCount() {
      var count = 0;
      for (var i = 0; i < this.selected.length; ++i) {
        if (this.selected[i]._state == 'FAILURE')
          count++;
      }
      return count
    },
    pendingCount() {
      var count = 0;
      for (var i = 0; i < this.selected.length; ++i) {
        if (this.selected[i]._state == 'PENDING')
          count++;
      }
      return count
    },
    startedCount() {
      var count = 0;
      for (var i = 0; i < this.selected.length; ++i) {
        if (this.selected[i]._state == 'STARTED')
          count++;
      }
      return count
    },
    clearCount() {
      var count = 0;
      for (var i = 0; i < this.selected.length; ++i) {
        if (this.selected[i].classification == 'CLEAR')
          count++;
      }
      return count
    },
    maliciousCount() {
      var count = 0;
      for (var i = 0; i < this.selected.length; ++i) {
        if (this.selected[i].classification == 'MALICIOUS')
          count++;
      }
      return count
    },
    suspicousCount() {
      var count = 0;
      for (var i = 0; i < this.selected.length; ++i) {
        if (this.selected[i].classification == 'SUSPICIOUS')
          count++;
      }
      return count
    }
  },
  methods: {
    fetchTasks() {
      this.$http.get(this.tasksUrl + '?per_page=-1').then((response) => {
        this.tasks = response.body.data
        this.selected = response.body.data
        this.fetching = false
        this.parseAnchors()
      }, (response) => {
        console.log('error loading tasks: ', response.status)
        this.fetching = false
      })
    },
    fetchExploits() {
      this.$http.get(this.exploitsUrl).then((response) => {
        this.exploits = response.body.exploits
        this.selectedExploits = response.body.exploits
      }, (response) => {
        console.log('error loading exploits: ', response.status)
      })
    },
    updateSelected() {
      var vm = this
      this.selected = this.tasks
      if (vm.from != null) {
        vm.selected = vm.selected.filter(function(task) {
          return moment.utc(task.start_time).isAfter(vm.from)
        })
      }
      if (vm.to != null) {
        vm.selected = vm.selected.filter(function(task) {
          return moment.utc(task.start_time).isBefore(vm.toDate)
        })
      }
      if (vm.url != null) {
        vm.selected = vm.selected.filter(function(task) {
          return task.url.indexOf(vm.url) != -1
        })
      }

      var analysis_ids = []
      for (var i = 0; i < vm.selected.length; i++) {
        if (vm.selected[i].analysis_id != null) {
          analysis_ids.push(vm.selected[i].analysis_id.$oid)
        }
      }

      vm.selectedExploits = vm.exploits.filter(function(exploit) {
        return analysis_ids.indexOf(exploit.analysis_id.$oid) != -1
      })
    }
  },
  watch: {
    'url': function(val, oldVal) {
      this.updateSelected()
    },
    'from': function(val, oldVal) {
      this.updateSelected()
    },
    'to': function(val, oldVal) {
      this.updateSelected()
    }
  },
  mounted() {
    if (this.user.authenticated) {
      this.fetchTasks()
      this.fetchExploits()
    } else {
      this.$router.push('login')
    }
  }
}
</script>

<style>
.colorbox {
  float: left;
  width: 10px;
  height: 10px;
  margin: 6px;
  border: 1px solid rgba(0, 0, 0, .2);
}

.allcolor {
  background: black;
}

.pendingcolor {
  background: #7293cb;
}

.startedcolor {
  background: #90679d;
}

.failurecolor {
  background: #e1974c;
}

.sucpiciouscolor {
  background: #eec49b;
}

.successfulcolor {
  background: #84ba5b;
}

.clearcolor {
  background: #c9e1b7;
}

.maliciouscolor {
  background: #d35e60;
}
</style>
