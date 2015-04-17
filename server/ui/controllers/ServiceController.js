'use strict';

var mtaApp = angular.module('mtaApp');

mtaApp.controller('ServiceController', function($scope, $http, Session, $sce){
	$scope.services = [{'name': 'BT'}, {'name' :'LIRR'}, {'name' : 'MetroNorth'}, {'name' :  'bus'}, {'name' :  'subway'}];

	$scope.selectedService = $scope.services[0];

	$http.get('/service').success(function (data) {
        if(data.service){
           $scope.serviceData = data.service;
            var dataObj = new Date(data.service.timestamp);
            $scope.updatedTime = dataObj.toLocaleString();
            if(Session.username()){
            var url = '/favorite?userName='+Session.username();
            var favService;
            $http.get(url).success(function(res) {    
                if(res.length > 0){
                    favService = res[0].service;    
                            //loop through services array of favorites
                    for(var s = 0 ; s < favService.length ; s++){
                        if(data.service[favService[s].sName]){
                            //loop throught the lines and map status
                            for(var l = 0  ; l < favService[s].lines.length; l ++){
                                for(var i = 0 ; i < data.service[favService[s].sName].line.length ; i++)
                                {
                                    //data.service[favService[s].sName].line[i].text = $sce.trustAsHtml(data.service[favService[s].sName].line[i].text);
                                    if(favService[s].lines[l].lName == data.service[favService[s].sName].line[i].name){
                                        data.service[favService[s].sName].line[i].isFavorite = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                $scope.serviceData = data.service;
            });
            }
        }
    }); 
    $scope.addToFavourite = function($event, lName, sName){
    	var data = {};
    	data.sName = sName;
    	data.lName = lName;
    	data.username = Session.username();
    	$http.post('/favorite', data).success(function(res) {
            if(res == "favorite toggled") {
                if(($event.currentTarget.className).match("selected")) { 
                    $event.currentTarget.className = "fav";
                }
                else {
                    $event.currentTarget.className = "fav selected";    
                }
            }   
    		// body...
    	}).error(function(){
    		//error handling
    		console.log("error");
    	});
    }

});