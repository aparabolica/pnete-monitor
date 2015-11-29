module.exports = function(NotificationTemplate) {

  /*
   * Disable unwanted endpoints
   */
  NotificationTemplate.disableRemoteMethod("upsert", true);
  NotificationTemplate.disableRemoteMethod("updateAll", true);
  NotificationTemplate.disableRemoteMethod("createChangeStream", true);

};
