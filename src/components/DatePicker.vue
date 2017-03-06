<template>
  <div>
    <input type="text" class="form-control" v-bind:id="id">
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
      id: {
        type: String,
        required: true
      }
  },
  methods: {
    getDate() {
      return $('#' + this.id).data("DateTimePicker").date()
    }
  },
  mounted() {
    $('#' + this.id).datetimepicker({
      format: 'LLL'
    })
  }
}

</script>