var _ = require('underscore');
var json2csv = require('json2csv');
var modelConfig = require('./axis.json')
var properties = Object.keys(modelConfig.properties);

module.exports = function(Axis) {

  /*
   * Disable unwanted endpoints
   */
  Axis.disableRemoteMethod("upsert", true);
  Axis.disableRemoteMethod("updateAll", true);
  Axis.disableRemoteMethod("createChangeStream", true);

  Axis.organizations = function(id, doneOrganizations){
    Axis.find({where: {id: id}, include: {"indicators": "organizations"}}, function(err, axes){
      if (err || !axes) return doneOrganizations(err);
      else {

        // get all organizations
        var organizations = [];
        _.each(axes, function(axis){
          var axis = axis.toJSON();
          if (axis.indicators) {
            _.each(axis.indicators, function(indicator){
              if (indicator.organizations) {
                _.each(indicator.organizations, function(org){
                  organizations.push(org);
                });
              }
            })
          }
        });

        // remove duplicates
        organizations = _.uniq(organizations, function(n){
          return n.id;
        });

        doneOrganizations(null, organizations);
      }
    })
  }

  Axis.remoteMethod(
      'organizations',
      {
        accepts: [
          {arg: 'id', type: 'string', required: true},
        ],
        returns: [
          {arg: 'organizations', type: 'array'},
        ],
        http: {path: '/:id/organizations', verb: 'get'}
      }
    );

    Axis.export = function(filter, res, doneExport) {
      Axis.find(filter, function(err, results){
        json2csv({ data: results, fields: properties }, function(err, csv){
          res.attachment('axis.csv');
          res.send(csv);
        });
      });
    }

    Axis.remoteMethod(
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
