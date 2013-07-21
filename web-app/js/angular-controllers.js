var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/barchart', {templateUrl: '/d3demo/partial/module/list', controller: BarChartCtrl}).
        when('/tbarchart', {templateUrl: '/d3demo/partial/module/list', controller: TransitionalBarChartCtrl}).
        when('/dbarchart', {templateUrl: '/d3demo/partial/module/dynamicBar', controller: DynamicBarChartCtrl}).
        when('/linegraph', {templateUrl: '/d3demo/partial/module/linegraph', controller: LineGraphCtrl}).
        when('/piechart', {templateUrl: '/d3demo/partial/module/list', controller: PieChartCtrl}).
        when('/dpiechart', {templateUrl: '/d3demo/partial/module/chart', controller: DynamicPieChartCtrl}).
        when('/forcechart', {templateUrl: '/d3demo/partial/module/chart', controller: ForceChartCtrl}).
        otherwise({redirectTo: '/barchart'});
}]);

function BarChartCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function TransitionalBarChartCtrl($scope, $http) {
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
    $scope.color = d3.scale.category20();
    $http.get('/d3demo/module/list/').success(function (data) {

        $scope.modules = data.modules;
        for(var i=0;i<$scope.modules.length;i++){
            $scope.modules[i].background = $scope.color(i);
            $scope.modules[i].display = false;
        }
        $scope.modules[0].display = true;
        $scope.chart = createLineGraph();

        $scope.$watch('modules', function() {
            refreshLineGraph($scope.chart, $scope.modules);
        }, true);

    });
}

function PieChartCtrl($scope, $http) {
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
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.parents = [];
        $scope.chart = createChart($scope.modules.length);

        initDPieChart($scope.chart);
        refreshDPieChart($scope.chart, $scope);

        $scope.loadSubModule = function(id) {
            for(var i=0; i<$scope.modules.length; i++) {
                if($scope.modules[i].id == id && $scope.modules[i].subModules) {
                    $scope.parents = $scope.modules;
                    $scope.modules = $scope.modules[i].subModules;
                    refreshDPieChart($scope.chart, $scope);
                }
            }
        }

    });
}

function ForceChartCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = initForceChart();

        $scope.$watch('modules', function() {
            refreshForce($scope.chart, $scope.modules);
        }, true);
    });
}

