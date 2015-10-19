/*
 * Module dependencies
 */
var rosie = require('rosie').Factory;
var request = require('supertest');
var should = require('should');
var app = require('../server/server');

/*
 * Config
 */
var restApiRoot = app.settings.restApiRoot;

/**
 * User factory
 **/
rosie.define('User')
	.sequence('name', function(i) { return 'user' + i })
	.sequence('email', function(i) { return 'email' + i + '@example.com' })
	.attr('password', '123456')
	.attr('emailVerified', true)


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



exports.createUser = function(callback){
	var User = app.models.User;

	var user = rosie.build('User');

	User.create(user, function(err, dbUser){
		user.id = dbUser.id;
		callback(err, user);
	});
}
