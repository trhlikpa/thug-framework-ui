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
    },
    referer: {
      type: String
    },
    baseUrl: {
      type: String
    }
  },
  mounted() {
    var svg = d3.select(this.$refs.wrapper)
      .append("svg")
      .classed("graph", true)

    var width = parseInt(svg.style("width"), 10)
    var height = parseInt(svg.style("height"), 10)

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(d3.zoom()
        .scaleExtent([1 / 4, 2])
        .on("zoom", zoomed));

    function zoomed() {
      g.attr("transform", d3.event.transform);
    }

    var collision = d3.forceCollide(20).strength(0.2).iterations(100);

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) {
        return d.id
      }).distance(200).strength(0.1))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("charge", d3.forceManyBody())
      .force("collisionForce", collision);

    var graph = this.values
    var referer = this.referer
    var baseUrl = this.baseUrl

    var g = svg.append("g");

    var link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr('marker-end', 'url(#arrowhead)')


    var node = g.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 12)
      .attr("fill", colorNodes)
      .on("click", click)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text(function(d) {
        return d.url;
      });

    var label = g.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
      .attr("class", "label")
      .text(function(d) {
        return d.url;
      }).call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    simulation.nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);

    function colorNodes(d) {
      if (referer && d.url == referer) {
        return '#e3b5b5'
      } else if (baseUrl && d.url == baseUrl) {
        return '#7293cb'
      } else if (~d.url.indexOf('.xml') || ~d.url.indexOf('.json')) {
        return '#90679d'
      } else if (~d.url.indexOf('.css')) {
        return '#e1974c'
      } else if (~d.url.indexOf('.js')) {
        return '#84ba5b'
      } else if (~d.url.indexOf('.png')) {
        return 'pink'
      } else if (~d.url.indexOf('.php')) {
        return '#ccc210'
      }
      return '#808585'
    }

    var highlightedNode = null

    function click(d) {
      if (highlightedNode) {
        node.classed("highlighted", false);
        label.classed("highlighted", false);
        link.classed("highlighted", false);
        if (highlightedNode == d) {
          highlightedNode = null
          return
        }
      }
      d3.select(this).classed("highlighted", true);
      label.classed("highlighted", function(o) {
        return d.index == o.index
      })

      link.classed("highlighted", function(o) {
        return d.index == o.source.index
      })
      highlightedNode = d
    }

    function dragstarted(d) {
      simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      // d.fx = null;
      // d.fy = null;
    }
    var build = false

    function ticked() {
      if (!build) {
        var kx = .2 * simulation.alpha(),
          ky = 1.4 * simulation.alpha();
        link.each(function(d, i) {
          d.target.y += (d.source.y - d.target.y) * kx;
          d.target.x += (d.source.x + 80 - d.target.x) * ky;
        });
        build = true
      }
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
          return d.x + 17;
        })
        .attr("y", function(d) {
          return d.y + 2;
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
  background-color: #FAFAFA;
  border: 1px solid #E8E8E8 !important;
}

rect {
  cursor: grab;
}

.links line {
  fill: none;
  stroke: #aaa;
  stroke-width: 1px;
}

.nodes circle {
  pointer-events: all;
  cursor: move;
}

line.highlighted {
  stroke: red;
  stroke-dasharray: 2;
}

circle.highlighted {
  stroke: red;
  stroke-width: 2;
}

text.highlighted {
  opacity: 1 !important;
  font-weight: bold !important;
}

.labels text {
  opacity: 0.3;
  font-size: 6px;
  pointer-events: none;
}
</style>
