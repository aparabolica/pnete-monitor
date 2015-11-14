module.exports = function(app) {

  app.controller('LoginCtrl', [
    '$scope',
    '$state',
    'User',
    function($scope, $state, User) {

      $scope.login = function() {

        User.login($scope.credentials, function() {
          $state.go('dashboard');
        });

      }

    }
  ]);

  app.controller('DashboardCtrl', [
    '$scope',
    '$state',
    'Auth',
    'User',
    'ContentCount',
    function($scope, $state, Auth, User, Count) {

      $scope.user = Auth;

      $scope.$watch(function() {
        return User.isAuthenticated();
      }, function(auth) {
        if(!auth)
          $state.go('login');
      });

      $scope.count = Count;

    }
  ]);

  app.controller('DashboardUserCtrl', [
    '$scope',
    'Users',
    function($scope, Users) {
      $scope.users = Users;
    }
  ]);

  app.controller('DashboardEditUserCtrl', [
    '$scope',
    'User',
    'Edit',
    function($scope, User, Edit) {
      $scope.user = _.extend({}, Edit);
      $scope.submit = function(user) {
        if(!_.isEmpty(user)) {
          User.update({where: {id: user.id}}, user, function(res) {
            console.log(res);
            $scope.user = res;
          });
        } else {
          User.create(user, function(res) {
            console.log(res);
            $scope.user = res;
          })
        }
      };
    }
  ]);

  app.controller('DashboardCicleCtrl', [
    '$scope',
    'Ciclos',
    function($scope, Ciclos) {
      $scope.ciclos = Ciclos;
    }
  ]);

  app.controller('DashboardEditCicleCtrl', [
    '$scope',
    'Cicle',
    'Edit',
    function($scope, Cicle, Edit) {
      $scope.ciclo = _.extend({}, Edit);
      $scope.submit = function(ciclo) {
        if(!_.isEmpty(Edit)) {
          Cicle.update({where: {id: ciclo.id}}, ciclo, function(res) {
            console.log(res);
            $scope.ciclo = res;
          });
        } else {
          Cicle.create(ciclo, function(res) {
            console.log(res);
            $scope.ciclo = res;
          });
        }
      };
    }
  ])

  app.controller('DashboardOrganizationCtrl', [
    '$scope',
    'Organizations',
    function($scope, Organizations) {
      $scope.organizations = Organizations;
    }
  ]);

  app.controller('DashboardEditOrganizationCtrl', [
    '$scope',
    'Organization',
    'Edit',
    function($scope, Organization, Edit) {
      $scope.organization = _.extend({}, Edit);
      $scope.submit = function(organization) {
        if(!_.isEmpty(Edit)) {
          Organization.update({where: {id: organization.id}}, organization, function(res) {
            console.log(res);
            $scope.organization = res;
          });
        } else {
          Organization.create(organization, function(res) {
            console.log(res);
            $scope.organization = res;
          })
        }
      };
    }
  ]);

  app.controller('DashboardActionCtrl', [
    '$scope',
    'Actions',
    function($scope, Actions) {
      $scope.actions = Actions;
    }
  ]);

  app.controller('DashboardEditActionCtrl', [
    '$scope',
    'Action',
    'Edit',
    function($scope, Action, Edit) {
      $scope.action = _.extend({}, Edit);
      $scope.submit = function(action) {
        console.log(Edit);
        if(!_.isEmpty(Edit)) {
          Action.update({where: {id: action.id}}, action, function(res) {
            console.log(res);
            $scope.action = res;
          });
        } else {
          Action.create(action, function(res) {
            console.log(res);
            $scope.action = res;
          })
        }
      };
    }
  ]);

  app.controller('DashboardEixoCtrl', [
    '$scope',
    'Eixos',
    function($scope, Eixos) {
      $scope.eixos = Eixos;
    }
  ]);

  app.controller('DashboardEditEixoCtrl', [
    '$scope',
    'Axis',
    'Edit',
    function($scope, Axis, Edit) {
      $scope.eixo = _.extend({}, Edit);
      $scope.submit = function(eixo) {
        console.log(Edit);
        if(!_.isEmpty(Edit)) {
          Axis.update({where: {id: eixo.id}}, eixo, function(res) {
            console.log(res);
            $scope.eixo = res;
          });
        } else {
          Axis.create(eixo, function(res) {
            console.log(res);
            $scope.eixo = res;
          })
        }
      };
    }
  ]);

  app.controller('DashboardIndicadorCtrl', [
    '$scope',
    'Indicadores',
    function($scope, Indicadores) {
      $scope.indicadores = Indicadores;
    }
  ]);

  app.controller('DashboardEditIndicadorCtrl', [
    '$scope',
    'Indicator',
    'Organization',
    'Eixos',
    'Actions',
    'Edit',
    'IndicatorOrganizations',
    'IndicatorActions',
    function($scope, Indicator, Organization, Eixos, Actions, Edit, IndicatorOrganizations, IndicatorActions) {

      $scope.eixos = Eixos;
      $scope.actions = Actions;

      $scope.indicador = _.extend({}, Edit);

      var updateActions = function(actions, indicator) {
        var prevIds = _.map(IndicatorActions, function(action) { return action.id; });
        var newIds = _.map(actions, function(action) { return action.id; });
        var rm = _.difference(prevIds, newIds);
        var add = _.difference(newIds, prevIds);
        if(rm.length) {
          _.each(rm, function(actionId) {
            Indicator.actions.unlink({id: indicator.id, fk: actionId}, function() {
              IndicatorActions = _.filter(IndicatorActions, function(action) {
                return action.id !== actionId; });
            });
          });
        }
        if(add.length) {
          _.each(add, function(actionId) {
            Indicator.actions.link({id: indicator.id, fk: actionId}, null, function(data) {
              IndicatorActions.push(_.find($scope.actions, function(action) { return action.id == data.actionId; }));
            });
          });
        }
      };

      var updateOrganizations = function(organizations, indicator) {
        var prevIds = _.map(IndicatorOrganizations, function(organization) { return organization.id; });
        var newIds = _.map(organizations, function(organization) { return organization.id; });
        var rm = _.difference(prevIds, newIds);
        var add = _.difference(newIds, prevIds);
        if(rm.length) {
          _.each(rm, function(organizationId) {
            Indicator.organizations.unlink({id: indicator.id, fk: organizationId}, function() {
              IndicatorOrganizations = _.filter(IndicatorOrganizations, function(organization) {
                return organization.id !== organizationId; });
            });
          });
        }
        if(add.length) {
          _.each(add, function(organizationId) {
            Indicator.organizations.link({id: indicator.id, fk: organizationId}, null, function(data) {
              IndicatorOrganizations.push(_.find($scope.organizations, function(organization) { return organization.id == data.organizationId; }));
            });
          });
        }
      };

      /*
       * Indicator Actions Model
       */
      // Init checkbox model
      $scope.selectedActions = {};
      // Populate checkbox model with indicator data
      _.each(IndicatorActions, function(action) {
        $scope.selectedActions[action.id] = true;
      });

      /*
       * Indicator Organizations Model
       */
      $scope.indicadorOrganizations = IndicatorOrganizations.slice(0);
      $scope.orgSearch = '';
      var doOrgSearch = _.debounce(function(search) {
        if(search) {
          Organization.find({
            filter: {
              where: {
                name: { regexp: '' + search.replace(' ', '|') + '' },
                id: { nin: _.map($scope.indicadorOrganizations, function(organization) {
                  return organization.id;
                }) }
              },
            limit: 5
            }
          }, function(organizations) {
            $scope.organizations = organizations;
          });
        }
      }, 500);
      $scope.$watch('orgSearch', function(search) {
        if(!search) {
          $scope.organizations = [];
        } else {
          doOrgSearch(search);
        }
      });
      $scope.removeOrganization = function(organization) {
        if(confirm('Você tem certeza?'))
          $scope.indicadorOrganizations = _.filter($scope.indicadorOrganizations, function(org) { return org.id !== organization.id; });
      };
      $scope.addOrganization = function(organization) {
        $scope.indicadorOrganizations.push(organization);
      };
      $scope.organizationListed = function(organization) {
        return _.find($scope.indicadorOrganizations, function(org) { return org.id == organization.id; });
      };

      var afterSave = function(res) {
        var actions = _.filter($scope.actions, function(action) {
          return $scope.selectedActions[action.id];
        });
        updateActions(actions, res);
        updateOrganizations($scope.indicadorOrganizations, res);
      };

      $scope.submit = function(indicador) {
        if(!_.isEmpty(Edit)) {
          Indicator.update({where: {id: indicador.id}}, indicador, function(res) {
            $scope.indicador = res;
            afterSave(res);
          });
        } else {
          Indicator.create(indicador, function(res) {
            $scope.indicador = res;
            afterSave(res);
          })
        }
      };

    }
  ]);

};
