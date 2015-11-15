module.exports = function(Organization) {

  /*
   * Disable unwanted endpoints
   */
  Organization.disableRemoteMethod("upsert", true);
  Organization.disableRemoteMethod("updateAll", true);
  Organization.disableRemoteMethod("createChangeStream", true);

};
