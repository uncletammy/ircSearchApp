/**
* Chat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _=require('lodash');

module.exports = {

	attributes: {

	},
	afterCreate: function(values,callback){
		// console.log('Saved an IRC message with vals:',values);

		Chat.count().exec(function(e,n){
			if (e) return console.log(e);

			if (n>10){
				Chat.destroy({}).sort('createdAt ASC').limit(1).exec(function(){return})
			}
		})

		return callback()
	}
};

