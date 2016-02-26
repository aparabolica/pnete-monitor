var json2csv = require('json2csv');
var modelConfig = require('./feedback.json')
var properties = Object.keys(modelConfig.properties);
properties.push('value.value', 'value.bool', 'value.comments')

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

    // as value.bool type is not defined, always convert to int
    if (ctx.req.body.value && ctx.req.body.value.bool) {
      ctx.req.body.value.bool = parseInt(ctx.req.body.value.bool);
    }

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

      // as value.bool type is not defined, always convert to int
      if (ctx.instance.value && ctx.instance.value.bool) {
        ctx.instance.value.bool = parseInt(ctx.instance.value.bool);
      }
    } else {
      FILTERED_PROPERTIES.forEach(function(p) { delete ctx.data[p]; });

      // as value.bool type is not defined, always convert to int
      if (ctx.data.value && ctx.data.value.bool) {
        ctx.data.value.bool = parseInt(ctx.data.value.bool);
      }

    }

    next();
  });

  Feedback.export = function(filter, res, doneExport) {
    Feedback.find(filter, function(err, results){
      json2csv({ data: results, fields: properties }, function(err, csv){
        res.attachment('feedbacks.csv');
        res.send(csv);
      });
    });
  }

  Feedback.remoteMethod(
    'export',
    {
      http: { verb: 'get' },
      accepts: [
        {arg: 'filter', type: 'object'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      returns: {arg: 'data', root: true}
    }
  )


};
