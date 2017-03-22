import Vue from 'vue'
import Router from 'vue-router'
import JobList from 'views/JobList'
import ScheduleList from 'views/ScheduleList'
import JobDetails from 'views/JobDetails'
import TaskDetails from 'views/TaskDetails'
import ScheduleDetails from 'views/ScheduleDetails'
import CreateJob from 'views/CreateJob'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
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
      component: JobList
    },
    {
      path: '/jobs/:id',
      name: 'JobDetails',
      component: JobDetails
    },
    {
      path: '/tasks/:id',
      name: 'TaskDetails',
      component: TaskDetails
    },
    {
      path: '/schedules',
      name: 'Schedules',
      component: ScheduleList
    },
    {
      path: '/schedules/:id',
      name: 'ScheduleDetails',
      component: ScheduleDetails
    },
    {
      path: '/createjob',
      name: 'CreateJob',
      component: CreateJob
    },
    {
      path: '*',
      redirect: '/jobs'
    }
  ]
})
