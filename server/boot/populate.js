module.exports = function(app) {
  var async = require('async');
  var fs = require('fs');
  var csv = require('csv');

  var Action = app.models.Action;
  var Axis = app.models.Axis;
  var Indicator = app.models.Indicator;
  var Organization = app.models.Organization;

  async.series([importAxes, importActions, importOrganizations, importIndicators], function(err){
    if (err) console.log(err);
  })

  function importAxes(doneImportAxes) {
    Axis.count(function(err, count){
      if (err) return doneImportAxes(err);

      if (count == 0) {
        rs = fs.createReadStream(__dirname+'/../../data/axes.csv');
        var parser = csv.parse({columns: true}, function(err, data){
          if (err) return doneImportAxes(err);

          async.eachSeries(data, function(item, doneEach){
            var axis = new Axis(item);
            axis.save(doneEach);
          }, function(err){
            if (!err) console.log('Axes imported successfully')
            doneImportAxes(err);
          });

        });
        rs.pipe(parser);
      } else doneImportAxes();
    });
  }

  function importActions(doneImportActions){
    Action.count(function(err, count){
      if (err) throw err;

      if (count == 0) {
        rs = fs.createReadStream(__dirname+'/../../data/actions.csv');
        var parser = csv.parse({columns: true, trim: true}, function(err, data){
          if (err) return doneImportActions(err);


          async.eachSeries(data, function(item, doneEach){
            var action = new Action(item);
            action.save(doneEach);
          }, function(err){
            if (err) return doneImportActions(err);
            else console.log('Actions imported successfully')
          });

        });
        rs.pipe(parser);
      } else doneImportActions();
    });
  }

  function importOrganizations(doneImportOrganizations){
    var Organization = app.models.Organization;

    // Organization.count(function(err, count){
    Organization.remove(function(err, count){
      if (err) return doneImportOrganizations(err);

      // If no organizations are present
      // if (count == 0) {
      if (true) {
        rs = fs.createReadStream(__dirname+'/../../data/organizations.csv');
        var parser = csv.parse({columns: true, trim: true}, function(err, data){
          if (err) return doneImportOrganizations(err);

          // save indicator
          async.eachSeries(data, function(item, doneEach){
            var organization = new Organization(item);
            organization.save(doneEach);
          }, function(err){
            if (!err) console.log('Organizations imported successfully');
            doneImportOrganizations(err);
          });
        });
        rs.pipe(parser);
      } else doneImportOrganizations();
    });
  }


  function importIndicators(doneImportIndicators) {
    // Indicator.count(function(err, count){
    Indicator.remove(function(err, count){
      if (err) throw err;

      // if (count == 0) {
      if (true) {
        rs = fs.createReadStream(__dirname+'/../../data/indicators.csv');
        var parser = csv.parse({columns: true, trim: true}, function(err, data){
          if (err) throw err;

          // save indicator
          async.eachSeries(data, function(item, doneEachIndicator){
            var indicator = new Indicator(item);
            indicator.save(function(err){
              if (err) return console.log(err);

              var organizationsShortNames = item.organizations.split(',');

              async.eachSeries(organizationsShortNames, function(shortName, doneEachOrganization){

                // adds indicators to actions
                Organization.findOne({where: {"shortName": shortName.trim()} }, function(err, org){
                  if (err) doneEachOrganization(err);
                  if (!org) {
                    // don't display message for empty names
                    if (shortName.length > 0) console.log('Não encontrado: ' + shortName);
                    doneEachOrganization();
                  } else {
                    org.indicators.add(indicator, doneEachOrganization)
                  }
                })
              }, doneEachIndicator);

            });
          }, function(err){
            if (err) console.log('Error importing actions.');
            doneImportIndicators(err);
          });

        });
        rs.pipe(parser);
      } else doneImportIndicators();
    });
  }
}
