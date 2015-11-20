module.exports = function(Feedback) {


  /*
   * Disable unwanted endpoints
   */
  Feedback.disableRemoteMethod("upsert", true);
  Feedback.disableRemoteMethod("updateAll", true);
  Feedback.disableRemoteMethod("createChangeStream", true);

  /**
   * Remote hooks
   **/

  Feedback.beforeRemote('create', function(ctx, instance, next){
    var Cycle = Feedback.app.models.Cycle;

    var requestingUser = ctx.currentUser;

    // enforce user organizationId
    ctx.req.body.organizationId = ctx.req.currentUser.organizationId;

    // enforce active cycle
    Cycle.findOne({where:{active: true}}, function(err, cycle){
      ctx.req.body.cycleId = cycle.id;
      next(err);
    });
  });

  // protect immutable properties
  var FILTERED_PROPERTIES = ['organizationId', 'cycleId', 'indicatorId'];
  Feedback.observe('before save', function filterProperties(ctx, next) {
    if (ctx.isNewInstance) return next();
    if (ctx.instance) {
      FILTERED_PROPERTIES.forEach(function(p) { ctx.instance.unsetAttribute(p); });
    } else {
      FILTERED_PROPERTIES.forEach(function(p) { delete ctx.data[p]; });
    }
    next();
  });
};
