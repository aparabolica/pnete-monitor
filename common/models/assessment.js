module.exports = function(Assessment) {

  Assessment.validatesInclusionOf('status', {in: ['complete', 'partial', 'incomplete']});

  /**
   * Include assesment on active cicle
   **/
  Assessment.observe('before save', function(ctx, next) {
    if (ctx.instance && ctx.isNewInstance) {
      Assessment.app.models.Cicle.findOne({where: {active: true}}, function(err, cicle){
        if (err) return next(err);
        ctx.instance.cicleId = cicle.id;
        next();
      });
    } else next();
  });

};
