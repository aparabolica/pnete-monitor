module.exports = function(Assessment) {

  /*
   * Disable unwanted endpoints
   */
  Assessment.disableRemoteMethod("upsert", true);
  Assessment.disableRemoteMethod("updateAll", true);
  Assessment.disableRemoteMethod("createChangeStream", true);

  /*
   * Validation
   */
  Assessment.validatesInclusionOf('status', {in: ['complete', 'partial', 'incomplete']});

  /**
   * Include assesment on active cycle
   **/
  Assessment.observe('before save', function(ctx, next) {
    if (ctx.instance && ctx.isNewInstance) {
      Assessment.app.models.Cycle.findOne({where: {active: true}}, function(err, cycle){
        if (err) return next(err);
        ctx.instance.cycleId = cycle.id;
        next();
      });
    } else next();
  });

};
