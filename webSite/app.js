'use strict';

console.log("create angular app");
//create a module myApp
var myApp = angular.module('myApp', ['ngRoute','ngResource']);

//  #/item/{{item.id}}/foo
//  $location.path('/sampleurl', false);

//Now Configure  our  routing
myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    // set route for the index page
    .when('/',
    {
        controller: 'RouteCtrl',
        templateUrl: 'core/Home/home.html'
    })
     // if not match with any route config then send to home page

     .otherwise({
        redirectTo: '/'
      });
});

/*Service */
  myApp.factory('apps',function($resource){
    return $resource('http://server.bonnetto.fr:8080/apps', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  });


  myApp.factory('tables',
  function($resource){
    return $resource('http://server.bonnetto.fr:8080/apps/:appName/tables', {}, {
      query: {method:'GET', params:{appName:'empty'}, isArray:true}
    });
  });

myApp.factory('objects',
  function($resource){
    return $resource('http://server.bonnetto.fr:8080/apps/:appName/tables/:tableName/objects', {}, {
      query: {method:'GET', params:{appName:'empty'}, isArray:true}
    });
  });


// create the controller and inject Angular's $scope

  // set for Route Controller
  myApp.controller('RouteCtrl', function($scope) {

   /** create $scope.template **/
   $scope.template={
     "home":"core/Home/home.html",
     "header":"core/Header/header.html",
     "menu":"core/Menu/menu.html",
     "objects":"core/Object/objects.html"
   }

   /** now after this ng-include in uirouter.html set and take template from their respective path **/

  });

myApp.controller('MenuCtrl', function($scope,$rootScope,apps,tables) {
  apps.get({}, function(listApps) {
    $scope.listApps = listApps.data;
  });

  $scope.onClickApp = function(app){
    $rootScope.$broadcast('appSelected', app);
     tables.get({appName:app.name}, function(listTables) {
        $scope.listTables = listTables.data;
      });
  };

});

myApp.controller('ObjectsCtrl', function($scope,tables) {
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


myApp.controller('HeaderCtrl', ['$scope', function($scope) {
  $scope.test = 'head!';
}]);