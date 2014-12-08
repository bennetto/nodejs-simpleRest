'use strict';

console.log("create angular app");
//create a module myApp
var myApp = angular.module('myApp', ['myApp.table','myApp.menu','myApp.header','ngRoute','ngResource']);

//  #/item/{{item.id}}/foo
//  $location.path('/sampleurl', false);

// URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
// Route: /Chapter/:chapterId/Section/:sectionId


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
   $scope.template={
     "home":"core/Home/home.html",
     "header":"core/Header/header.html",
     "menu":"core/Menu/menu.html",
     "table":"core/Table/table.html",
     "app":"core/App/app.html"
   }
  });


