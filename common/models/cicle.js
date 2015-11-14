var async = require('async');

module.exports = function(Cicle) {


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
