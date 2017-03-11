<script>
export default {
  data() {
    return {}
  },
  methods: {
    typeFormat: function(value) {
      return value == 'extensive' ?
        '<span class="label label-info"><a><i class="glyphicon glyphicon-duplicate"></i></a><span>Extensive</span></span>' :
        '<span class="label label-success"><a><i class="glyphicon glyphicon-file"></i></a><span>Single URL</span></span>'
    },
    scheduleFormat: function(value) {
      return value == null ?
        '<span class="glyphicon glyphicon-remove"></span>' :
        '<span class="glyphicon glyphicon-ok"></span>'
    },
    statusFormat: function(value) {
      if (value == 'SUCCESSFUL') {
        return '<span class="success">SUCCESSFUL</span>'
      } else if (value == 'FAILURE') {
        return '<span class="danger">FAILURE</span>'
      } else if (value == 'PENDING') {
        return '<span class="info">PENDING</span>'
      } else if (value == 'STARTED') {
        return '<span class="info">STARTED</span>'
      }
    },
    classificationFormat: function(value) {
      if (value == null) {
        return '<span class="info">TBD</span>'
      }
      if (value == 'MALICIOUS') {
        return '<span class="danger">MALICIOUS</span>'
      } else if (value == 'SUSPICIOUS') {
        return '<span class="warning">SUSPICIOUS</span>'
      } else if (value == 'CLEAR') {
        return '<span class="success">CLEAR</span>'
      }
    },
    dateFormat: function(value) {
      if (value == null) {
        return '<span class="glyphicon glyphicon-remove icon-failure"></span>'
      }
      return moment.utc(value).local().format('LLL')
    }
  }
}
</script>
