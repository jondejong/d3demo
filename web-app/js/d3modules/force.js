var forceGlobals = {};
forceGlobals.arc_group;
forceGlobals.label_group;
forceGlobals.width = 600;
forceGlobals.height = 400;

initForceChart = function() {
    var chart = d3.select("#container").append("svg")
//        .attr("class", "chart")
        .attr("width", forceGlobals.width)
        .attr("height", forceGlobals.height);

    return chart;
}

refreshForce = function(chart, modules) {
    var color = d3.scale.category20();
    var transform = "translate(" + forceGlobals.width/2 + "," + forceGlobals.height/2 + ")";

    modules.filter( function (element, index, array) {
            element.x = 0;
            element.y = 0;
            return (element.level > 0);
        }
    );

    var force = d3.layout.force()
        .nodes(modules)
        .charge(function(d) {
            return -100 - d.level;
        })
        .size([forceGlobals.width, forceGlobals.height])
        .start();

    var node = chart.selectAll(".node")
        .data(modules)
        .attr("r", function(d) {
            return d.level;
        })
        .enter().
        append("circle")
        .attr("class", "node")
        .attr("r", function(d) {
            return d.level;
        })
//        .style("fill", function(d, i) { return color(i); })
        .attr("fill", function (d, i) {
            return color(i);
        })
        .call(force.drag);

    force.on("tick", function() {
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });

    force.start();
}