module.exports = function(Notification) {

  /*
   * Disable unwanted endpoints
   */
  Notification.disableRemoteMethod("upsert", true);
  Notification.disableRemoteMethod("updateAll", true);
  Notification.disableRemoteMethod("createChangeStream", true);

};
