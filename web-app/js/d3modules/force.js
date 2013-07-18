var forceGlobals = {};
forceGlobals.arc_group;
forceGlobals.label_group;
forceGlobals.width = 600;
forceGlobals.height = 400;

initForceChart = function () {
    var chart = d3.select("#container").append("svg")
//        .attr("class", "chart")
        .attr("width", forceGlobals.width)
        .attr("height", forceGlobals.height);

    return chart;
}

createGraph = function(modules) {
    var graph = {};
    graph.nodes = [];
    graph.links = [];

    var node = 0;
    var link = 0;
    for(var i=0; i<modules.length; i++) {
        graph.nodes[node++] = {name: modules[i].name, level: modules[i].level}
        var source = node - 1;
        for(var j=0; j<modules[i].subModules.length; j++) {
            graph.nodes[node++] = {name: modules[i].subModules[j], level: modules[i].subModules[j].level};
            graph.links[link++] = {source: source, target: node - 1};
        }
    }
    return graph;
}

refreshForce = function (chart, modules) {
    var graph = createGraph(modules);
    var color = d3.scale.category20();
//    var transform = "translate(" + forceGlobals.width / 2 + "," + forceGlobals.height / 2 + ")";

    modules.filter(function (element, index, array) {
            element.x = 0;
            element.y = 0;
            return (element.level > 0);
        }
    );

    var force = d3.layout.force()

        .charge(function (d) {
            return -100 - d.level;
        })
        .size([forceGlobals.width, forceGlobals.height])
        .linkDistance(40)
;
    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();


        var link = chart.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    var node = chart.selectAll(".node")
        .data(graph.nodes)
        .enter().
        append("circle")
        .attr("class", "node")
        .attr("r", function (d) {
            return d.level * 1.25;
        })
        .attr("fill", function (d, i) {
            return color(i);
        })
        .call(force.drag);

    force.on("tick", function () {

        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });
    });

//    force.start();
}