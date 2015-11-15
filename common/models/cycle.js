var async = require('async');

module.exports = function(Cycle) {

  /*
   * Disable unwanted endpoints
   */
  Cycle.disableRemoteMethod("upsert", true);
  Cycle.disableRemoteMethod("updateAll", true);
  Cycle.disableRemoteMethod("createChangeStream", true);


  Cycle.status = function(doneStatus){
    var Feedback = Cycle.app.models.Feedback;
    var Indicator = Cycle.app.models.Indicator;

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

  Cycle.remoteMethod('status',{
    http: {verb: 'get'},
    returns: {name: 'status', type: 'Object'}
  });


  /**
   * Only one cycle can be active
   **/
  Cycle.observe('after save', function(ctx, next) {
    var instance = ctx.instance;
    if (instance && instance.active) {
      Cycle.updateAll({
        active: true,
        id: { neq: instance.id }
      }, {active: false}, next);
    } else next();
  });


};
