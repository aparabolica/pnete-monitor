/*
 * Module dependencies
 */

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN
});

module.exports = function(app) {


  var NotificationEmail = app.models.NotificationEmail;
  var Email = app.models.Email;

  // don't run while testing
  if (process.env.NODE_ENV != 'test' ) {

    // check pending emails every 1 sec
    setInterval(getEmailsToSend, 1000);

    function getEmailsToSend(){
      NotificationEmail.findOne({
          where: {status: 'pending'},
          order: 'updatedAt ASC',
          include: ['recipient', 'task']
      }, function(err, email){

        if (!err && email) {
          // create mailgun task ou check status if it already exists
          if (!email.mailgunId) createMailgunMessage(email);
          else checkMailgunMessage(email);
        }
      });
    }

    function createMailgunMessage(email){

      var emailJSON = email.toJSON();

      var data = {
        from: "Monitor do PNETE <naoresponda@monitoramentopnete.org.br>",
        to: emailJSON.recipient.email,
        subject: emailJSON.task.subject,
        text: emailJSON.task.content
      };

      mailgun.messages().send(data, function (err, body) {
        if (err) {
          email.status = 'error';
          email.error = err.message;
        } else {
          email.mailgunId = body.id.slice(1,-1);
        }
        email.save();
      });
    }

    function checkMailgunMessage(email){
      mailgun.events().get({
        "message-id": email.mailgunId
      }, function(err, events){
        if (err) console.log(err);
        else if (events && events.items.length) {

          var status = events.items[0].event;
          if (status != 'accepted') {
            email.status = status;
            email.save()
          }
        }
      });
    }
  }
}
