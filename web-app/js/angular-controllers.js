var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/module/list', {templateUrl: '/d3demo/partial/module/list', controller: ModuleListCtrl}).
        otherwise({redirectTo: '/module/list'});
}]);


function ModuleListCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.updateChart();
    });

    $scope.updateChart = function() {
        var chart = d3.select("#container").append("svg")
            .attr("class", "chart")
            .attr("width", 420)
            .attr("height", 25 * $scope.modules.length);
    }
}