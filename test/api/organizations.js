/*
 * Module dependencies
 */
var async = require('async');
var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../../server/server.js'); //path to app.js or server.js
var request = require('supertest');
var helper = require('../helper');

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
var user3AccessToken;
var organization1;

describe('Users endpoints', function() {


  before(function(doneBefore) {
    this.timeout(10000);

    async.series([
      function (doneEach){
        helper.login(admin1, function(err, token){
          admin1AccessToken = token;
          doneEach(err);
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user1 = usr;
          helper.login(user1, function(err, token){
            user1AccessToken = token;
            doneEach(err);
          });
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user2 = usr;
          helper.login(user2, function(err, token){
            user2AccessToken = token;
            doneEach(err);
          });
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user3 = usr;
          helper.login(user3, function(err, token){
            user3AccessToken = token;
            doneEach(err);
          });
        });
      }
    ], doneBefore);
  });

  describe('POST /organizations', function(){

    var payload = {
      name: 'Organization 1',
      description: 'Organization description'
    }

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/organizations')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny not admin', function(){
      it('should return 401', function(doneIt){
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
      it('should return 200 and json', function(doneIt){

        request(app)
          .post(restApiRoot + '/organizations')
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('name', payload.name);
            body.should.have.property('description', payload.description);

            organization1 = body;
            doneIt();
          })
      });
    });
  });


  describe('PUT /organizations/{organizationId}/members/rel/{userId}', function(){

    var endpointUrl;
    var payload;

    before(function(doneBefore){
      endpointUrl = restApiRoot
                      + '/organizations/' + organization1.id
                      +'/members/rel/'+user1.id;
      payload = {
      }
      doneBefore();
    });

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .put(endpointUrl)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny not admin', function(){
      it('should return 401', function(doneIt){
        request(app)
          .put(endpointUrl)
          .set('Authorization', user2AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('allow admin', function(){
      it('should return 200 and org json', function(doneIt){

        request(app)
          .put(endpointUrl)
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('organizationId', organization1.id);
            body.should.have.property('userId', user1.id);

            doneIt();
          });
      });
    });

    context('deny organization member', function(){
      it('should return 401', function(doneIt){
        endpointUrl = restApiRoot
                        + '/organizations/' + organization1.id
                        +'/members/rel/'+user2.id;

        request(app)
          .put(endpointUrl)
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

  });

  describe('PUT /users/{userId}/organizations/rel/{organizationId}', function(){

    var endpointUrl;
    var payload;

    before(function(doneBefore){
      endpointUrl = restApiRoot
                      +'/users/'+user2.id
                      + '/organizations/rel/' + organization1.id;
      payload = {
      }
      doneBefore();
    });

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .put(endpointUrl)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny another user', function(){
      it('should return 401', function(doneIt){
        request(app)
          .put(endpointUrl)
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny own user', function(){
      it('should return 401', function(doneIt){
        request(app)
          .put(endpointUrl)
          .set('Authorization', user2AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('allow admin', function(){
      it('should return 200 and org json', function(doneIt){

        request(app)
          .put(endpointUrl)
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('organizationId', organization1.id);
            body.should.have.property('userId', user2.id);

            doneIt();
          });
      });
    });
  });




  describe('GET /organizations', function(){
    it('should be allowed to everyone, but hiding private data');
  })

  describe('GET /organizations/{organizationId}', function(){
    it('should be allowed to everyone, with some data hidden');
  })



});
