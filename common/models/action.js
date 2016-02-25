var json2csv = require('json2csv');
var modelConfig = require('./action.json')
var properties = Object.keys(modelConfig.properties);

module.exports = function(Action) {

  /*
   * Disable unwanted endpoints
   */
  Action.disableRemoteMethod("upsert", true);
  Action.disableRemoteMethod("updateAll", true);
  Action.disableRemoteMethod("createChangeStream", true);

  Action.export = function(filter, res, doneExport) {
    Action.find(filter, function(err, actions){
      json2csv({ data: actions, fields: properties }, function(err, csv){
        res.attachment('actions.csv');
        res.send(csv);
      });
    });
  }

  Action.remoteMethod(
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
