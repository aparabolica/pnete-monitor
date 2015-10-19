var path = require('path');
var crypto = require('crypto');
var dsConfig = require('../../server/datasources.json');
var loopback = require('loopback');

module.exports = function(User) {

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


};
