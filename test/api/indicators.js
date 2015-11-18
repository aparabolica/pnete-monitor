/*
 * Module dependencies
 */
var _ = require('underscore');
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
var indicator1;
var organization1;
var cycle1;
var feedback1;


describe('Indicators:', function() {

  before(function(doneBefore) {
    this.timeout(10000);

    async.series([
      function (doneEach){
        helper.login(admin1, function(err, token){
          if (err) return doneBefore(err);
          admin1AccessToken = token.id;
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
    }], doneBefore);
  });

  describe('GET /indicators', function(){

    context('allow anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .get(restApiRoot + '/indicators')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var indicators = res.body;

            _.each(indicators, function(i){
              i.should.not.have.property('comments');
            })
            doneIt();

          });
      });
    });

    context('allow authenticated', function(){
      it('should return 401', function(doneIt){
        request(app)
          .get(restApiRoot + '/indicators')
          .set('Authorization', user1AccessToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var indicators = res.body;
            _.each(indicators, function(i){
              i.should.have.property('comments');
            });
            doneIt();
          });
      });
    });

    context('allow admin', function(){
      it('should return 200 and json', function(doneIt){

        request(app)
          .get(restApiRoot + '/indicators')
          .set('Authorization', admin1AccessToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);

            var indicators = res.body;

            _.each(indicators, function(i){
              i.should.have.property('comments');
            });

            doneIt();
          })
      });
    });
  });

});
