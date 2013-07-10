///////////////////////////////////////////////////////////
// CREATE VIS & GROUPS ////////////////////////////////////
///////////////////////////////////////////////////////////

//GROUP FOR ARCS/PATHS

var pieGlobals = {};
pieGlobals.arc_group;
pieGlobals.radius = 150;
pieGlobals.innerRadius = 0;
pieGlobals.duration = 1000;
pieGlobals.delay = 1000;

initPieChart = function (chart) {
    var w = pieGlobals.radius * 2.2;
    var h = pieGlobals.radius * 2.2;
    var transform = "translate(" + w / 2 + "," + h / 2 + ")";

    chart.attr("height", h);
    pieGlobals.arc_group = chart.append("svg:g")
        .attr("class", "arc")
        .attr("transform", transform);

    pieGlobals.label_group = chart.append("svg:g")
        .attr("class", "label_group")
        .attr("transform", transform);

}

// Refresh
refreshPieChart = function (chart, modules) {

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

    pieData.filter(function (element, index, array) {
            element.name = modules[index].name;
            element.level = modules[index].level;
            return (element.level > 0);
        }
    );

    //DRAW ARC PATHS
    var paths = pieGlobals.arc_group.selectAll("path").data(pieData);

    paths.enter().append("svg:path")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)

    paths.transition()
        .attr("fill", function (d, i) {
            return color(i);
        })
        .duration(pieGlobals.duration)
        .delay(pieGlobals.delay)
        .attr("d", arc);


//    labels
    var labels = pieGlobals.label_group.selectAll('text.value').data(pieData);

    labels.enter().append("svg:text")
        .attr("class", "value");

    labels.transition()
        .duration(pieGlobals.duration)
        .delay(pieGlobals.delay).attr("transform", function (d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = pieGlobals.innerRadius;
            d.outerRadius = pieGlobals.radius;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function (d, i) {
            return d.name[d.name.length - 1];
        });


}
