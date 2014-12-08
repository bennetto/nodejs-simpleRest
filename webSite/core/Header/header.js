console.log("create angular module header");
//create a module myApp
var header = angular.module('myApp.header',[]);

header.controller('HeaderCtrl', ['$scope', function($scope) {
  $scope.test = 'head!';
}]);