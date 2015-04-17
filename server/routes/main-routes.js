'use strict';

/**
 * Module dependencies.
 */

var service_details = require('../controllers/statusInfo.controller');
var express=require('express');

var router=express.Router();

router.route("/").get(service_details.default);
router.route('/service').get(service_details.details);
router.route('/favorite').get(service_details.getFavorites).post(service_details.toggleFavorite);
router.route('/signup').post(service_details.signup);
router.route('/signin').post(service_details.signin);

module.exports=router;