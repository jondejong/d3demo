var forceGlobals = {};
forceGlobals.arc_group;
forceGlobals.label_group;
forceGlobals.width = 420;



refreshForce = function(chart, modules) {

    forceGlobals.height = 26 * modules.length;
    var color = d3.scale.category20();
    var transform = "translate(" + forceGlobals.width/2 + "," + forceGlobals.height/2 + ")";

//    var scale = d3.scale.linear()
//        .domain([0, d3.max(getLevels(modules))])
//        .range([0, forceGlobals.width/10]);


    modules.filter( function (element, index, array) {
            element.x = 0;
            element.y = 0;
            return (element.level > 0);
        }
    );

    var force = d3.layout.force()
        .nodes(modules)
        .charge(function(d) {
            console.log("updating charge for d", d);
            return -100 - d.level;
        })
        .size([forceGlobals.width, forceGlobals.height])
//        .start();


    var node = chart.selectAll(".node")
        .data(modules)
        .attr("r", function(d) {
            return d.level;
        })
        .style("fill", function(d) { return color(d.group); })
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
        console.log("ticking");
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });

    force.start();
}