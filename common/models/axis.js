var _ = require('underscore');

module.exports = function(Axis) {

  /*
   * Disable unwanted endpoints
   */
  Axis.disableRemoteMethod("upsert", true);
  Axis.disableRemoteMethod("updateAll", true);
  Axis.disableRemoteMethod("createChangeStream", true);

  Axis.organizations = function(id, doneOrganizations){
    Axis.find({id: id, include: {"indicators": "organizations"}}, function(err, axes){
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

};
