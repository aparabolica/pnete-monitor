module.exports = function(Settings) {

  /*
  * Disable unwanted endpoints
  */
  Settings.disableRemoteMethod("findById", true);
  // Settings.disableRemoteMethod("findOne", true);
  Settings.disableRemoteMethod("find", true);

  Settings.disableRemoteMethod("confirm", true);
  Settings.disableRemoteMethod("count", true);
  Settings.disableRemoteMethod("exists", true);

  Settings.disableRemoteMethod("create", true);
  Settings.disableRemoteMethod("upsert", true);
  // Settings.disableRemoteMethod("updateAll", true);
  Settings.disableRemoteMethod("updateAttributes", false);
  Settings.disableRemoteMethod("deleteById", true);
  Settings.disableRemoteMethod("createChangeStream", true);

};
