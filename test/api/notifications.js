/*
 * Module dependencies
 */
var _ = require('underscore');
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
var orgsWithUsers = [];


describe('Notification Tasks:', function() {
  var User = app.models.User;
  var Cycle = app.models.Cycle;
  var CycleEnrollment = app.models.CycleEnrollment;
  var NotificationEmail = app.models.NotificationEmail;
  var Organization = app.models.Organization;


  before(function(doneBefore) {
    this.timeout(10000);

    async.series([
      function (doneEach){
        helper.login(admin1, function(err, token){
          admin1AccessToken = token.id;
          doneEach(err);
        });
      }, function (doneEach){
        helper.createUser(function(err,usr){
          if (err) return doneBefore(err);
          user1 = usr;
          helper.login(user1, function(err, token){
            user1AccessToken = token.id;
            doneEach(err);
          });
        });

      // destroy all cycles to avoid confusion
      }, function (doneEach){
        Cycle.destroyAll({}, doneEach);

      // destroy all cycles enrollees to avoid confusion
      }, function (doneEach){
        CycleEnrollment.destroyAll({}, doneEach);

      // remove users from orgs
      }, function (doneEach){
        User.updateAll({organizationId: null}, doneEach);

      }, function (doneEach){

        // create new cycle
        var payload = {
          name: '2014',
          description: 'Cycle 2014'
        }

        request(app)
          .post(restApiRoot + '/cycles')
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(doneEach);

      // remove some orgs from the cycle
      }, function (doneEach){
        CycleEnrollment.destroyAll({id: {lt: 5}}, doneEach);

      }, function (doneEach){

        // add users to some orgs
        Cycle.findOne({where:{active: true}, include: ['enrollees']}, function(err, cycle){
          cycle = cycle.toJSON();
          async.timesSeries(5, function(i, doneEachOrg){
            orgsWithUsers.push(cycle.enrollees[i].id);
            helper.createUser({organizationId: cycle.enrollees[i].id}, doneEachOrg);
          }, doneEach);
        });

      }
    ], doneBefore);
  });


  describe('POST /notification-tasks, ', function(){
    var payload = {
      subject: 'Subject',
      content: 'Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.',
      organizations: []
    };

    context('deny anonymous', function(){
      it('should return 401', function(doneIt){
        request(app)
          .post(restApiRoot + '/notification-tasks')
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('with regular user,', function(){
      it('should be forbidden', function(doneIt){
        request(app)
          .post(restApiRoot + '/notification-tasks')
          .set('Authorization', user1AccessToken)
          .send(payload)
          .expect(401)
          .expect('Content-Type', /json/)
          .end(doneIt);
      });
    });

    context('with admin user,', function(){

      it('notify all orgs from cycle, if none is specified', function(doneIt){

        delete payload.organizations;

        request(app)
          .post(restApiRoot + '/notification-tasks')
          .set('Authorization', admin1AccessToken)
          .send(payload)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) return doneIt(err);

            var body = res.body;
            body.should.have.property('id');

            // get emails to be sent
            NotificationEmail.find({where: {taskId: body['id']}}, function(err, emails){
              if (err) return doneIt(err);

              // there must be at least 1 email
              emails.should.have.length(5);

              // get recipient organizations
              var orgsIds = [];
              emails.forEach(function(email){
                orgsIds.push(email.organizationId.toString());
              });

              // get active cycle enrollees
              Cycle.findOne({include: ['enrollees']}, function(err, cycle){
                if (err) return doneIt(err);
                cycle = cycle.toJSON();

                // each enrollees should have one pending message
                cycle.enrollees.forEach(function(org){
                  _.contains(orgsIds, org.id.toString()).should.be.true;
                });
                doneIt();
              });
            });
          });
      });
    });

    it('notify specified orgs', function(doneIt){
      // reduce the list of orgs notified
      orgsWithUsers.pop();
      orgsWithUsers.pop();
      payload.organizations = orgsWithUsers;

      request(app)
        .post(restApiRoot + '/notification-tasks')
        .set('Authorization', admin1AccessToken)
        .send(payload)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return doneIt(err);

          var body = res.body;
          body.should.have.property('id');

          // get emails to be sent
          NotificationEmail.find({where: {taskId: body['id']}}, function(err, emails){
            if (err) return doneIt(err);

            // there must be at least 1 email
            emails.should.have.length(payload.organizations.length);

            // get recipient organizations
            var orgsIds = [];
            emails.forEach(function(email){
              orgsIds.push(email.organizationId.toString());
            });

            // get active cycle enrollees
            Cycle.findOne({include: ['enrollees']}, function(err, cycle){
              if (err) return doneIt(err);
              cycle = cycle.toJSON();

              // each enrollees should have one pending message
              cycle.enrollees.forEach(function(org){
                _.contains(orgsIds, org.id.toString()).should.be.true;
              });
              doneIt();
            });
          });
        });
    });



  });
});
