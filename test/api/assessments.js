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
var indicator1;
var cycles = [];
var organization1;

describe('Endpoints for "Users":', function() {

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
        helper.createIndicator(function(err,indicator){
          if (err) return doneBefore(err);
          indicator1 = indicator;
          doneEach(err);
        });
      }, function (doneEach){
        helper.createCycles(2, function(err,cycles){
          if (err) return doneBefore(err);
          cycles = cycles;
          doneEach(err);
        });
      }
    ], doneBefore);
  });



  describe('POST /assesments', function(){

    var payload;

    before(function(){
      payload = {
        status: "complete",
        indicatorId: indicator1.id
      }
    });

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/assesments')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('deny not admin', function(){
      it('should return 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/assesments')
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('adds to current cycle', function(){
      it('should return 200', function(doneIt){

        // get active cycle
        app.models.Cycle.find({where: {active: true}}, function(err, cycles){
          cycles.should.have.lengthOf(1);
          var activeCycle = cycles[0];
          request(app)
            .post(restApiRoot + '/assesments')
            .set('Authorization', admin1AccessToken)
            .send(payload)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) return doneIt(err);

              var body = res.body;

              body.should.have.property('cycleId', activeCycle.id);
              body.should.have.property('status', payload.status);
              body.should.have.property('indicatorId', payload.indicatorId);

              doneIt();
            });
        });
      });
    });
  });
});
