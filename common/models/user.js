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
        from: "Monitor do PNETE <naoresponda@monitoramentopnete.org>",
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
    var requestUserId = ctx.req.accessToken.userId;
    var targetUser = ctx.instance;

    if (body && body['organizationId']) {

      User.findById(requestUserId, function(err, user){
        if (user && !user.isAdmin) {
          err = new Error('Only admins can change admin role.');
          err.statusCode = 401;
        }
        next(err);
      });

    // only admins can make admins
    } else if (body && body['isAdmin']) {

      // check if user is changing its admin status
      if (targetUser.id == requestUserId) {
        err = new Error('User can\'t change its own admin status.');
        err.statusCode = 401;
        next(err);

      // check if user is admin
      } else {
        User.findById(requestUserId, function(err, user){
          if (user && !user.isAdmin) {
            err = new Error('Only admins can change admin role.');
            err.statusCode = 401;
          }
          next(err);
        });
      }

    // emailVerified can't be changed via this endpoint
    } else if (body && body['emailVerified']) {

      err = new Error('Can\'t change emailVerified.');
      err.statusCode = 401;
      next(err);

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
