/*
 * Module dependencies
 */
var async = require('async');
var rosie = require('rosie').Factory;
var request = require('supertest');
var should = require('should');
var app = require('../server/server');

/*
 * Config
 */
var restApiRoot = app.settings.restApiRoot;

/**
 * User login
 **/
exports.login = function(credentials, callback){
	request(app)
		.post(restApiRoot + '/users/login')
		.send(credentials)
		.end(function(err, res){
			if (err) return callback(err);
			should(res).have.property('status', 200);
			should.exist(res.body.id);
			callback(null, res.body);
		});
}

/**
 * Factories
 **/
rosie.define('User')
	.sequence('name', function(i) { return 'user' + i })
	.sequence('email', function(i) { return 'email' + i + '@example.com' })
	.attr('password', '123456')
	.attr('emailVerified', true)

rosie.define('Indicator')
	.sequence('description', function(i) { return 'description for ' + i })
	.sequence('comments', function(i) { return 'comments for ' + i })
	.attr('type', 'integer')

rosie.define('Cycle')
	.sequence('name', function(i) { return 'Cycle ' + i })
	.attr('active', true)

exports.createUser = function(callback){
	var user = rosie.build('User');
	app.models.User.create(user, function(err, newUser){
		user.id = newUser.id;
		callback(err, user);
	});
}

exports.createIndicator = function(doneCreateIndicator){
	var indicator = rosie.build('Indicator');
	app.models.Indicator.create(indicator, doneCreateIndicator);
}

exports.createCycles = function(n, doneCreateCycles){
	async.timesSeries(n, function(i, doneEach){
		var cycle = rosie.build('Cycle');
		app.models.Cycle.create(cycle, doneEach);
	}, doneCreateCycles);
}
