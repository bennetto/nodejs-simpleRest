console.log("create angular module Menu");
//create a module myApp
var menu = angular.module('myApp.menu',[]);

menu.controller('MenuCtrl', function($scope,$state,$rootScope,apps,tables) {
  apps.get({}, function(listApps) {
    $scope.listApps = listApps.data;
  });

  $scope.onClickApp = function(app){
    $rootScope.$broadcast('appSelected', app);
     tables.get({appName:app.name}, function(listTables) {
        $scope.listTables = listTables.data;
        $state.go('.detail', {id: "newId"});
      });
  };
});