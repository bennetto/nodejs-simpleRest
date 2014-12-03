'use strict';

console.log("create angular app");
//create a module myApp
var myApp = angular.module('myApp', ['ngRoute','ngResource']);

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

    /* .otherwise({
        redirectTo: '/home'
      });*/
});

/*Service */
  myApp.factory('listApps',function($resource){
    return $resource('http://server.bonnetto.fr:8080/apps', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  });


  myApp.factory('listTables',
  function($resource){
    return $resource('http://server.bonnetto.fr:8080/apps/:appName/objects', {}, {
      query: {method:'GET', params:{appName:'empty'}, isArray:true}
    });
  });

  myApp.factory('shemas',
  function($resource){
    return $resource('http://server.bonnetto.fr:8080/apps/:appName/shemas', {}, {
      query: {method:'GET', params:{appName:'empty'}, isArray:true}
    });
  });

myApp.factory('objects',
  function($resource){
    return $resource('http://server.bonnetto.fr:8080/apps/:appName/objects/:id', {}, {
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

myApp.controller('MenuCtrl', function($scope,$rootScope,listApps) {
  listApps.get({}, function(apps) {
    $scope.listApps = apps.data;
  });

  $scope.onClickApp = function(app){
    $rootScope.$broadcast('appSelected', app);
  };

});

myApp.controller('ObjectsCtrl', function($scope,listTables) {
  $scope.test = 'begin!';
  $scope.appSelected = false;
   $scope.$on('appSelected', function(event, data) {
     if(data)
     {
      $scope.appSelected = true;
      $scope.app = data;
      $scope.listObjects = [];
      listTables.get({appName:data.name}, function(listObjects) {
        $scope.listObjects = listObjects.data;
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