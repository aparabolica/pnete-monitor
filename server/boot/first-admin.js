module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  /*
   * Setup admin account, if not present
   */
  Role.findOrCreate({
    name: "admin"
  }, function (err, adminRole){
    if (err) throw err;

    // Search for admin
    User.find({
      roleId: adminRole.id
    }, function(err, admins){
      if (err) throw err;

      // Create if it doesn't exists
      if (admins.length == 0) {
        app.settings.defaultAdmin.isAdmin = true;
        User.create(app.settings.defaultAdmin, function(err, firstAdmin) {
          if (err) console.log(err);

          adminRole.principals.create({
            principalType: RoleMapping.USER,
            principalId: firstAdmin.id
          }, function(err, principal) {
            if (err) console.log(err);

            console.log('Default admin created (credentials at server/config.js).');
          });
        });
      }
    });
  });
}
