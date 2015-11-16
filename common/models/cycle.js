var async = require('async');

module.exports = function(Cycle) {

  /*
   * Disable unwanted endpoints
   */
  Cycle.disableRemoteMethod("upsert", true);
  Cycle.disableRemoteMethod("updateAll", true);
  Cycle.disableRemoteMethod("createChangeStream", true);

  /*
   * Cycle status
   */
  Cycle.remoteMethod('status',{
   http: {path: '/:id/status', verb: 'get'},
   accepts: {arg: 'id', type: 'string', required: true},
   returns: {name: 'status', type: 'Object'}
  });

  Cycle.status = function(doneStatus){
    var Feedback = Cycle.app.models.Feedback;
    var Indicator = Cycle.app.models.Indicator;

    function getIndicatorsCount(doneGetIndicatorsCount){
      Indicator.find({}, function(err, indicators){
        async.each(indicators, function(indicator, doneEachIndicator){
          indicator.organizations.count(function(err, count){
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

  /**
   * After cycle creation
   **/
   Cycle.afterRemote('create', function(ctx, cycle, next){
     var Organization = Cycle.app.models.Organization;
     Organization.find({}, function(err, orgs){
       if (err) return next(err);
       async.eachSeries(orgs, function(org, doneOrg){
         cycle.enrollees.add(org, function(err){
           if (err) return next(err);
           doneOrg();
         });
       }, function(err){
         if (err) return next(err);
         next();
       })
     });
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
