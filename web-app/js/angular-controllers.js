var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/barchart', {templateUrl: '/d3demo/partial/module/list', controller: BarChartCtrl}).
        when('/tbarchart', {templateUrl: '/d3demo/partial/module/list', controller: TransitionalBarChartCtrl}).
        when('/dbarchart', {templateUrl: '/d3demo/partial/module/dynamicBar', controller: DynamicBarChartCtrl}).
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
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function TransitionalBarChartCtrl($scope, $http) {
    console.log("Transitional Bar Chart");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        createTBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshTBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function DynamicBarChartCtrl($scope, $http) {
    console.log("Dynamic Bar Chart");

    $scope.newModule = {};
    $scope.newModule.name= 'New';
    $scope.newModule.level = 20;

    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        $scope.$watch('modules', function() {
            refreshDBarChart($scope.chart, $scope.modules);
        }, true);

    });

    $scope.remove = function(module) {
        var index = -1;
        for(var i=0; i<$scope.modules.length; i++) {
            var m  = $scope.modules[i];
            if(m == module) {
                var index = i;
                break;
            }
        }
        if(index != -1) {
            $scope.modules.splice(index, 1);
        }
    }

    $scope.add = function() {
        var module = {};
        module.name = $scope.newModule.name;
        module.level = $scope.newModule.level;
        $scope.modules[$scope.modules.length] = module;
    }
}

function LineGraphCtrl($scope, $http) {
    console.log("Line Graph");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
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
        $scope.modules = data.modules;
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
        $scope.modules = data.modules;
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
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        initPieChart($scope.chart);

        $scope.$watch('modules', function() {
            refreshPieChart($scope.chart, $scope.modules);
        }, true);

    });
}

function DynamicPieChartCtrl($scope, $http) {
    console.log("Dynamic Pie Chart");
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        createBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);
    });
}

