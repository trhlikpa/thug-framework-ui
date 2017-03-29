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
      .classed("forcegraph", true)

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
    var colorSet = [
      {
        color: '#7293cb',
        value: 'referer/base URL'
      }, {
        color: '#90679d',
        value: 'XML/JSON'
      }, {
        color: '#e1974c',
        value: 'CSS'
      }, {
        color: '#84ba5b',
        value: 'JS'
      }, {
        color: 'pink',
        value: 'HTML'
      }, {
        color: '#ccc210',
        value: 'PHP'
      }, {
        color: '#808585',
        value: 'Other'
      }
    ]

    var legend = svg.selectAll(".legend")
      .data(colorSet)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) {
        return d.color;
      });

    legend.append("text")
      .attr("x", 0 + 25)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) {
        return d.value;
      });

    var g = svg.append("g");

    g.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 24)
      .attr("refY", 0)
      .attr("markerWidth", 10)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("opacity", 0.3)

    g.append("defs").append("marker")
      .attr("id", "arrowHighlighted")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 24)
      .attr("refY", 0)
      .attr("markerWidth", 10)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("fill", 'red')

    var link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("marker-end", "url(#arrow)")

    var labelLine = g.append("g")
      .attr("class", "linklabels")
      .selectAll("text")
      .data(graph.links)
      .enter().append("text")
      .attr("class", "linklabel")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.method
      });

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
        return '#7293cb'
      } else if (baseUrl && d.url == baseUrl) {
        return '#7293cb'
      } else if (~d.url.indexOf('.xml') || ~d.url.indexOf('.json')) {
        return '#90679d'
      } else if (~d.url.indexOf('.css')) {
        return '#e1974c'
      } else if (~d.url.indexOf('.js')) {
        return '#84ba5b'
      } else if (~d.url.indexOf('.html')) {
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
        labelLine.classed("highlighted", false);
        link.classed("highlighted", false)
          .attr("marker-end", "url(#arrow)");
        if (highlightedNode == d) {
          highlightedNode = null
          return
        }
      }
      d3.select(this).classed("highlighted", true);
      label.classed("highlighted", function(o) {
        return d.index == o.index
      })

      labelLine.classed("highlighted", function(o) {
        return d.index == o.source.index
      })

      link.classed("highlighted", function(o) {
        return d.index == o.source.index
      }).attr("marker-end", function(o) {
        if (d.index == o.source.index) {
          return "url(#arrowHighlighted)"
        } else {
          return "url(#arrow)"
        }
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
        var kx = .6 * simulation.alpha(),
          ky = 1.4 * simulation.alpha();
        link.each(function(d, i) {
          d.target.y += (d.source.y - d.target.y) * kx;
          d.target.x += (d.source.x + 200 - d.target.x) * ky;
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

      labelLine
        .attr("x", function(d) {
          return (d.source.x + d.target.x) / 2;
        })
        .attr("y", function(d) {
          return (d.source.y + d.target.y) / 2;
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
.forcegraph {
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

.linklabels text {
  opacity: 0.3;
  font-size: 6px;
  pointer-events: none;
}
</style>
