'use strict';
var mtaApp = angular.module('mtaApp');

mtaApp.controller('SessionController', function($scope, $state, $cookies, Session){
	Session.setUsername($cookies['username']);

    $scope.signout = function(){
        $cookies['username'] = "";
        Session.setUsername($cookies['username']);
        $state.go("signin");
    }
});