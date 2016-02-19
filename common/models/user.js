var _ = require('underscore');
var path = require('path');
var crypto = require('crypto');
var dsConfig = require('../../server/datasources.json');
var loopback = require('loopback');

var mailer = require('../../lib/mailer');

module.exports = function(User) {

  /*
   * Disable/enable endpoints
   */

  User.disableRemoteMethod("upsert", true);
  User.disableRemoteMethod("updateAll", true);
  User.disableRemoteMethod("createChangeStream", true);

  /*
   * Hooks
   */


  User.beforeRemote('create', function(ctx, modelInstance, next){

    // if an password is not provided, generate random string until verification
    if (!ctx.req.body.password)
      ctx.req.body.password = crypto.randomBytes(20).toString('hex');

    // activation token
    ctx.req.body.verificationToken = crypto.randomBytes(20).toString('hex');

    next();

  });

  // don't send emails while testing
  User.afterRemote('create', function(ctx, user, next){

    // fires email confirmation without blocking
    if (process.env.NODE_ENV != 'test')
      User.sendActivationToken(user.id);

    next();
  });

  User.beforeRemote('*.updateAttributes', function (ctx, unused, next) {

    var err;
    var body = ctx.req.body;
    var currentUser = ctx.req.currentUser;
    var targetUser = ctx.instance;

    var ADMIN_ONLY = ['organizationId', 'isAdmin', 'emailVerified']
    ADMIN_ONLY.forEach(function(key){
      if (body[key] && !currentUser.isAdmin) {
        var e = new Error('only admins can change organizationId')
        e.statusCode = 401
        return next(e);
      }
    });

    // when changing password, must provide current
    if (body['password']) {

      // only admins can change others passwords
      if ((currentUser.id.toString() != targetUser.id.toString()) && !currentUser.isAdmin) {
        err = new Error('only admins can change password from others')
        err.statusCode = 401
        return next(err);
      }

      if (!currentUser.isAdmin) {

        if (!body['currentPassword']){
          err = new Error('missing current password.')
          err.statusCode = 401;
          return next(err);
        }

        targetUser.hasPassword(body['currentPassword'], function(err, isMatch){
          if (err) return next(err);

          if (!isMatch) {
            err = new Error('invalid current password.')
            err.statusCode = 401;
          }
          return next(err);
        });
      } else next()

    // user is not changing sensitive information
    } else next();
  });

  /*
   * "Confirm user" remote hooks
   */

  User.remoteMethod('confirmEmail',{
   http: {
     path: '/confirm-email',
     verb: 'post',
     status: 200
   },
   accepts: [
     {arg: 'uid', type: 'string', description: 'user id', required: true},
     {arg: 'token', type: 'string', description: 'verification token', required: true},
     {arg: 'password', type: 'string', description: 'new user password', required: true}
   ],
   returns: {name: 'status', type: 'Object'}
  });

  User.confirmEmail = function(id, token, password, next){
    User.findById(id, function(err, user){
      if (token != user.verificationToken) {
        var err = new Error('Invalid verification token.');
        err.statusCode = 401;
        next(err)
      } else {
        user.password = password;
        user.emailVerified = true;
        user.save(next);
      }
    });
  }

  User.beforeRemote('confirm', function(ctx, modelInstance, next){
    var err = new Error('Invalid route.');
    err.statusCode = 403;
    next(err)
  });

  /*
   * Method: Confirm email
   */

   /*
    * "Confirm user" remote hooks
    */

   User.remoteMethod('sendActivationToken',{
    http: {
      path: '/send-activation',
      verb: 'get'
    },
    accepts: [
      {arg: 'uid', type: 'string', description: 'user id', required: true}
    ]
   });

  User.sendActivationToken = function(id, next) {

    User.findById(id, function(err, user){

      var Settings = User.app.models.Settings;

      Settings.findOne({}, function(err, settings){
        if (err) return next(err);

        var hostname = settings.hostname;

        var options = {
          type: 'email',
          to: user.email,
          from: "Plataforma de monitoramento do PNETE <naoresponda@monitoramentopnete.org.br>",
          subject: settings.welcomeEmailSubject
        }

        // email text: greeting
        options.text = 'Olá, '
        if (user.name) options.text += user.name + ',';
        options.text += '\n\n';

        // email text: intro
        options.text += settings.welcomeEmailIntroText;
        options.text += '\n\n';

        // email text: link
        options.text += "Visite o link abaixo para confirmar sua conta:\n\n"
        options.text += 'http://' + hostname + '/confirmar-email?token=' + user.verificationToken
          + '&uid=' + user.id + " \n\n";

        // email text: closing
        options.text += settings.welcomeEmailClosingText;

        mailer.sendEmail(options, function(err, emailId){
          if (err) return next(err);
          else {
            user.activationEmailId = emailId;
            user.save(next);
          }
        })
      });
    });
  }


};
