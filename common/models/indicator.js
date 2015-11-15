module.exports = function(Indicator) {

  /*
   * Disable unwanted endpoints
   */
  Indicator.disableRemoteMethod("upsert", true);
  Indicator.disableRemoteMethod("updateAll", true);
  Indicator.disableRemoteMethod("createChangeStream", true);


  Indicator.validatesInclusionOf('type', {in: ['integer', 'percentual', 'discursive']});
};
