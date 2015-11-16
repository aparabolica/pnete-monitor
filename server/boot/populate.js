var async = require('async');
var populate = require('../../lib/populate.js')

module.exports = function(app, donePopulate) {

  var Action = app.models.Action;
  var Axis = app.models.Axis;
  var Indicator = app.models.Indicator;
  var Organization = app.models.Organization;

  async.series([
    populate.importAxes,
    populate.importActions,
    populate.importOrganizations,
    populate.importIndicators
  ], donePopulate)
}
