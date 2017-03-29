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
      var values = {
        name: 'TASKS',
        children: [{
            name: 'PENDING',
            color: '#7293cb',
            children: []
          },
          {
            name: 'STARTED',
            color: '#90679d',
            children: []
          },
          {
            name: 'FAILURE',
            color: '#e1974c',
            children: [{
              name: 'SUSPICIOUS',
              color: '#eec49b',
              children: []
            }]
          },
          {
            name: 'SUCCESSFUL',
            color: '#84ba5b',
            children: [{
                name: 'CLEAR',
                color: '#c9e1b7',
                children: []
              },
              {
                name: 'MALICIOUS',
                color: '#d35e60',
                children: []
              }
            ]
          }
        ]
      }

      for (var i = 0; i < this.valuesProp.length; i++) {
        if (this.valuesProp[i]._state == 'PENDING') {
          values.children[0].children.push({
            name: this.valuesProp[i].url,
            size: 1
          })
        } else if (this.valuesProp[i]._state == 'STARTED') {
          values.children[1].children.push({
            name: this.valuesProp[i].url,
            size: 1
          })
        } else if (this.valuesProp[i]._state == 'FAILURE') {
          values.children[2].children[0].children.push({
            name: this.valuesProp[i].url,
            size: 1
          })
        } else if (this.valuesProp[i].classification == 'CLEAR') {
          values.children[3].children[0].children.push({
            name: this.valuesProp[i].url,
            size: 1
          })
        } else if (this.valuesProp[i].classification == 'MALICIOUS') {
          values.children[3].children[1].children.push({
            name: this.valuesProp[i].url,
            size: 1
          })
        }
      }

      return values
    }
  },
  props: {
    valuesProp: {
      type: Array,
      required: true
    }
  },
  mounted() {
    var width = 960,
      height = 700,
      radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scaleLinear()
      .range([0, 2 * Math.PI]);

    var y = d3.scaleSqrt()
      .range([0, radius]);

    var partition = d3.partition();

    var arc = d3.arc()
      .startAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
      })
      .endAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
      })
      .innerRadius(function(d) {
        return Math.max(0, y(d.y0));
      })
      .outerRadius(function(d) {
        return Math.max(0, y(d.y1));
      });

    var svg = d3.select(this.$refs.wrapper).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    var root = this.values
    root = d3.hierarchy(root);
    root.sum(function(d) {
      return d.size;
    });

    svg.selectAll("path")
      .data(partition(root).descendants())
      .enter().append("g").attr("class", "node");

    var path = svg.selectAll(".node")
      .append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        if (d.data.color) {
          return d.data.color;
        }
        if (d.parent && d.parent.data.color)
          return d.parent.data.color
      })
      .style("stroke", '#fff')
      .style("stroke-width", '1')
      .append("title")
      .text(function(d) {
        return d.data.name;
      });

    var text = svg.selectAll(".node")
      .append("text")
      .attr("transform", function(d) {
        return "rotate(" + computeTextRotation(d) + ")";
      })
      .attr("x", function(d) {
        return y(d.y0);
      })
      .attr("dx", "6") // margin
      .attr("dy", ".35em") // vertical-align
      .style("fill", '#fff')
      .text(function(d) {
        if (d.value != 0 && d.value != 1) {
          return d.value
        }
      });

    function computeTextRotation(d) {
      return (x((d.x0 + d.x1) / 2) - Math.PI / 2) / Math.PI * 180;
    }

    d3.select(self.frameElement).style("height", height + "px");
  }
}
</script>

<style>

</style>
