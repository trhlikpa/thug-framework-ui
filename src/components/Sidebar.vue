<template>
<div class="col-sm-3 col-md-2 sidebar">
  <ul ref="sidebar" class="nav nav-sidebar" v-if="anchors">
    <template v-for="anchor in anchors">
      <li><a v-bind:href="'#' + anchor.id" v-bind:class="{ sectionlink: anchor.classList.contains('main-anchor') }">{{anchor.title}}</a></li>
    </template>
  </ul>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      anchors: []
    }
  },
  methods: {
    parseAnchors() {
      var tmp = []
      var elems = $('.anchor')
      for (var i = 0; i < elems.length; i++) {
        tmp.push(elems[i])
      }
      this.anchors = tmp
    }
  }
}
</script>

<style>
.nav-sidebar {
  margin-right: -21px;
  margin-bottom: 20px;
  margin-left: -20px;
}

.nav-sidebar>li>a {
  padding-right: 20px;
  padding-left: 40px;
  font-weight: 500;
  color: #34495e;
}

a.sectionlink {
  padding-left: 30px !important;
  font-weight: 600 !important;
}

.nav-sidebar>li>a>i {
  float: right;
  margin-right: 10px;
  top: 5px;
  font-size: 0.8em;
}

.nav-sidebar>.router-link-active>a,
.nav-sidebar>.active>a,
.nav-sidebar>.active>a:hover,
.nav-sidebar>.active>a:focus {
  color: #fff !important;
  background-color: #337ab7 !important;
}

.nav-sidebar>li>a:hover {
  color: inherit;
  background-color: inherit;
}

.sidebar {
  display: none;
}

@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 10px 0px 10px 20px;
    overflow-x: hidden;
    overflow-y: auto;
    /* Scrollable contents if viewport is shorter than content. */
    background-color: #E8E8E8;
  }
}
</style>
