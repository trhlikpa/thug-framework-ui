import Vue from 'vue'
import Router from 'vue-router'
import JobList from 'views/JobList'
import ScheduleList from 'views/ScheduleList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      path: '/jobs',
      name: 'Jobs',
      component: JobList,
      canReuse: false,
    },
    {
      path: '/schedules',
      name: 'Schedules',
      component: ScheduleList
    },
    {
      path: '*',
      redirect: '/jobs'
    }
  ]
})
