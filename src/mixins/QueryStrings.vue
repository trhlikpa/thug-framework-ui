<script>
export default {
  data() {
    return {
      perPage: parseInt(this.$route.query['per_page']) || 10,
      page: parseInt(this.$route.query['page']) || 1,
      sort: this.$route.query['sort'] || 'submit_time',
      direction: this.$route.query['dir'] || 'desc',
      filter: this.$route.query['filter'] || ''
    }
  }
}
</script>
