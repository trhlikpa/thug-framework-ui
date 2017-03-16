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
      return JSON.parse(this.valuesProp)
    }
  },
  props: {
    valuesProp: {
      type: String,
      required: true
    }
  },
  mounted() {
    var svg = d3.select(this.$refs.wrapper)
      .append("svg")
      .classed("graph", true)

    var width = parseInt(svg.style("width"), 10)
    var height = parseInt(svg.style("height"), 10)

    var color = d3.scaleOrdinal(d3.schemeCategory20)

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) {
        return d.id
      }).distance(200).strength(1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    var graph = this.values

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line");

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 7)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text(function(d) {
        return d.url;
      });

    var label = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
      .attr("class", "label")
      .text(function(d) {
        return d.url;
      });

    simulation.nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function ticked() {
      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      label
        .attr("x", function(d) {
          return d.x + 8;
        })
        .attr("y", function(d) {
          return d.y + 3;
        });
    }
  }
}
</script>

<style>
.graph {
  width: 100%;
  height: 600px;
  white-space: pre-wrap;
  background-color: #E8E8E8;
  border: 1px solid #34495e !important;
}

.links line {
  stroke: #aaa;
}

.nodes circle {
  pointer-events: all;
  stroke: none;
  stroke-width: 40px;
}

.labels text {
  fill: #333;
  font-size: 10px;
  font-family: Arial, sans-serif;
}
</style>
