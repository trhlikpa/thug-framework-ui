<template>
<div class='input-group date' v-bind:id="id">
  <input type="text" class="form-control" @blur="updateDate">
  <span class="input-group-addon">
      <span class="glyphicon glyphicon-calendar"></span>
  </span>
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
    },
    value: {
      type: String
    }
  },
  methods: {
    updateDate() {
      var date = $('#' + this.id).data("DateTimePicker").date()

      if (date) {
        this.$emit('input', date.toISOString())
      } else {
        this.$emit('input', null)
      }
    }
  },
  mounted() {
    $('#' + this.id).datetimepicker({
      format: 'LLL'
    })

    if (this.value) {
      $('#' + this.id).data("DateTimePicker").defaultDate(moment(this.value))
    }
  }
}
</script>
