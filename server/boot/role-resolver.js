module.exports = function(app) {
  var Role = app.models.Role;
  var User = app.models.user;

  Role.registerResolver('admin', function(role, context, next) {
    function reject() {
      process.nextTick(function() {
        next(null, false);
      });
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    User.findById(userId, function(err, user){
      if (err) return next(err);
      else if (!user || !user.isAdmin) return reject()
      else next(null, true);
    });
  });
};
