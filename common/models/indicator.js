var json2csv = require('json2csv');
var modelConfig = require('./indicator.json')
var properties = Object.keys(modelConfig.properties);


module.exports = function(Indicator) {

  /*
   * Disable unwanted endpoints
   */
  Indicator.disableRemoteMethod("upsert", true);
  Indicator.disableRemoteMethod("updateAll", true);
  Indicator.disableRemoteMethod("createChangeStream", true);


  Indicator.validatesInclusionOf('type', {in: ['boolean', 'integer', 'percentual', 'discursive']});

  var ADMIN_FIELDS = ['comments'];
  Indicator.afterRemote('**', function(ctx, modelInstance, next) {
    var isAuthenticated = ctx.req.accessToken;

    if (ctx.result && !isAuthenticated) {
      if (Array.isArray(modelInstance)) {
        var answer = [];
        ctx.result.forEach(function (result) {
          var replacement = result.toJSON();
          ADMIN_FIELDS.forEach(function(field){
            delete replacement[field];
          });
          answer.push(replacement);
        });
      } else {
        var answer = ctx.result.toJSON();
        ADMIN_FIELDS.forEach(function(field){
          delete answer[field];
        });
      }
      ctx.result = answer;
    }

    next();
  });

  Indicator.export = function(filter, res, doneExport) {
    properties.push('axisId');
    Indicator.find(filter, function(err, results){
      json2csv({ data: results, fields: properties }, function(err, csv){
        res.attachment('indicators.csv');
        res.send(csv);
      });
    });
  }

  Indicator.remoteMethod(
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
