'use strict';

/**
 * Module dependencies.
 */


module.exports.default = function(req, res){ 
	res.render("../ui/index.html");
//	res.send("test");
}

module.exports.details = function(req, res){

	var request = require('request');
	var xml2js = require('xml2js');
	var parser = new xml2js.Parser({explicitArray : false});

	var data;
	request.get('http://mta.info/status/serviceStatus.txt', function(err, response, body) {
		if (!err && response.statusCode === 200) {
				parser.parseString(body, function (err, result) {
					data = JSON.stringify(result);
   			  		console.dir(result);
   			  		res.json(result);
	     		});
				
			}
		});
};

module.exports.getFavorites = function(req, res){
	var favorite = require('../models/favorites');
	console.log("get getFavorites");
	console.log(req.param('userName'));
	favorite.find({'user': req.param('userName')}, function(err, favs) {
		if(err){
			console.log("error");
				res.status(500).send('Something broke!');
		}	
		else{
			console.log(favs);
			res.json(favs);
		}
	});
}


module.exports.toggleFavorite = function(req, res){
	var Favorite = require('../models/favorites');
	var fav = new Favorite();
	fav.user = req.body.username;
	if(fav.user.trim() == "") {
		res.status(401).send('Invalid User');
		return;
	}
	console.log("Add Fav for "+ req.body.username);
	Favorite.findOne({'user':req.body.username}, function(err, favs) {
		if(err){
			console.log("error");
				res.status(500).send('Something broke!');
		}	
		else{
			console.log(favs);
			if (!favs){
				//create entry for the new user
				console.log("no user");
				fav.service = [{
					sName: req.body.sName, 
					lines: [{ lName: req.body.lName }]
				}];
				fav.save();
			}
			else {
				var serviceIndex = null;
				console.log(favs.service.length);
				for(var i=0; i< favs.service.length; i++){
					if(favs.service[i].sName == req.body.sName){
						// add to lines array
						serviceIndex = i;
						break;
					}
				}
				console.log(serviceIndex);
				// for this service, user has a line in favorites
				if(serviceIndex != null){
					console.log("addin to existing service");
					//if line is already existing in favorites, remove it
					var linesArr = favs.service[serviceIndex].lines;
					var newFav = true;
					for (var i=0; i < linesArr.length; i++) {
				        if (linesArr[i].lName === req.body.lName) {
				        	// last line in favorites for a service. then remove service
				        	if(linesArr.length == 1){
				        		if(serviceIndex == 0){
									favs.remove();
				        		}
				        		else {
				        			favs.service.splice(serviceIndex, 1);		
				        		}
				        	}
				        	else {
				            	favs.service[serviceIndex].lines.splice(i, 1);
				            }
				            newFav = false;
				            break;
				        }
				    }	
					if(newFav){
						favs.service[serviceIndex].lines.push({lName: req.body.lName });	
					}
					favs.save();					
				}
				else {
					console.log("creating new service");
					favs.service.push({ sName: req.body.sName, lines: [{lName: req.body.lName }] });	
					favs.save();
				}
			}
		}
		res.end('favorite toggled');
	});
}

module.exports.signup = function(req, res) {
	var User = require('../models/user');
	User.findOne({'username':req.body.username}, function(err, users) {
		if(err){
			console.log("error");
			res.status(500).send('Something broke in signup!');
		}
		else {
			//user already exists ?
			console.log("users: "+ users);
			if (!users){

				//no user exists, create one 
				var newUser = new User();
				newUser.username = req.body.username;
				newUser.password = req.body.password;
				newUser.save();
				res.end("success");
			}
			else {
				console.log("User already exists");
				res.end("User already exists");
			}
		}
	});
}


module.exports.signin = function(req, res) {
	var User = require('../models/user');
	User.findOne({'username':req.body.username}, function(err, users) {
		if(err){
			console.log("error");
			res.status(500).send('Something broke in signup!');
		}
		else {
			//user already exists ?
			console.log("users: "+ users);
			if (!users){
				console.log("No User exists");
				res.end("No User exists");
			}
			else {
				console.log(users.username + " " + users.password);
				if(users.password === req.body.password) {
					res.end("success");
				}
				else {
					console.log("Incorrect password");
					res.end("Incorrect password");
				}
			}
		}
	});
}
