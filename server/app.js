
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xml2js = require('xml2js');

var routes = require('./routes/main-routes');
var mtaApp = express();

var Favs=require('./models/favorites');

//connect to mongoose
var mongoose = require('mongoose');
var dbName='MTA';
var connectionString='mongodb://localhost:27017/'+dbName;

mongoose.connect(connectionString);

mtaApp.use(bodyParser.json());         
mtaApp.use(bodyParser.urlencoded({ extended: true }));   
mtaApp.use(express.static(__dirname + '/ui'));
mtaApp.set('views', __dirname + '/ui/views');
mtaApp.engine('html', require('ejs').renderFile);
mtaApp.set('view engine', 'html');

mtaApp.use('/', routes);

module.exports = mtaApp;
