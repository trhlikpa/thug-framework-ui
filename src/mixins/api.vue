<script>
export default {
  data() {
    return {
      baseUrl: "http://localhost:5000"
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
    }
  }
}
</script>
