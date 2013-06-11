var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/module/list', {templateUrl: '/d3demo/partial/module/list', controller: ModuleListCtrl}).
        otherwise({redirectTo: '/module/list'});
}]);


function ModuleListCtrl($scope, $http) {


    console.log("5");

    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = d3.select("#container").append("svg")
            .attr("class", "chart")
            .attr("width", 420)
            .attr("height", 26 * $scope.modules.length);

        $scope.updateChart();

    });

    $scope.updateChart = function () {

        var levels =  new Array();
        console.log("Updating chart with moduls: ", $scope.modules);
        for(var i=0; i<$scope.modules.length; i++) {
            levels[i] = $scope.modules[i].level;
        }

        console.log("levels: ", levels);

        var x = d3.scale.linear()
            .domain([0, d3.max(levels)])
            .range([0, 420]);

        $scope.chart.selectAll("rect")
            .data(levels)
            .enter().append("rect")
            .attr("y", function (d, i) {
                return i * 26;
            })
            .attr("width", x)
            .attr("height", 20);
    }

    $scope.refreshChart = function(){
        var levels =  new Array();
        console.log("Refreshing chart with moduls: ", $scope.modules);
        for(var i=0; i<$scope.modules.length; i++) {
            levels[i] = $scope.modules[i].level;
        }

        var x = d3.scale.linear()
            .domain([0, d3.max(levels)])
            .range([0, 420]);

        console.log("updating x's");
        var rects = $scope.chart.selectAll("rect").data(levels);
        rects.attr("width", x);
    }

    $scope.$watch('modules', function() {
        console.log("watch fired");
        $scope.refreshChart();
    }, true);

}