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
var filePath = __dirname + '/../../client-src/img/logo.png';

describe('File Tasks:', function() {
  var User = app.models.User;

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

      }], doneBefore);
    });

    describe('POST /files/upload', function(){

      var payload;

      before(function(){
        payload = {
        }
      });

      context('deny anonymous', function(){
        it('should return 401', function(doneIt){
          request(app)
            .post(restApiRoot + '/files/upload')
            .send(payload)
            .expect(401)
            .expect('Content-Type', /json/)
            .end(doneIt);
        });
      });

      context('logged user', function(){

        it('should return 200', function(doneIt){
          request(app)
            .post(restApiRoot + '/files/upload')
            .set('Authorization', user1AccessToken)
            .attach('file', filePath)
            .send(payload)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) return doneIt(err);

              var file = res.body;

              file.should.have.property('container', 'default');
              file.should.have.property('name','logo.png');

              doneIt();
            });
        });
      });
    });

});
