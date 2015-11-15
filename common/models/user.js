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

      var options = {
        type: 'email',
        to: user.email,
        from: dsConfig.emailDs.transports[0].auth.user,
        subject: 'Bem-vindo ao Monitor do PNETE',
        activationLink: 'http://localhost:3000/confirmar-email?token=' + user.verificationToken
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
  User.beforeRemote('confirm', function(ctx, modelInstance, next){
    var password = ctx.req.body.password;

    // user should set a password
    if (!password) {
      var err = new Error('A password is needed to enable user account.');
      err.statusCode = 422;
      next(err)
    } else next();
  });

  User.afterRemote('confirm', function(ctx, modelInstance, next){
    var body = ctx.req.body;

    User.findById(body.uid, function(err, user){
      if (err) return next(err);
      user.password = body.password;
      user.save(next);
    });
  });



};
