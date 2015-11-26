module.exports = function(NotificationEmail) {

  /*
   * Disable unwanted endpoints
   */
  NotificationEmail.disableRemoteMethod("create", true);
  NotificationEmail.disableRemoteMethod("upsert", true);
  NotificationEmail.disableRemoteMethod("updateAll", true);
  NotificationEmail.disableRemoteMethod("updateAttributes", false);

  NotificationEmail.disableRemoteMethod("deleteById", true);
  NotificationEmail.disableRemoteMethod("createChangeStream", true);



};
