'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
]).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});

}]);