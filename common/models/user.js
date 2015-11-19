var _ = require('underscore');
var path = require('path');
var crypto = require('crypto');
var dsConfig = require('../../server/datasources.json');
var loopback = require('loopback');

module.exports = function(User) {

  /*
   * Disable/enable endpoints
   */

  User.disableRemoteMethod("upsert", true);
  User.disableRemoteMethod("updateAll", true);
  User.disableRemoteMethod("createChangeStream", true);
  User.disableRemoteMethod("deleteById", true);

  /*
   * "Create user" remote hooks
   */

  User.beforeRemote('create', function(ctx, modelInstance, next){
    // set a random password until user confirmation;
    if (!ctx.req.body.password) {
      ctx.req.body.password = crypto.randomBytes(20).toString('hex');
    }
    ctx.req.body.verificationToken = crypto.randomBytes(20).toString('hex');
    next();
  });

  User.afterRemote('create', function(ctx, user, next){

    if (process.env.NODE_ENV != 'test' ) {

      var Email = User.app.models.Email;
      var hostname = ctx.req.headers.host;

      var options = {
        type: 'email',
        to: user.email,
        from: "Monitor do PNETE <naoresponda@monitoramentopnete.org.br>",
        subject: 'Bem-vindo ao Monitor do PNETE',
        activationLink: 'http://' + hostname + '/confirmar-email?token=' + user.verificationToken
          + '&uid=' + user.id,
        template: path.resolve(__dirname, '../../server/views/welcome.ejs')
      }

      var render = loopback.template(options.template);
      options.html = render(options);

      Email.send(options, function(err, email){
        next(err);
      })

    } else next();
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
      if (currentUser.id != targetUser.id && !currentUser.isAdmin) {
        err = new Error('only admins can change password from others')
        err.statusCode = 401
        return next(e);
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
     status: 204
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

};
