'use strict';
var mtaApp = angular.module('mtaApp');

mtaApp.controller('SignInController', function($scope, $http, $state, $cookies, Session){
    if($cookies.username){
        $state.go("service");
    }

    $scope.signin = function() {
        $http.post('/signin', {username:$scope.username, password:
$scope.password}).success(function(res) {
            // body...
            if(res =="success") {
                $cookies['username'] = $scope.username;
                Session.setUsername($cookies['username']);                
                $state.go("service");
            }
        }).error(function(err){
            //error handling
            console.log("error " + err);
        });
      };
});
