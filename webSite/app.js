'use strict';

console.log("create angular app");
//create a module myApp
var myApp = angular.module('myApp', ['myApp.table','myApp.menu','myApp.header','ngRoute','ngResource','ui.router']);

//  #/item/{{item.id}}/foo
//  $location.path('/sampleurl', false);

// URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
// Route: /Chapter/:chapterId/Section/:sectionId


//Now Configure  our  routing
myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "./core/App/app.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "./core/App/app.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "./core/App/app.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "./core/App/app.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});

/*.when('/:idApp',
    {
        controller: 'RouteCtrl',
        templateUrl: 'core/Home/home.html'
    }.when('/:idApp/:idTable',
    {
        controller: 'RouteCtrl',
        templateUrl: 'core/Home/home.html'
    })*/

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
   $scope.template = {
     "home":"core/Home/home.html",
     "header":"core/Header/header.html",
     "menu":"core/Menu/menu.html",
     "table":"core/Table/table.html",
     "app":"core/App/app.html"
   }
  });


