updateChart = function ($scope) {

    var levels =  new Array();
    console.log("Updating chart with moduls: ", $scope.modules);
    for(var i=0; i<$scope.modules.length; i++) {
        levels[i] = $scope.modules[i].level;
    }

    console.log("levels: ", levels);

    var x = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, 420]);

    console.log("X:", x);

    $scope.chart.selectAll("rect")
        .data(levels)
        .enter().append("rect")
        .attr("y", function (d, i) {
            return i * 26;
        })
        .attr("width", x)
        .attr("height", 20);
}

refreshChart = function($scope){
    var levels =  new Array();
//    console.log("Refreshing chart with modules: ", $scope.modules);
    for(var i=0; i<$scope.modules.length; i++) {
        levels[i] = $scope.modules[i].level;
    }

    var x = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, 420]);

    console.log("X:: ", x);

    console.log("updating x's");
    var rects = $scope.chart.selectAll("rect").data(levels);
    rects.attr("width", x);
}
