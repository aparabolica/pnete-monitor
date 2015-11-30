module.exports = function(app) {
  var NotificationEmail = app.models.NotificationEmail;
  var Email = app.models.Email;

  if (process.env.NODE_ENV != 'test' ) {

    // check for emails to send every 1 sec
    setInterval(checkEmailsToSend, 1000);

    function checkEmailsToSend(){
      NotificationEmail.findOne({
          where: {status: 'pending'},
          include: ['recipient', 'task']
      }, function(err, email){


        if (!err && email) {
          emailJSON = email.toJSON();
          var recipient = emailJSON.recipient;
          var task = emailJSON.task;

          var options = {
            type: 'email',
            to: recipient.email,
            from: "Monitor do PNETE <naoresponda@monitoramentopnete.org.br>",
            subject: task.subject,
            text: task.content
          }

          Email.send(options, function(err, info){
            if (err || (info.response && info.response != '250 Great success' )) {
              email.status = 'error';
              email.reponse = info.response;
            } else email.status = 'sent';

            email.save();

          });
        }
      });
    }
  }


}
