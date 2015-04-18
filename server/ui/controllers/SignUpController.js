'use strict';
var mtaApp = angular.module('mtaApp');

mtaApp.controller('SignUpController', function($scope, $http, $state, $cookies, Session){
    $scope.serverMessage = "";
    $scope.signup = function() {
        $http.post('/signup', {username:$scope.username, password:
$scope.password}).success(function(res) {
            // body...
            if(res =="success") {
                $cookies['username'] = $scope.username;
                Session.setUsername($cookies['username']);   
                $state.go("service");
            }
            else {
                $scope.serverMessage = res;
            }
        }).error(function(err){
            //error handling
            console.log("error " + err);
        });
      };
});