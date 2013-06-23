var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/barchart', {templateUrl: '/d3demo/partial/module/list', controller: BarChartCtrl}).
        when('/tbarchart', {templateUrl: '/d3demo/partial/module/list', controller: TransitionalBarChartCtrl}).
        when('/sbarchart', {templateUrl: '/d3demo/partial/module/list', controller: StackedBarChartCtrl}).
        when('/piechart', {templateUrl: '/d3demo/partial/module/list', controller: PieChartCtrl}).
        when('/scatterplot', {templateUrl: '/d3demo/partial/module/list', controller: ScatterPlotCtrl}).
        otherwise({redirectTo: '/barchart'});
}]);


function BarChartCtrl($scope, $http) {
    console.log("Bar Chart");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        createBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function TransitionalBarChartCtrl($scope, $http) {
    console.log("Transitional Bar Chart");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        createTBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshTBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function StackedBarChartCtrl($scope, $http) {
    console.log("Stacked Bar Chart");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        createBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function PieChartCtrl($scope, $http) {
    console.log("Pie Chart");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        createBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function ScatterPlotCtrl($scope, $http) {
    console.log("Scatter Plot");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        createBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);

    });

}