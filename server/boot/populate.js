var async = require('async');
var populate = require('../../lib/populate.js')

module.exports = function(app, donePopulate) {

  var Action = app.models.Action;
  var Axis = app.models.Axis;
  var Indicator = app.models.Indicator;
  var Organization = app.models.Organization;

  if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    async.series([
      populate.initSettings,
      populate.importAxes,
      populate.importActions,
      populate.importOrganizations,
      populate.importIndicators
    ], donePopulate)
  } else donePopulate();
}
