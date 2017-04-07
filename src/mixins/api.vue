<script>
export default {
  data() {
    return {
      baseUrl: ''
    }
  },
  computed: {
    jobsUrl() {
      return this.baseUrl + '/api/v1.0/jobs/'
    },
    schedulestUrl() {
      return this.baseUrl + '/api/v1.0/schedules/'
    },
    tasksUrl() {
      return this.baseUrl + '/api/v1.0/tasks/'
    },
    userAgentsUrl() {
      return this.baseUrl + '/api/v1.0/useragents/'
    },
    pluginsUrl() {
      return this.baseUrl + '/api/v1.0/plugins/'
    },
    domEventsUrl() {
      return this.baseUrl + '/api/v1.0/domevents/'
    },
    exploitsUrl() {
      return this.baseUrl + '/api/v1.0/exploits/'
    },
    loginUrl() {
      return this.baseUrl + '/api/v1.0/auth/login/'
    },
    registrationUrl() {
      return this.baseUrl + '/api/v1.0/auth/register/'
    }
  }
}
</script>
