/*
 * Module dependencies
 */

var mailer = require('../../lib/mailer');

module.exports = function(app) {

  var User = app.models.User
  var Email = app.models.Email;

  // don't run while testing
  if (process.env.NODE_ENV != 'test' ) {

    // check pending emails every 1 sec
    setInterval(verifyNewUserEmailVerification, 1000);


    function verifyNewUserEmailVerification (doneVerify) {
      User.findOne({
        where: {
          emailVerified: false,
          activationStatus: {
            nin: ['failed', 'delivered']
          },
        },
        order: 'updatedAt ASC'
      }, function(err, user){
        if (err) console.log(err);

        // activation is not track, send e-mail again
        if (user) {
          if (!user.activationEmailId)
            User.sendEmailConfirmation(user.id);
          else {
            mailer.getEmailStatus(user.activationEmailId, function(err, status){
              user.activationStatus = status;
              user.save();
            });
          }
        }
      });
    }
  }
}
