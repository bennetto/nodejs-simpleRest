console.log("create angular module table");
//create a module myApp
var table = angular.module('myApp.table',[]);


table.controller('TableCtrl', function($scope,tables) {
  $scope.test = 'begin!';
  $scope.appSelected = false;
   $scope.$on('appSelected', function(event, data) {
     if(data)
     {
      $scope.appSelected = true;
      $scope.app = data;
      $scope.listTables = [];
      tables.get({appName:data.name}, function(listTables) {
        $scope.listTables = listTables.data;
      });
     }else{
      $scope.appSelected = false;
      $scope.app = undefined;
     }
   });
});

