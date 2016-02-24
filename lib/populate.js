/*
 * Module dependencies
 */
var app = require('../server/server');
var fs = require('fs');
var async = require('async');
var csv = require('csv');

/*
 * Exports
 */

exports.initSettings = function(doneInitSettings) {
  var Settings = app.models.Settings;

  Settings.findOne({}, function(err, settings){
    if (!settings) {
      Settings.create({
        welcomeText:
          '<main>' +
            '<p>Você foi convidado a participar do Monitor do PNETE.</p>'+
            '<a href="<%= activationLink %>">Abra este link no navegador para confirmar sua conta.</p>'+
          '</main>'
      }, doneInitSettings);
    } else doneInitSettings();
  });
}

exports.initStorage = function(doneInitStorage) {
  var Container = app.models.Container;

  Container.getContainers(function(err, containers){
    if (containers.length == 0) {
      Container.createContainer({
        name: 'default'
      }, doneInitStorage(err));
    } else doneInitStorage();
  });

}

exports.importAxes = function(doneImportAxes) {
  var Axis = app.models.Axis;
  Axis.count(function(err, count){
    if (err) return doneImportAxes(err);

    if (count == 0) {
      rs = fs.createReadStream(__dirname+'/../data/axes.csv');
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

exports.importActions = function(doneImportActions){
  var Action = app.models.Action;

  Action.count(function(err, count){
    if (err) throw err;

    if (count == 0) {
      rs = fs.createReadStream(__dirname+'/../data/actions.csv');
      var parser = csv.parse({columns: true, trim: true}, function(err, data){
        if (err) return doneImportActions(err);


        async.eachSeries(data, function(item, doneEach){
          var action = new Action(item);
          action.save(doneEach);
        }, function(err){
          if (!err) console.log('Actions imported successfully');
          doneImportActions(err);
        });

      });
      rs.pipe(parser);
    } else doneImportActions();
  });
}

exports.importOrganizations = function(doneImportOrganizations){
  var Organization = app.models.Organization;

  Organization.count(function(err, count){
    if (err) return doneImportOrganizations(err);


    // If no organizations are present
    if (count == 0) {
      rs = fs.createReadStream(__dirname+'/../data/organizations.csv');
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


exports.importIndicators = function(doneImportIndicators) {
  var Organization = app.models.Organization;
  var Indicator = app.models.Indicator;

  Indicator.count(function(err, count){
    if (err) throw err;

    if (count == 0) {
      rs = fs.createReadStream(__dirname+'/../data/indicators.csv');
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
          if (!err) console.log('Indicators imported successfully.');
          doneImportIndicators(err);
        });

      });
      rs.pipe(parser);
    } else doneImportIndicators();
  });
}
