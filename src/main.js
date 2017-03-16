// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Graph from './components/Graph.vue'
import DataTable from './components/DataTable.vue'
import DatePicker from './components/DatePicker.vue'
import PageSection from './components/PageSection.vue'
import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue'

Vue.use(VueResource)

Vue.component('vuetable', Vuetable)
Vue.component('datatable', DataTable)
Vue.component('datepicker', DatePicker)
Vue.component('pagesection', PageSection)
Vue.component('graph', Graph)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
