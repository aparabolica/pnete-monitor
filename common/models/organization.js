var json2csv = require('json2csv');
var modelConfig = require('./organization.json')
var properties = Object.keys(modelConfig.properties);

module.exports = function(Organization) {

  /*
   * Disable unwanted endpoints
   */
  Organization.disableRemoteMethod("upsert", true);
  Organization.disableRemoteMethod("updateAll", true);
  Organization.disableRemoteMethod("createChangeStream", true);

  Organization.observe('after delete', function(ctx, next) {
    var CycleEnrollment = Organization.app.models.CycleEnrollment;
    var query = ctx.where;

    // delete relations to cycles
    if (query['id']) {
      CycleEnrollment.destroyAll({organizationId: query['id']}, next)
    } else next();

  });


  Organization.export = function(filter, res, doneExport) {
    Organization.find(filter, function(err, results){
      json2csv({ data: results, fields: properties }, function(err, csv){
        res.attachment('organizations.csv');
        res.send(csv);
      });
    });
  }

  Organization.remoteMethod(
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
