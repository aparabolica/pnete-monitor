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

    // An admin exists?
    User.find({
      roleId: adminRole.id
    }, function(err, admins){
      if (err) throw err;

      // If not, create one
      if (admins.length == 0) {
        User.create({
          email: 'admin@admin.org',
          password: 'myfirstlogin'
        }, function(err, firstAdmin) {
          if (err) console.log(err);
          console.log('Created first user:', firstAdmin);

          adminRole.principals.create({
            principalType: RoleMapping.USER,
            principalId: firstAdmin.id
          }, function(err, principal) {
            if (err) throw err;

            console.log('Who was added to admin role:', principal);
          });
        });
      }
    });
  });
}
