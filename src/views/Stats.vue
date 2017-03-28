<template>
<div class="loader" v-if="fetching">
</div>
<div v-else>
  <h1 class="page-header">Statistics</h1>
</div>
</template>

<script>
import Anchors from '../mixins/Anchors.vue'
import Api from '../mixins/Api.vue'
export default {
  mixins: [Api, Anchors],
  data() {
    return {
      fetching: true
    }
  },
  mounted() {
    this.parseAnchors()
  }
}
</script>

<style>

</style>
