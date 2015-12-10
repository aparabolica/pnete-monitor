/*
 * Module dependencies
 */

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN
});

/*
 * Exports
 */
exports.getEmailStatus = function(mailgunId, doneGetEmailStatus){
  var status = 'unkwown';

  if (!mailgunId) return doneGetEmailStatus(null, status);

  mailgun.events().get({
    "message-id": mailgunId
  }, function(err, events){
    if (err) return doneGetEmailStatus(err);

    if (events && events.items.length)
      status = events.items[0].event;

    doneGetEmailStatus(null, status);
  });
}

exports.sendEmail = function(data, doneSendEmail){
  mailgun.messages().send(data, function (err, body) {
    if (err) return doneSendEmail(err);
    else doneSendEmail(null, body.id.slice(1,-1));
  });
}
