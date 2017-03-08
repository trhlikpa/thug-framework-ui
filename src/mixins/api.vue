<script>
  export default {
    data() {
      return {
        baseUrl: "http://localhost:5000"
      }
    },
    computed: {
        jobListUrl() {
            return this.baseUrl + '/api/v1.0/jobs/'
        },
        scheduleListUrl() {
            return this.baseUrl + '/api/v1.0/schedules/'
        }
    }
  }

</script>