module.exports = function(Organization) {

  /*
   * Disable unwanted endpoints
   */
  Organization.disableRemoteMethod("upsert", true);
  Organization.disableRemoteMethod("updateAll", true);
  Organization.disableRemoteMethod("createChangeStream", true);

  Organization.observe('after delete', function(ctx, next) {
    var CycleEnrollment = Organization.app.models.CycleEnrollment;
    var query = ctx.where;

    // delete relations to cycles
    if (query['id']) {
      CycleEnrollment.destroyAll({organizationId: query['id']}, next)
    } else next();

  });

};
