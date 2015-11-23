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
var counts = {
  indicators: 0,
  feedbacks: {
    needed: 0,
    given: 0
  }

};
var admin1 = app.settings.defaultAdmin;
var admin1AccessToken;
var user1;
var user1AccessToken;
var cycle1;
var cycle2;


/*
 * Models
 */
var Axis;
var CycleEnrollment;
var Indicator;
var Feedback;
var Organization;

/*
 * The tests
 */
describe('Cycle endpoints, ', function(){

  /*
   * Setup scenario
   */
  before(function(doneBefore) {
    this.timeout(10000);

    Axis = app.models.Axis;
    CycleEnrollment = app.models.CycleEnrollment;
    Feedback = app.models.Feedback;
    Indicator = app.models.Indicator;
    Organization = app.models.Organization;


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
                  cycle1 = body;
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

            cycle2 = body;

            // remove some orgs from active cycle to test feedback count properly
            CycleEnrollment.destroyAll({
              cycleId: cycle2.id,
              organizationId: {lt: 5}
            }, doneIt);
          });
      });
    });
  });

  describe('GET /cycle/status,', function(){

    before(function(doneBefore){
      Indicator.find({
          include: {
            relation: 'organizations'
          }
      }, function(err, indicators){

        // create up to 2 feedbacks to each org
        if (err) return doneBefore(err);

        async.eachSeries(indicators, function(indicator, doneEachIndicator){
          indicator = indicator.toJSON();
          var organizations = indicator.organizations;

          counts.indicators = counts.indicators + 1;

          var indicatorOrgsCount = organizations.length;

          organizations.forEach(function(org){
            if (org.id >= 5) {
              counts.feedbacks.needed = counts.feedbacks.needed + 1;
            }
          });


          // random number of feedbacks
          var feedbacksToCreateCount = Math.floor((Math.random() * indicatorOrgsCount));
          async.timesSeries(feedbacksToCreateCount, function(i, doneEachFeedback){

            // organizations with id lower than 5 are not in active cycle
            if (organizations[i].id >= 5) {
              counts.feedbacks.given += 1;
              Feedback.create({
                organizationId: organizations[i].id,
                indicatorId: indicator.id
              }, doneEachFeedback);
            } else doneEachFeedback();
          }, doneEachIndicator);
        }, doneBefore);
      });
    });

    context('when no filter is set,', function(){
      it('return feedback count for active cycle', function(doneIt){
        request(app)
          .get(restApiRoot + '/cycles/status')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('status');
            body['status'].should.have.property('feedbacks');
            body['status']['feedbacks'].should.have.property('needed', counts.feedbacks.needed);
            body['status']['feedbacks'].should.have.property('given', counts.feedbacks.given);

            doneIt();

          });
      });
    });

    context('when axis filter is set', function(){
      var payload = {axisId: 1};
      it('return all and only feedback counts for specific axis', function(doneIt){
        request(app)
          .get(restApiRoot + '/cycles/status')
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('status');
            body['status'].should.have.property('feedbacks');

            Feedback.count({
              axisId: payload.axisId,
              cycleId: cycle2.id
            }, function(err, count){
              if (err) return doneIt(err);

              body['status']['feedbacks']['needed'].
                should.be.below(counts.feedbacks.needed);
              body['status']['feedbacks']['given']
                .should.be.below(counts.feedbacks.given);
              doneIt();
            });
          });
      });
    })

    context('when organization filter is set', function(){
      var payload = {organizationId: 6};
      it('return all and only feedback counts for specific axis', function(doneIt){
        request(app)
          .get(restApiRoot + '/cycles/status')
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('status');
            body['status'].should.have.property('feedbacks');

            Feedback.count({
              axisId: payload.axisId,
              cycleId: cycle2.id
            }, function(err, count){
              if (err) return doneIt(err);

              body['status']['feedbacks']['needed'].
                should.be.below(counts.feedbacks.needed);
              body['status']['feedbacks']['given']
                .should.be.below(counts.feedbacks.given);
              doneIt();
            });
          });
      });
    })

    context('when indicator filter is set', function(){
      var payload = {indicatorId: 5};
      it('return all and only feedback counts for specific axis', function(doneIt){
        request(app)
          .get(restApiRoot + '/cycles/status')
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) doneIt(err);
            var body = res.body;

            body.should.have.property('status');
            body['status'].should.have.property('feedbacks');

            Feedback.count({
              axisId: payload.axisId,
              cycleId: cycle2.id
            }, function(err, count){
              if (err) return doneIt(err);

              body['status']['feedbacks']['needed'].
                should.be.below(counts.feedbacks.needed);
              body['status']['feedbacks']['given']
                .should.be.below(counts.feedbacks.given);
              doneIt();
            });
          });
      });
    })
  });

});
