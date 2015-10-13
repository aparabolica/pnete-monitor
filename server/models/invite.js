var dsConfig = require('../datasources.json');

module.exports = function(Invite) {

  /*
   * Validation
   */
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  Invite.validatesFormatOf('email', {with: re, message: 'Must provide a valid email.'});


  /*
   * Disable default routes
   */
  Invite.disableRemoteMethod('create', true);
  Invite.disableRemoteMethod('update', true);

  Invite.sendInvite = function(email, organizations, callback) {

    // upsert invite
    Invite.findOne({
      email: email
    }, function(err, invite){
      if (!invite) {
        Invite.create({
          email: email
        }, function(err, invite){
          sendEmail(err, invite);
        });
      } else {
        sendEmail(err, invite);
      }
    });

    // send email
    function sendEmail(err, invite){
      if (err) callback(err);


      var emailInvite = {
        to: invite.email,
        from: dsConfig.emailDs.transports[0].auth.user,
        subject: 'Cadastre-se no Monitor do PNETE',
        text: 'Você foi convidado a participar do Monitor do PNETE. \n\n'+
              'Visite o link para se cadastrar: http://localhost:3000/cadastro?token='+invite.id+'\n'+
              'Link na API: http://localhost:3000/api/v1/invite/'+invite.id+'/accept'

        //html: '<strong>HTML</strong> tags are converted'
      }

      Invite.app.models.Email.send(emailInvite, function(err) {
        if (err) throw err;
        console.log('> email sent successfully');
        callback(null, 'sucesso');
      });
    }


  }

  Invite.remoteMethod('sendInvite', {
    isStatic: true,
    produces: [ 'application/json' ],
    accepts:
     [ { arg: 'email',
         type: 'string',
         description: 'Create an invite to user.',
         http: { source: 'query' } },
       { arg: 'organizations',
         type: [ 'string' ],
         description: 'Array of ids of organizations which user will be member of.',
         http: { source: 'query' } } ],
    http: { path: '/send' },
    returns: [],
    description: 'Create an user invite to the platform via e-mail. Duplicates fires new invite.\n' }
  );


};
