///////////////////////////////////////////////////////////
// CREATE VIS & GROUPS ////////////////////////////////////
///////////////////////////////////////////////////////////

//GROUP FOR ARCS/PATHS

var pieGlobals = {};
pieGlobals.arc_group;
pieGlobals.radius = 150;
pieGlobals.innerRadius = 0;

initPieChart = function (chart) {
    var w = 420;
    var h = 400;
    chart.attr("height", 420);
    pieGlobals.arc_group = chart.append("svg:g")
        .attr("class", "arc")
        .attr("transform", "translate(200, 200)");

}

// Refresh
refreshPieChart = function (chart, modules) {

    var tweenDuration = 1000;

    //D3 helper function to create colors from an ordinal scale
    var color = d3.scale.category20();

    var arc = d3.svg.arc()
        .startAngle(function (d) {
            return d.startAngle;
        })
        .endAngle(function (d) {
            return d.endAngle;
        })
        .innerRadius(pieGlobals.innerRadius)
        .outerRadius(pieGlobals.radius);

    var pie = d3.layout.pie().value(function (d) {
        return d.level;
    });

    var pieData = pie(modules);

    var filteredPieData = pieData.filter(
        function (element, index, array) {
            element.name = modules[index].name;
            element.level = modules[index].level;
            return (element.level > 0);
        }

    );

    //DRAW ARC PATHS
    var paths = pieGlobals.arc_group.selectAll("path").data(filteredPieData);

    paths.enter().append("svg:path")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("fill", function (d, i) {
            return color(i);
        })
        .transition()
        .duration(tweenDuration)
//        .delay(5000)
        .attr("d", arc);

    paths.transition()
        .duration(tweenDuration)
//        .delay(5000)
        .attr("d", arc);


}
