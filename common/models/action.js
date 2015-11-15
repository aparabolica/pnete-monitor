module.exports = function(Action) {

  /*
   * Disable unwanted endpoints
   */
  Action.disableRemoteMethod("upsert", true);
  Action.disableRemoteMethod("updateAll", true);
  Action.disableRemoteMethod("createChangeStream", true);

};
