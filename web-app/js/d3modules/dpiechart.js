var dPieGlobals = {};
dPieGlobals.arc_group;
dPieGlobals.label_group;
dPieGlobals.radius = 200;
dPieGlobals.innerRadius = 0;
dPieGlobals.duration = 1000;
dPieGlobals.delay = 1000;

initDPieChart = function (chart) {
    var w = dPieGlobals.radius * 2.2;
    var h = dPieGlobals.radius * 2.2;
    var transform = "translate(" + w/2 + "," + h/2 + ")";

    chart.attr("height", h);
    dPieGlobals.arc_group = chart.append("svg:g")
        .attr("class", "arc")
        .attr("transform", transform);

    dPieGlobals.label_group = chart.append("svg:g")
        .attr("class", "label_group")
        .attr("transform", transform);

}

// Refresh
refreshDPieChart = function (chart, $scope) {

    //D3 helper function to create colors from an ordinal scale
    var color = d3.scale.category20();

    var arc = d3.svg.arc()
        .startAngle(function (d) {
            return d.startAngle;
        })
        .endAngle(function (d) {
            return d.endAngle;
        })
        .innerRadius(dPieGlobals.innerRadius)
        .outerRadius(dPieGlobals.radius);

    var pie = d3.layout.pie().value(function (d) {
        return d.level;
    });

    var pieData = pie($scope.modules);

    var filteredPieData = pieData.filter(
        function (element, index, array) {
            element.name = $scope.modules[index].name;
            element.level = $scope.modules[index].level;
            element.id = $scope.modules[index].id;
            return (element.level > 0);
        }

    );

    console.log("pieData", pieData);
    console.log("Filtered Pie Data", filteredPieData);

    //DRAW ARC PATHS
    var paths = dPieGlobals.arc_group.selectAll("path").data(filteredPieData);

    paths.enter().append("svg:path")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("fill", function (d, i) {
            return color(i);
        })
        .on("click", function(d){
            $scope.loadSubModule(d.id);
        })
        .transition()
        .duration(dPieGlobals.duration)
        .delay(dPieGlobals.delay)
        .attr("d", arc);

    paths.transition()
        .duration(dPieGlobals.duration)
        .delay(dPieGlobals.delay)
        .attr("d", arc);


//    labels
    var labels = dPieGlobals.label_group.selectAll('text.value').data(filteredPieData);

    labels.enter().append("svg:text")
        .attr("class", "value");

    labels.transition()
        .duration(dPieGlobals.duration)
        .delay(dPieGlobals.delay).attr("transform", function (d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = dPieGlobals.innerRadius;
            d.outerRadius = dPieGlobals.outerRadius;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function (d, i) {
            return d.name[d.name.length - 1];
        });


}
