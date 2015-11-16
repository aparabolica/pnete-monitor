/*
 * Module dependencies
 */
var async = require('async');
var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../server/server.js'); //path to app.js or server.js
var request = require('supertest');
var helper = require('../../lib/helpers');

/*
 * Config
 */
var restApiRoot = app.settings.restApiRoot;

/*
 * Test data
 */
var admin1 = app.settings.defaultAdmin;
var admin1AccessToken;
var user1;
var user1AccessToken;
var user2;
var user2AccessToken;
var user3;


describe('Users endpoints', function() {

  before(function(doneBefore) {
    this.timeout(10000);

    async.series([
      function (doneEach){
        helper.login(admin1, function(err, token){
          if (err) return doneBefore(err);
          admin1AccessToken = token;
          doneEach(err);
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user1 = usr;
          helper.login(user1, function(err, token){
            if (err) return doneBefore(err);
            user1AccessToken = token;
            doneEach(err);
          });
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user2 = usr;
          helper.login(user2, function(err, token){
            if (err) return doneBefore(err);
            user2AccessToken = token;
            doneEach(err);
          });
        });
      }
    ], doneBefore);
  });

  describe('POST /users', function(){

    var payload = {
      email: 'theveryfirstuser@email.com',
      password: 'mypassword'
    }

    context('deny anonymous', function(){
      it('returns 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/users')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny not admin', function(){
      it('returns 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/users')
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('allow admin', function(){
      it('returns 200', function(doneIt){

        request(app)
          .post(restApiRoot + '/users')
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(onResponse);

        // Verify response
        function onResponse(err, res) {
          if (err) doneIt(err);

          var body = res.body;

          // User basic info
          body.should.have.property('id');
          body.should.have.property('email', payload.email);
          body.should.not.have.property('password');

          // keep user3 info
          user3 = body;
          user3.password = payload.password;

          doneIt();
        }
      });
    });
  });

  describe('promote user to admin', function(){
    var payload = {
      isAdmin: true
    }

    context('deny anonymous', function(){
      it('returns 401', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/' + user1.id)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny not admin', function(){
      it('returns 401', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/' + user1.id)
          .set('Authorization', user2AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('allow admin', function(){
      it('returns 200', function(doneIt){

        request(app)
          .put(restApiRoot + '/users/' + user1.id)
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(onResponse);

        /* Verify response */
        function onResponse(err, res) {
          if (err) return doneIt(err);
          res.body.should.have.property('isAdmin', true);
          doneIt();
        }
      });
    });

    context('deny own user', function(){
      it('returns 401', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/' + user1.id)
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });
  });

  describe('enforce email confirmation', function(){

    context('logging before confirmation', function(){
      it('is forbidden', function(doneIt){
        var payload = {
          "email": user3.email,
          "password": user3.password,
        }

        request(app)
          .post(restApiRoot + '/users/login')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'login failed as the email has not been verified');
            doneIt();

          });
      });
    });

    context('access to /confirm', function(){
      it('is forbidden', function(doneIt){
        var payload = {
          "uid": user3.id,
          "token": user3.verificationToken
        }

        request(app)
          .get(restApiRoot + '/users/confirm')
          .send(payload)
          .expect(403)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'Invalid route.')
            doneIt();
          });
      });
    });

    context('missing password while confirming', function(){
      it('returns 422', function(doneIt){
        var payload = {
          "uid": user3.id,
          "token": user3.verificationToken
        }

        request(app)
          .post(restApiRoot + '/users/confirm-email')
          .send(payload)
          .expect(400)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'password is a required arg')
            doneIt();
          });
      });
    });

    context('new password is set', function(){
      it('returns 204 and can login properly', function(doneIt){

        user3.password = "anewpassword";

        var payload = {
          "uid": user3.id,
          "token": user3.verificationToken,
          "password": user3.password
        }

        request(app)
          .post(restApiRoot + '/users/confirm-email')
          .send(payload)
          .expect(204)
          .end(function(err, res){
            if (err) return doneIt(err);
            helper.login({
              email: user3.email,
              password: user3.password
            }, doneIt)
          });
      });
    });


  });

  describe('GET /user/:id/organization', function(){
    context('allow owner', function(){
      it('should return 200', function(doneIt){
        request(app)
          .get(restApiRoot + '/users/'+user2.id+'/organization')
          .set('Authorization', user2AccessToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(doneIt);
      })
    })
  })

});
