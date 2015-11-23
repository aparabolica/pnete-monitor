var _ = require('underscore');
var async = require('async');

module.exports = function(Cycle) {

  /*
   * Disable unwanted endpoints
   */
  Cycle.disableRemoteMethod("upsert", true);
  Cycle.disableRemoteMethod("updateAll", true);
  Cycle.disableRemoteMethod("createChangeStream", true);

  /*
   * Remote methods
   */

  Cycle.status = function(axisId, indicatorId, organizationId, doneStatus){
    var self = this;
    var Indicator = Cycle.app.models.Indicator;
    var Feedback = Cycle.app.models.Feedback;
    var enrollees = {};
    var indicatorIds = [];
    var counts = {
      feedbacks: {
        needed: 0,
        given: 0
      }
    }

    /*
      Feedback counts are made in four steps:

      1 - get all enrollees of active cycle
      2 - for each indicator, count related organizations which are enrollees
      3 - count givin feedbacks of active cycle
     */

    async.series([ function(doneEachSeries){
      // get organizations enrolled in active cycle
      Cycle.findOne({
        where: {
          active: true
        },
        include: {
          relation: 'enrollees'
        }
      }, function(err, cycle) {
        if (err) return doneStatus(err);
        cycle = cycle.toJSON();
        _.each(cycle.enrollees, function(org){
          // filter by org
          if ((organizationId && org.id == organizationId) || (!organizationId)) {
            enrollees[org.id] = org;
          }
        });
        doneEachSeries();
      });
    }, function(doneEachSeries){
      // get indicators, performing count discarding non-enrollees orgs
      Indicator.find({
        where: {
          id: indicatorId,
          axisId: axisId
        },
        include: {
          relation: 'organizations'
        }
      }, function(err, indicators) {
        _.each(indicators, function(indicator){
          indicator = indicator.toJSON();

          indicatorIds.push(indicator.id);

          _.each(indicator.organizations, function(org){
            if (enrollees[org.id]) counts.feedbacks.needed += 1;
          })
        });
        doneEachSeries();
      });
    }, function(doneEachSeries){
      // get indicators, performing count discarding non-enrollees orgs
      Feedback.count({
        cycleId: self.id,
        indicatorId: {inq: indicatorIds},
        organizationId: organizationId
      }, function(err, count) {
        if (err) return doneEachSeries(err);
        counts.feedbacks.given = count;
        doneEachSeries();
      });
    }], function(errs, doneEachSeries){
      doneStatus(errs, counts);
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
