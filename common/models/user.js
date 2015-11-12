var _ = require('underscore');
var path = require('path');
var crypto = require('crypto');
var dsConfig = require('../../server/datasources.json');
var loopback = require('loopback');

module.exports = function(User) {

  /*
   * Disable/enable endpoints
   */

  // User.disableRemoteMethod("create", true);
  User.disableRemoteMethod("upsert", true);
  User.disableRemoteMethod("updateAll", true);
  // User.disableRemoteMethod("updateAttributes", false);

  // User.disableRemoteMethod("find", true);
  // User.disableRemoteMethod("findById", true);
  // User.disableRemoteMethod("findOne", true);

  User.disableRemoteMethod("createChangeStream", true);
  User.disableRemoteMethod("deleteById", true);

  // User.disableRemoteMethod("confirm", true);
  // User.disableRemoteMethod("count", true);
  // User.disableRemoteMethod("exists", true);
  // User.disableRemoteMethod("resetPassword", true);

  // User.disableRemoteMethod('__count__accessTokens', false);
  // User.disableRemoteMethod('__create__accessTokens', false);
  // User.disableRemoteMethod('__delete__accessTokens', false);
  // User.disableRemoteMethod('__destroyById__accessTokens', false);
  // User.disableRemoteMethod('__findById__accessTokens', false);
  // User.disableRemoteMethod('__get__accessTokens', false);
  // User.disableRemoteMethod('__updateById__accessTokens', false);

  /*
   * Remote hooks
   */

  User.beforeRemote('create', function(ctx, modelInstance, next){
    // set a random password until user confirmation
    ctx.req.body.password = crypto.randomBytes(20).toString('hex');
    ctx.req.body.verificationToken = crypto.randomBytes(20).toString('hex');
    next();
  });

  User.afterRemote('create', function(ctx, user, next){

    if (process.env.NODE_ENV != 'test') {

      var Email = User.app.models.Email;

      var options = {
        type: 'email',
        to: user.email,
        from: dsConfig.emailDs.transports[0].auth.user,
        subject: 'Bem-vindo ao Monitor do PNETE',
        activationLink: 'http://localhost:3000/ativar?token=' + user.verificationToken
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

    var body = ctx.req.body;

    if (body && body['organizationId']) {
      var currentUserId = ctx.req.accessToken.userId;
      var Role = ctx.req.app.models.Role;
      var RoleMapping = ctx.req.app.models.RoleMapping;

      // get admin role id
      Role.findOne({name: 'admin'}, function(err, adminRole){
        if (err) return next(err);

        // check if user is admin
        RoleMapping.find({ where: {
          principalType: 'USER', principalId: currentUserId, roleId: adminRole.id
        }}, function(err, roles){

          if ((!err) && (roles.length > 0)) next()
          else {
            err = new Error('Only admins can change user\'s organization.');
            err.statusCode = 401;
            next(err);
          }
        });
      })
    } else next();
  });

};
