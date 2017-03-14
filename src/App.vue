<template>
<div id="app">
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div id="header" class="container-fluid">
      <div class="navbar-header col-sm-3 col-md-2">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-eye-open"></i>
          <span> Thug Framework</span>
        </a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/jobs"><a>Jobs overview</a></router-link>
          <router-link tag="li" to="/schedules"><a>Schedule</a></router-link>
          <router-link tag="li" to="/stats"><a>Statistics</a></router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Login</a></li>
          <li><a href="#">Register</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
          <router-link tag="li" :to="{ path:'#joblist', query: $route.query}"><a>Joblist</a></router-link>
          <li>
            <a href="#dataset">
              <span>Dataset</span>
              <i class="glyphicon glyphicon-plus"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      user: null
    }
  },
  methods: {}
}
</script>

<style>
html {
  overflow-y: scroll;
}

#app {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  background-color: #fff;
  display: block;
  color: #34495e;
  font-size: 15px;
  padding-top: 50px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#header {
  padding: unset;
}

#navbar {
  background-color: #60717B;
}

.navbar-fixed-top {
  border: 0;
}

.navbar-header {
  background-color: #505F66;
}

.navbar-brand {
  color: #fff !important;
  padding-right: 5px;
  white-space: nowrap;
}

.navbar-brand>i {
  top: 3px !important;
}

.navbar-nav>li>a {
  padding: 15px 25px;
  color: #fff !important;
  display: inline-block;
}

.navbar-nav>.router-link-active>a,
.navbar-nav>.active>a,
.navbar-nav>.active>a:hover,
.navbar-nav>.active>a:focus {
  color: #34495e !important;
  background-color: #fff !important;
}

.navbar-right {
  margin-right: unset !important;
}

.nav-sidebar {
  margin-right: -21px;
  margin-bottom: 20px;
  margin-left: -20px;
}

.nav-sidebar>li>a {
  padding-right: 20px;
  padding-left: 20px;
  color: #34495e;
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

.main {
  padding: 20px;
}

@media (min-width: 768px) {
  .main {
    padding-right: 40px;
    padding-left: 40px;
  }
}

.main .page-header {
  margin-top: 0;
}


/*
 * Placeholder dashboard ideas
 */

.placeholders {
  margin-bottom: 30px;
  text-align: center;
}

.placeholders h4 {
  margin-bottom: 0;
}

.placeholder {
  margin-bottom: 20px;
}

.placeholder img {
  display: inline-block;
  border-radius: 50%;
}

.page-header {
  font-weight: 400;
  margin: 30px 0px 30px 0px;
  text-align: center;
  display: block;
  font-size: 2.4em;
  border-bottom-style: none !important;
}

.sub-header {
  color: #34495e;
  margin-bottom: 20px;
  margin-top: 30px;
  border-bottom: 1px solid #E8E8E8;
}

.a {
  color: #34495e;
  text-decoration: none;
}

a:hover,
a:focus,
a:visited {
  color: #34495e;
  text-decoration: none;
}

.glyphicon {
  top: 2px;
}

.anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}

.pagination {
  margin: 0px !important;
}

.row {
  margin: 0px 0px;
}

.vuetable>tbody>tr:hover {
  cursor: pointer;
}

.loader,
.loader:before,
.loader:after {
  background: #000;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}

.loader {
  color: #000;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}

.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader:after {
  left: 1.5em;
}

@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

.table>tbody {
  border: None !important;
}

.table>thead>tr>th,
.table>tbody>tr>th,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>tbody>tr>td,
.table>tfoot>tr>td {
  border-bottom: 0.5px solid #E8E8E8;
}

td.name,
td.value {
  white-space: -moz-pre-wrap;
  white-space: -hp-pre-wrap;
  white-space: -o-pre-wrap;
  white-space: -pre-wrap;
  white-space: pre-wrap;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}

td.glyphicon {
  top: 0px !important;
  display: table-cell;
}

td.name {
  width: 25%;
}

.progress {
  margin: 8px 3px 0px 8px;
}

.font-bold {
  font-weight: bold;
}
</style>
