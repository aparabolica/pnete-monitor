var async = require('async');

module.exports = function(Cicle) {

  /*
   * Disable/enable endpoints
   */

  // Cicle.disableRemoteMethod("create", true);
  // Cicle.disableRemoteMethod("upsert", true);
  Cicle.disableRemoteMethod("updateAll", true);
  // Cicle.disableRemoteMethod("updateAttributes", false);

  // Cicle.disableRemoteMethod("find", true);
  // Cicle.disableRemoteMethod("findById", true);
  // Cicle.disableRemoteMethod("findOne", true);

  Cicle.disableRemoteMethod("createChangeStream", true);
  // Cicle.disableRemoteMethod("deleteById", true);

  // Cicle.disableRemoteMethod("confirm", true);
  // Cicle.disableRemoteMethod("count", true);
  // Cicle.disableRemoteMethod("exists", true);
  // Cicle.disableRemoteMethod("resetPassword", true);

  Cicle.status = function(doneStatus){
    var Feedback = Cicle.app.models.Feedback;
    var Indicator = Cicle.app.models.Indicator;

    function getIndicatorsCount(doneGetIndicatorsCount){
      Indicator.find({}, function(err, indicators){
        async.each(indicators, function(indicator, doneEachIndicator){
          indicator.organizations.count(function(err, count){
            console.log(count);
            doneEachIndicator();
          });
        },doneGetIndicatorsCount);
      });
    }

    function getFeedbackCount(doneGetFeedbackCount){
      Feedback.count({}, doneGetFeedbackCount);
    }

    async.parallel([
      getIndicatorsCount,
      getFeedbackCount,
    ], function(err, counts){
      doneStatus(null, counts);
    });
  }

  Cicle.remoteMethod('status',{
    http: {verb: 'get'},
    returns: {name: 'status', type: 'Object'}
  });


  /**
   * Only one cicle can be active
   **/
  Cicle.observe('after save', function(ctx, next) {
    var instance = ctx.instance;
    if (instance && instance.active) {
      Cicle.updateAll({
        active: true,
        id: { neq: instance.id }
      }, {active: false}, next);
    } else next();
  });


};
