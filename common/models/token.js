var moment = require('moment');
var mailer = require('../../lib/mailer');

module.exports = function(Token) {

  Token.disableRemoteMethod("find", true);
  Token.disableRemoteMethod("findById", true);
  Token.disableRemoteMethod("findOne", true);
  Token.disableRemoteMethod("exists", true);
  Token.disableRemoteMethod("count", true);
  Token.disableRemoteMethod("upsert", true);
  Token.disableRemoteMethod("updateAll", true);
  Token.disableRemoteMethod("createChangeStream", true);


  Token.disableRemoteMethod("updateAttributes", false);
  Token.disableRemoteMethod("deleteById", true);
  Token.disableRemoteMethod("createChangeStream", true);


  Token.observe('before save', function(ctx, next){
    ctx.instance.expiresAt = moment().add(1, 'day').toDate();
    next();
  });

  Token.afterRemote('create', function(context, token, next){
    var User = Token.app.models.user;
    var Settings = Token.app.models.Settings;

    User.findOne({where: {email: token.email}}, function(err, user){

      /*
       * Send e-mail if user exists
       */

      if (!err && user) {

        Settings.findOne({}, function(err, settings){
          if (err) return next(err);

          var hostname = settings.hostname;

          var options = {
            type: 'email',
            to: user.email,
            from: "Plataforma de monitoramento do PNETE <naoresponda@monitoramentopnete.org.br>",
            subject: "Redefinição de senha"
          }

          // email text: greeting
          options.text = 'Olá, '
          if (user.name) options.text += user.name + ',';
          options.text += '\n\n';

          // email text: link
          options.text += "Visite o link abaixo para redefinir sua senha:\n\n"
          options.text += 'http://' + hostname + '/redefinir-senha?token=' + token.id
            + " \n Plataforma de monitoramento do PNETE\n";

          mailer.sendEmail(options, function(err, emailId){
            context.res.send('OK');
          });
        });
      } else context.res.send('OK');;
    });
  });

};
