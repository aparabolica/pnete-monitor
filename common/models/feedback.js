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

};
