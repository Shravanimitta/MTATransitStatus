'use strict';
var mtaApp = angular.module('mtaApp', ['ngSanitize', 'ui.router', 'ngCookies']);

mtaApp.config (['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
	  	
	  $urlRouterProvider.otherwise("/signin");	
	  //state for service status
	  $stateProvider
	    .state('service', {
	      url: "/service",
	      templateUrl: "views/service.html",
	      controller: "ServiceController"
	    })
	    .state('favorites', {
	      url: "/favorites",
	      templateUrl: "views/favorites.html",
	      controller: "FavoritesController"
	    })
	     .state('signup', {
	      url: "/signup",
	      templateUrl: "views/signup.html",
	      controller: "SignUpController"
	    })
	     .state('signin', {
	      url: "/signin",
	      templateUrl: "views/signin.html",
	      controller: "SignInController"
	    });
}]);


mtaApp.factory('Session', function(){
  var username = '';
  return {
    username: function() { return username; },
    setUsername: function(newUsername) { username = newUsername; }
  };
});

mtaApp.controller("MainCtrl", function($scope, Session) {
  $scope.Session = Session;
});


//set state to /service initially
mtaApp.run(['$state',function($state){
	$state.go("signin");
}]);
