/*
 * Module dependencies
 */
var async = require('async');
var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../server/server.js');
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
var userNotConfirmed;


describe('Users: ', function() {

  before(function(doneBefore) {
    this.timeout(10000);

    async.series([
      function (doneEach){
        helper.login(admin1, function(err, token){
          if (err) return doneBefore(err);
          admin1AccessToken = token.id;
          admin1.id = token.userId
          doneEach(err);
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user1 = usr;
          helper.login(user1, function(err, token){
            if (err) return doneBefore(err);
            user1AccessToken = token.id;
            doneEach(err);
          });
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user2 = usr;
          helper.login(user2, function(err, token){
            if (err) return doneBefore(err);
            user2AccessToken = token.id;
            doneEach(err);
          });
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user3 = usr;
          helper.login(user3, function(err, token){
            if (err) return doneBefore(err);
            user3AccessToken = token.id;
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

          userNotConfirmed = body;

          doneIt();
        }
      });
    });
  });

  describe('when promoting to admin,', function(){
    var payload = {
      isAdmin: true
    }

    context('while anonymous user,', function(){
      it('should return 401.', function(doneIt){
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

    context('while user changing itself,', function(){
      it('should return 401', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/' + user2.id)
          .set('Authorization', user2AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });
  });

  describe('enforce email confirmation: ', function(){

    context('logging before confirmation', function(){
      it('is forbidden', function(doneIt){
        var payload = {
          "email": userNotConfirmed.email,
          "password": userNotConfirmed.password,
        }

        request(app)
          .post(restApiRoot + '/users/login')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'login failed');
            doneIt();

          });
      });
    });

    context('access to /confirm', function(){
      it('is forbidden', function(doneIt){
        var payload = {
          "uid": userNotConfirmed.id,
          "token": userNotConfirmed.verificationToken
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
          "uid": userNotConfirmed.id,
          "token": userNotConfirmed.verificationToken
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

        userNotConfirmed.password = "anewpassword";

        var payload = {
          "uid": userNotConfirmed.id,
          "token": userNotConfirmed.verificationToken,
          "password": userNotConfirmed.password
        }

        request(app)
          .post(restApiRoot + '/users/confirm-email')
          .send(payload)
          .expect(204)
          .end(function(err, res){
            if (err) return doneIt(err);
            helper.login({
              email: userNotConfirmed.email,
              password: userNotConfirmed.password
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
      });
    });
  });

  describe('when changing password ', function(){
    var payload = {
      password: 'sombra'
    }

    context('not authenticated', function(){
      it('should return an error', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/'+user2.id)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('with a regular user,', function(){
      it('returns error when current password is missing', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/'+user3.id)
          .send(payload)
          .set('Authorization', user3AccessToken)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'missing current password.');
            doneIt();
          });
      });

      it('must provide current password to perform change', function(doneIt){
        payload.currentPassword = user3.password;
        request(app)
          .put(restApiRoot + '/users/'+user3.id)
          .send(payload)
          .set('Authorization', user3AccessToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err){
            if (err) return doneIt(err);
            user3.password = payload.password;
            helper.login(user3, function(err, token){
              if (err) return doneBefore(err);
              user3AccessToken = token.id;
              doneIt();
          });
        });
      });

      it('can\'t change others', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/'+user2.id)
          .send(payload)
          .set('Authorization', user3AccessToken)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'Authorization Required');
            doneIt();
          });
      });
    });

    context('an admin user', function(){
      it('can change its own', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/'+admin1.id)
          .send(payload)
          .set('Authorization', admin1AccessToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err){
            if (err) return doneIt(err);
            admin1.password = payload.password;
            helper.login(admin1, function(err, token){
              if (err) return doneBefore(err);
              admin1AccessToken = token.id;
              doneIt();
          });
        });
      });


      it('can change others', function(doneIt){
        request(app)
          .put(restApiRoot + '/users/'+user1.id)
          .send(payload)
          .set('Authorization', admin1AccessToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err){
            if (err) return doneIt(err);
            user1.password = payload.password;
            helper.login(user1, function(err, token){
              if (err) return doneBefore(err);
              user1AccessToken = token.id;
              doneIt();
            });
        });
      });
    });

  });
});
