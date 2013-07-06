var oldPieData = 0;
var filteredPieData;

var w = 450;
var h = 300;
var r = 100;
var ir = 45;
var textOffset = 14;
var tweenDuration = 250;


var pieData = [];

//D3 helper function to create colors from an ordinal scale
var color = d3.scale.category20();

var donut = d3.layout.pie().value(function(d){
    return d.level;
});

//D3 helper function to draw arcs, populates parameter "d" in path object
var arc = d3.svg.arc()
    .startAngle(function(d){ return d.startAngle; })
    .endAngle(function(d){ return d.endAngle; })
    .innerRadius(ir)
    .outerRadius(r);

///////////////////////////////////////////////////////////
// CREATE VIS & GROUPS ////////////////////////////////////
///////////////////////////////////////////////////////////

//var vis = d3.select("#easy-as-pie-chart").append("svg:svg")
//    .attr("width", w)
//    .attr("height", h);

//GROUP FOR ARCS/PATHS
var arc_group;

initPieChart = function(chart) {
    arc_group = chart.append("svg:g")
        .attr("class", "arc")
        .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

    console.log("pie chart init... ag: ", arc_group);
}


// Refresh

refreshPieChart = function (chart, modules) {

    console.log("arc_group", arc_group);
    pieData = donut(modules);

    //D3 helper function to populate pie slice parameters from array data


//D3 helper function to draw arcs, populates parameter "d" in path object
    oldPieData = filteredPieData;

    var total = 0;

    function filterData(element, index, array) {
        element.name =  modules[index].name;
        element.level = modules[index].level;
        total += element.level;
        return (element.level > 0);
    }

    filteredPieData = pieData.filter(filterData);

    //REMOVE PLACEHOLDER CIRCLE
    arc_group.selectAll("circle").remove();

    //DRAW ARC PATHS
    console.log("FPD", filteredPieData);
    console.log("pieData");
    var paths = arc_group.selectAll("path").data(filteredPieData);
    paths.enter().append("svg:path")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("fill", function (d, i) {
            return color(i);
        })
        .transition()
        .duration(tweenDuration)
        .attr("d", arc);
    paths
        .transition()
        .duration(tweenDuration)
        .attr("d", arc);
//    paths.exit()
//        .transition()
//        .duration(tweenDuration)
//        .attrTween("d", removePieTween)
//        .remove();


}


// Special Thanks to Stephan Boak
// http://blog.stephenboak.com/2011/08/07/easy-as-a-pie.html

///////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////
///////////////////////////////////////////////////////////

// Interpolate the arcs in data space.
function pieTween(d, i) {
    console.log("Pie Tween")
    console.log("opd", oldPieData)
    var s0;
    var e0;
//    if (oldPieData[i]) {
//        s0 = oldPieData[i].startAngle;
//        e0 = oldPieData[i].endAngle;
//    } else if (!(oldPieData[i]) && oldPieData[i - 1]) {
//        s0 = oldPieData[i - 1].endAngle;
//        e0 = oldPieData[i - 1].endAngle;
//    } else if (!(oldPieData[i - 1]) && oldPieData.length > 0) {
//        s0 = oldPieData[oldPieData.length - 1].endAngle;
//        e0 = oldPieData[oldPieData.length - 1].endAngle;
//    } else {
        s0 = 0;
        e0 = 0;
//    }
    var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
    return function (t) {
        var b = i(t);
        return arc(b);
    };
}

function removePieTween(d, i) {
    s0 = 2 * Math.PI;
    e0 = 2 * Math.PI;
    var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
    return function (t) {
        var b = i(t);
        return arc(b);
    };
}
