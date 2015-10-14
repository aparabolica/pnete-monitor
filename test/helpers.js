/*
 * Module dependencies
 */
var request = require('supertest');
var should = require('should');
var app = require('../server/server');

/*
 * Config
 */
var restApiRoot = app.settings.restApiRoot;

/**
 * Helper function to log in a user
 **/
exports.login = function(credentials, callback){
	request(app)
		.post(restApiRoot + '/users/login')
		.send(credentials)
		.end(function(err, res){
			if (err) return callback(err);
			should(res).have.property('status', 200);
			should.exist(res.body.id);
			callback(null, res.body.id);
		});
}
