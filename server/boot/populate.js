var async = require('async');
var populate = require('../../lib/populate.js')

module.exports = function(app, donePopulate) {

  var Action = app.models.Action;
  var Axis = app.models.Axis;
  var Indicator = app.models.Indicator;
  var Organization = app.models.Organization;

  var tasks = [populate.initSettings];

  if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    tasks.push(populate.importAxes,
      populate.importActions,
      populate.importOrganizations,
      populate.importIndicators
    );
  }

  async.series(tasks, donePopulate)

}
