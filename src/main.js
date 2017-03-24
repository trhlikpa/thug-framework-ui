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
import Sidebar from './components/Sidebar.vue'
import Select from 'vue-strap/src/Select'
import ToggleButton from 'vue-strap/src/ToggleButton'
import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue'

Vue.use(VueResource)

Vue.component('vuetable', Vuetable)
Vue.component('datatable', DataTable)
Vue.component('datepicker', DatePicker)
Vue.component('pagesection', PageSection)
Vue.component('sidebar', Sidebar)
Vue.component('graph', Graph)
Vue.component('vueselect', Select)
Vue.component('togglebutton', ToggleButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
