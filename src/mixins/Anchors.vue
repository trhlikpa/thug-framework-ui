<script>
import Vue from 'vue'
export default {
  data() {
    return {}
  },
  methods: {
    parseAnchors() {
      var vm = this
      Vue.nextTick(function() {
        vm.$parent.$refs.sidebar.parseAnchors()
      })
    }
  }
}
</script>
