<template>
<div ref="wrapper">
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    values() {
      var values = []
      var dict = {}

      for (var i = 0; i < this.value.length; i++) {
        if (this.value.cve == null) {
          var cve = 'Unidentified'
        } else {
          var cve = this.value.cve
        }

        if (!(cve in dict)) {
          dict[cve] = {
            'cve': cve,
            'value': 1
          }
        } else {
          dict[cve].value++
        }
      }

      return values = Object.keys(dict).map(function(key) {
        return dict[key]
      })
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  methods: {
    renderGraph() {
      var data = this.values

      var margin = {
          top: 20,
          right: 120,
          bottom: 50,
          left: 120
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x = d3.scaleLinear()
        .range([0, width]);

      var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

      var svg = d3.select(this.$refs.wrapper).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      data.forEach(function(d) {
        d.value = +d.value;
      });

      y.domain(data.map(function(d) {
        return d.cve;
      }));

      x.domain([0, d3.max(data, function(d) {
        return d.value;
      })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .style("fill", "#7293cb")
        .attr("y", function(d) {
          return y(d.cve);
        })
        .attr("height", y.bandwidth())
        .attr("x", function(d) {
          return 0;
        })
        .attr("width", function(d) {
          return x(d.value);
        });

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));

        svg.append("text")
        .attr("x", -35)
        .attr("y", 5)
        .style("text-anchor", "middle")
        .text("CVE");

        svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .style("text-anchor", "middle")
        .text("Frequency");
    }
  },
  watch: {
    'value': function(val, oldVal) {
      d3.select(this.$refs.wrapper).select("svg").remove()
      this.renderGraph()
    }
  },
  mounted() {
    this.renderGraph()
  }
}
</script>

<style>
</style>
