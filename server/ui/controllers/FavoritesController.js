'use strict';

var mtaApp = angular.module('mtaApp');

mtaApp.controller('FavoritesController', function($scope, $http, $sce, Session){
	
    $scope.getFavourites = function(username){
    	$scope.username = Session.username();
        var url = '/favorite?userName='+$scope.username;
    	$http.get(url).success(function(res) {
            //check for no favorites and say that out.. No Favoites found 
            if(res.length > 0) {
                $scope.favorites = res[0];
                $http.get('/service').success(function (data) {
                    
                    if(data.service){
                        var favService = $scope.favorites.service;
                        //loop through services array of favorites
                        for(var s = 0 ; s < favService.length ; s++){
                            //if api call to MTA return live data for the given service, get status for every line of the service
                            if(data.service[favService[s].sName]){
                                //loop throught the lines and map status
                                for(var l = 0  ; l < favService[s].lines.length; l ++){
                                    for(var i = 0 ; i < data.service[favService[s].sName].line.length ; i++)
                                    {
                                        if(favService[s].lines[l].lName == data.service[favService[s].sName].line[i].name){
                                            favService[s].lines[l].lStatus = data.service[favService[s].sName].line[i].status;
                                            favService[s].lines[l].text = $sce.trustAsHtml(data.service[favService[s].sName].line[i].text);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }); 
            }
            else {
                $scope.nofavs = true;
            }
    	}).error(function(){
    		//error handling
    		console.log("error");
    	});
    }
    $http.get('/service').success(function (data) {
        data.service = data.service;
    }); 

    $scope.getFavourites();
});
