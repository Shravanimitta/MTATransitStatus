'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Favourites Schema
 */
var FavouritesSchema = new Schema({
	user: {
		type: String,
		default: "Admin"
	},
	service: [
		{
			sName : String,
			lines : [{lName: String}] 
		}
	]
});

module.exports = mongoose.model('Favorites', FavouritesSchema);
