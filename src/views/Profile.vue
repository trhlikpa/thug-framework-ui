<template>
<div v-if="this.user.authenticated">
</div>
</template>

<script>
import UserAuthentication from '../mixins/UserAuthentication.vue'
export default {
  mixins: [UserAuthentication],
  data() {
    return {}
  },
  mounted() {
    if (this.user.authenticated) {
      return
    } else {
      this.$router.push('login')
    }
  }
}
</script>
