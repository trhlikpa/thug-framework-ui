<script>
import beautify from 'js-beautify'
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
        '<span class="glyphicon glyphicon-remove text-danger"></span>' :
        '<span class="glyphicon glyphicon-ok text-success"></span>'
    },
    statusFormat: function(value) {
      if (value == 'SUCCESSFUL') {
        return '<span class="text-success">SUCCESSFUL</span>'
      } else if (value == 'FAILURE') {
        return '<span class="text-danger">FAILURE</span>'
      } else if (value == 'PENDING') {
        return '<span class="text-info">PENDING</span>'
      } else if (value == 'STARTED') {
        return '<span class="text-info">STARTED</span>'
      }
    },
    classificationFormat: function(value) {
      if (value == null) {
        return '<span class="text-info">TBD</span>'
      }
      if (value == 'MALICIOUS') {
        return '<span class="text-danger">MALICIOUS</span>'
      } else if (value == 'SUSPICIOUS') {
        return '<span class="text-warning">SUSPICIOUS</span>'
      } else if (value == 'CLEAR') {
        return '<span class="text-success">CLEAR</span>'
      }
    },
    dateFormat: function(value) {
      if (value == null) {
        return '<span class="glyphicon glyphicon-remove text-danger"></span>'
      }
      return moment.utc(value).local().format('LLL')
    },
    sequenceFormat: function(value, schedule) {
      var schedule = schedule.previous_runs
      var sequence = 0
      for (var key in schedule) {
        sequence++
        if (schedule[key].$oid == value) {
          return sequence
        }
      }
      return 0
    },
    nextRunFormat: function() {
      return 0
    },
    escapeHtmlChars(val) {
      var mapping = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }
      return val.replace(/[&<>"']/g, function(v) {
        return mapping[v]
      })
    },
    codeFormat: function(value) {
      return '<pre class="prettyprint">' + prettyPrintOne(this.escapeHtmlChars(beautify(value, {
        indent_size: 2
      }), true)) + '</pre>'
    },
    graphFormat: function() {
      console.log('graph')
    }
  }
}
</script>

<style>
.label {
  font-size: 11px;
  padding: .3em .4em .4em;
  margin: 0 .1em;
}

.label a {
  color: #fff;
}

.label a {
  margin: 0 .5em 0 .3em;
  opacity: 1.0;
}

.urlcell {
  max-width: 200px;
  max-height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.namecell {
  max-width: 50px;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.submittercell {
  max-width: 50px;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.statuscell {
  max-width: 100px;
}

.classificationcell {
  max-width: 100px;
}

.hoverable:hover {
  white-space: normal;
  position: absolute;
  max-width: none;
  background: inherit;
  z-index: 100;
  overflow: visible;
  border-top: 1px solid #ddd !important;
}
</style>
