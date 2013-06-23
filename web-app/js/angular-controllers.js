var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/module/list', {templateUrl: '/d3demo/partial/module/list', controller: ModuleListCtrl}).
        otherwise({redirectTo: '/module/list'});
}]);


function ModuleListCtrl($scope, $http) {

    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data;
        $scope.chart = createChart($scope.modules.length);

        updateChart($scope);

    });

    $scope.$watch('modules', function() {
        refreshChart($scope);
    }, true);

}