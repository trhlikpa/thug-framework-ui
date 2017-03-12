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

.cell:hover {
  white-space: normal;
  position: absolute;
  max-width: none;
  background: inherit;
  z-index: 100;
  overflow: visible;
  border-top: 1px solid #ddd !important;
}
</style>
