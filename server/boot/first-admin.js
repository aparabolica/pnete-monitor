module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;


  // Search for an admin
  User.find({
    isAdmin: true
  }, function(err, admins){
    if (err) throw err;

    // Create if it doesn't exists
    if (admins.length == 0) {
      app.settings.defaultAdmin.isAdmin = true;
      User.create(app.settings.defaultAdmin, function(err, firstAdmin) {
        if (err) console.log(err);
        else console.log('Default admin created (credentials at server/config.js).');
      });
    }
  });
}
