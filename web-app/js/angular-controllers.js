var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/barchart', {templateUrl: '/d3demo/partial/module/list', controller: BarChartCtrl}).
        when('/tbarchart', {templateUrl: '/d3demo/partial/module/list', controller: TransitionalBarChartCtrl}).
        when('/linegraph', {templateUrl: '/d3demo/partial/module/list', controller: LineGraphCtrl}).
        when('/sbarchart', {templateUrl: '/d3demo/partial/module/list', controller: StackedBarChartCtrl}).
        when('/slinegraph', {templateUrl: '/d3demo/partial/module/list', controller: StackedLineGraphCtrl}).
        when('/piechart', {templateUrl: '/d3demo/partial/module/list', controller: PieChartCtrl}).
        when('/dpiechart', {templateUrl: '/d3demo/partial/module/list', controller: DynamicPieChartCtrl}).
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

function LineGraphCtrl($scope, $http) {
    console.log("Line Graph");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        createBarChart($scope.chart, $scope.modules);

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

function StackedLineGraphCtrl($scope, $http) {
    console.log("Stacked Line Graph");
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

function DynamicPieChartCtrl($scope, $http) {
    console.log("Dynamic Pie Chart");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        createBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);
    });
}

