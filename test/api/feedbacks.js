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
var indicator1;
var indicator2;
var organization1;
var cycle1;
var cycle2;
var feedback1;


describe('Feedbacks:', function() {

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
      }, function (doneEach){
        app.models.Organization.findOne({}, function(err, org){
          if (err) return doneBefore(err);
          organization1 = org;
          app.models.User.update({id: user1.id}, {organizationId: org.id }, doneEach);
        })
      }, function (doneEach){
        helper.createIndicator(function(err,indicator){
          if (err) return doneBefore(err);
          indicator1 = indicator;
          doneEach(err);
        });
      }, function (doneEach){
        helper.createIndicator(function(err,indicator){
          if (err) return doneBefore(err);
          indicator2 = indicator;
          doneEach(err);
        });
      }, function (doneEach){
        helper.createCycles(2, function(err,cycles){
          if (err) return doneBefore(err);
          cycle1 = cycles[0];
          cycle2 = cycles[1];
          doneEach(err);
        });
      }
    ], doneBefore);
  });



  describe('POST /feedbacks', function(){

    var payload;

    before(function(){
      payload = {
        value: "complete",
        indicatorId: indicator1.id,
        cycleId: cycle1.id
      }
    });

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/feedbacks')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('allow logged user', function(){

      it('should return 200', function(doneIt){
        request(app)
          .post(restApiRoot + '/feedbacks')
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);

            var body = res.body;

            body.should.have.property('indicatorId', payload.indicatorId);
            body.should.have.property('organizationId', organization1.id);
            body.should.have.property('value', payload.value);

            // enforce feedback on active cycle
            body.should.have.property('cycleId', cycle2.id);

            feedback1 = body;

            doneIt();
          });
      });
    });


  });

  describe('PUT /feedbacks/:id', function(){

    var payload;

    before(function(){
      payload = {
        value: "incomplete"
      }
    });

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .put(restApiRoot + '/feedbacks/'+feedback1.id)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('logged user', function(){

      it('should return 200', function(doneIt){
        request(app)
          .put(restApiRoot + '/feedbacks/'+feedback1.id)
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);

            var body = res.body;

            body.should.have.property('indicatorId', indicator1.id);
            body.should.have.property('organizationId', organization1.id);
            body.should.have.property('value', payload.value);


            body.should.have.property('cycleId', cycle2.id);

            doneIt();
          });
      });
    });

    context('finished cycle', function(){

      var payload;

      before(function(doneBefore){

        // create payload
        payload = {
          value: "complete",
          indicatorId: indicator2.id
        }

        // set active cycle as finished
        cycle2.endDate = Date.now();
        cycle2.save(doneBefore);
      });

      it('deny POST', function(doneIt){
        request(app)
          .post(restApiRoot + '/feedbacks')
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(403)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'Active cycle has ended.')
            doneIt();
          });
      });

      it('deny PUT', function(doneIt){
        request(app)
          .put(restApiRoot + '/feedbacks/'+feedback1.id)
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(403)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);
            res.body.error.should.have.property('message', 'Active cycle has ended.')
            doneIt();
          });
      });
    });


  });
});
