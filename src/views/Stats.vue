<template>
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
      <sunburstgraph :valuesProp="tasks"></sunburstgraph>
    </div>
  </pagesection>
</div>
</template>

<script>
import Anchors from '../mixins/Anchors.vue'
import Api from '../mixins/Api.vue'
export default {
  mixins: [Api, Anchors],
  data() {
    return {
      tasks: [],
      selected: [],
      url: null,
      from: null,
      to: null,
      fetching: true
    }
  },
  methods: {
    fetchTasks() {
      this.$http.get(this.tasksUrl + '?per_page=-1').then((response) => {
        this.tasks = response.body.data
        this.selected = response.body.data
      }, (response) => {
        console.log('error loading tasks: ', response.status)
      })
      this.fetching = false
    }
  },
  mounted() {
    this.fetchTasks()
    this.parseAnchors()
  }
}
</script>

<style>

</style>
