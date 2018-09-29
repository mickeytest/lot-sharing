<template>
  <canvas width="960" height="500"></canvas>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Flight',
  data () {
    return {
      data: [99, 71, 78, 25, 36, 92]
    }
  },
  mounted () {
    this.calculatePath()
  },
  methods: {
    calculatePath () {
     var canvas = d3.select("canvas")

     var context = canvas.node().getContext("2d")
     var width = canvas.property("width")
     var height = canvas.property("height")

  var lambda = d3.scaleLinear()
      .domain([0, width])
      .range([-180, 180]);

  var phi = d3.scaleLinear()
      .domain([0, height])
      .range([90, -90]);

  var projection = d3.geoConicEqualArea()
      .scale(150)
      .center([0, 33])
      .translate([width / 2, height / 2])
      .precision(0.3);

  var path = d3.geoPath()
      .projection(projection)
      .context(context);

  d3.json("https://d3js.org/world-110m.v1.json", function(error, world) {
    if (error) throw error;

    var land = topojson.feature(world, world.objects.land),
        sphere = {type: "Sphere"},
        touch = "ontouchstart" in window;

    canvas.on(touch ? "touchmove" : "mousemove", move);

    draw();

    function move() {
      var p = touch ? d3.touches(this)[0] : d3.mouse(this);
      projection.rotate([lambda(p[0]), phi(p[1])]), draw();
      d3.event.preventDefault();
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      context.beginPath();
      path(land);
      context.fill();
      context.beginPath();
      path(sphere);
      context.stroke();
    }
  });

    }
  }
}
</script>

<style scoped>

</style>
