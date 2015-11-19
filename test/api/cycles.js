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
 * Test variables
 */
var admin1 = app.settings.defaultAdmin;
var admin1AccessToken;
var user1;
var user1AccessToken;
var cicle1;
var cicle2;


/*
 * The tests
 */
describe('Cycle endpoints, ', function(){

  /*
   * Setup scenario
   */
  before(function(doneBefore) {
    this.timeout(10000);

    async.series([
      // admin
      function (doneEach){
        helper.login(admin1, function(err, token){
          if (err) return doneBefore(err);
          admin1AccessToken = token.id;
          doneEach(err);
        });
      // regular user
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
      }
    ], doneBefore);
  });

  describe('POST /cycle', function(){
    context('first cycle', function(){
      var payload = {
        name: '2014',
        description: 'Cycle 2014'
      }

      it('should be active', function(doneIt){
        var Cycle = app.models.Cycle;
        var Organization = app.models.Organization;

        request(app)
          .post(restApiRoot + '/cycles')
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('name', payload.name);
            body.should.have.property('description', payload.description);
            body.should.have.property('active', true);

            Cycle.findById(body.id, function(err, cycle){
              if (err) doneIt(err);

              cycle.enrollees({}, function(err, enrollees){
                if (err) doneIt(err);

                // all orgs should be enrollees
                Organization.count(function(err, count){
                  count.should.not.equal(0);
                  enrollees.should.have.length(count);
                  cicle1 = body;
                  doneIt();
                })
              });
            });
          });
      });
    });

    context('second cycle', function(){
      var payload = {
        name: '2014',
        description: 'Cycle 2014'
      }

      it('should be active', function(doneIt){

        request(app)
          .post(restApiRoot + '/cycles')
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('name', payload.name);
            body.should.have.property('description', payload.description);
            body.should.have.property('active', true);

            cicle1 = body;

            doneIt();
          })
      });
    });




  });
});
