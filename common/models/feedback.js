module.exports = function(Feedback) {

  /*
   * Disable unwanted endpoints
   */
  Feedback.disableRemoteMethod("upsert", true);
  Feedback.disableRemoteMethod("updateAll", true);
  Feedback.disableRemoteMethod("createChangeStream", true);

};
