module.exports = function(Feedback) {


  /*
   * Disable unwanted endpoints
   */
  Feedback.disableRemoteMethod("upsert", true);
  Feedback.disableRemoteMethod("updateAll", true);
  Feedback.disableRemoteMethod("createChangeStream", true);

  Feedback.beforeRemote('create', function(ctx, instance, next){
    var User = Feedback.app.models.user;
    var requestUserId = ctx.req.accessToken.userId;
    User.findById(requestUserId, function(err, user){
      if (err) return next(err);
      ctx.req.body.organizationId = user.organizationId;
      next();
    });
  });

  // protect immutable properties
  var FILTERED_PROPERTIES = ['organizationId', 'cycleId', 'indicatorId'];
  Feedback.observe('before save', function filterProperties(ctx, next) {
    if (ctx.isNewInstance) return next();
    if (ctx.options && ctx.options.skipPropertyFilter) return next();
    if (ctx.instance) {
      FILTERED_PROPERTIES.forEach(function(p) { ctx.instance.unsetAttribute(p); });
    } else {
      FILTERED_PROPERTIES.forEach(function(p) { delete ctx.data[p]; });
    }
    next();
  });

};
