<script>
import auth from '../auth.js'
export default {
  data() {
    return {}
  },
  computed: {
    user() {
      auth.checkAuth()
      return auth.user
    },
    jwtoken() {
      return auth.getAuthHeader()
    }
  }
}
</script>
