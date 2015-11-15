module.exports = function(Axis) {

  /*
   * Disable unwanted endpoints
   */
  Axis.disableRemoteMethod("upsert", true);
  Axis.disableRemoteMethod("updateAll", true);
  Axis.disableRemoteMethod("createChangeStream", true);

};
