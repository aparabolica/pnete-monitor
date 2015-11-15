module.exports = function(app) {

  app.controller('ConfirmUserCtrl', [
    '$scope',
    '$stateParams',
    'User',
    function($scope, $stateParams, User) {
      $scope.user = {
        token: $stateParams.token,
        uid: $stateParams.uid
      };
      $scope.confirm = function(user) {
        
      };
    }
  ]);

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
    'ActiveCycle',
    'User',
    'ContentCount',
    function($scope, $state, Auth, ActiveCycle, User, Count) {

      $scope.user = Auth;

      $scope.activeCycle = ActiveCycle;

      if(ActiveCycle.endDate) {
        var m = moment(ActiveCycle.endDate).utc();
        if(m < moment().utc()) {
          $scope.endCycleText = 'O monitoramento deste ciclo foi concluído para análise final'
        } else {
          $scope.endCycleText = 'O monitoramento deste ciclo será concluído para análise final';
        }
        $scope.endCycleFromNow = m.fromNow();
        $scope.endCycleDate = m.format('DD/MM/YYYY');
      }

      $scope.$watch(function() {
        return User.isAuthenticated();
      }, function(auth) {
        if(!auth)
          $state.go('login');
      });

      $scope.count = Count;

    }
  ]);

  app.controller('DashboardProfileCtrl', [
    '$scope',
    'Auth',
    'UserOrganization',
    'UserIndicators',
    function($scope, Profile, UserOrganization, UserIndicators) {
      $scope.user = Profile;
      $scope.organization = UserOrganization;
      $scope.indicadores = UserIndicators;
    }
  ]);

  app.controller('DashboardUserCtrl', [
    '$scope',
    'User',
    'Users',
    function($scope, User, Users) {
      $scope.users = Users;
      _.each($scope.users, function(user) {
        User.organization({id: user.id}, function(organization) {
          user.organization = organization;
        });
      });
    }
  ]);

  app.controller('DashboardEditUserCtrl', [
    '$scope',
    'User',
    'Organization',
    'Edit',
    'UserOrganization',
    function($scope, User, Organization, Edit, UserOrganization) {
      $scope.user = _.extend({}, Edit);
      $scope.userOrganization = _.extend({}, UserOrganization);

      /*
       * User Organization
       */
      $scope.orgSearch = '';
      $scope.organizations = [];
      var doOrgSearch = _.debounce(function(search) {
        if(search) {
          Organization.find({
            filter: {
              where: {
                name: { regexp: '' + search.replace(' ', '|') + '' },
                id: { nin: [$scope.userOrganization.id] }
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
      $scope.removeOrganization = function() {
        if(confirm('Você tem certeza?')) {
          $scope.user.organizationId = null;
          $scope.userOrganization = {};
        }
      };
      $scope.addOrganization = function(organization) {
        $scope.user.organizationId = organization.id;
        $scope.userOrganization = organization;
      };
      $scope.organizationListed = function(organization) {
        return $scope.userOrganization.id == organization.id;
      };

      $scope.submit = function(user) {
        if(!_.isEmpty(Edit)) {
          User['prototype$updateAttributes']({id: user.id}, user, saveCb);
        } else {
          User.create(user, saveCb);
        }
      };

      var saveCb = function(res) {
        Edit = res;
        $scope.user = _.extend({}, Edit);
        $scope.$emit('saved', res);
      };
    }
  ]);

  app.controller('DashboardCycleCtrl', [
    '$scope',
    'Ciclos',
    function($scope, Ciclos) {
      $scope.ciclos = Ciclos;
      _.each($scope.ciclos, function(ciclo) {
        if(ciclo.endDate) {
          var m = moment(ciclo.endDate).utc();
          ciclo.formattedDate = {
            fromNow: m.fromNow(),
            date: m.format('DD/MM/YYYY')
          };
        }
      });
    }
  ]);

  app.controller('DashboardEditCycleCtrl', [
    '$scope',
    'Cycle',
    'Edit',
    function($scope, Cycle, Edit) {
      $scope.ciclo = _.extend({}, Edit);

      $scope.submit = function(ciclo) {
        if(!_.isEmpty(Edit)) {
          Cycle['prototype$updateAttributes']({id: ciclo.id}, ciclo, saveCb);
        } else {
          Cycle.create(ciclo, saveCb);
        }
      };

      var saveCb = function(res) {
        Edit = res;
        $scope.ciclo = _.extend({}, res);
        $scope.$emit('saved', res);
      }
    }
  ]);

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
          Organization['prototype$updateAttributes']({id: organization.id}, organization, saveCb);
        } else {
          Organization.create(organization, saveCb);
        }
      };

      var saveCb = function(res) {
        Edit = res;
        $scope.organization = _.extend({}, res);
        $scope.$emit('saved', res);
      }
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
        if(!_.isEmpty(Edit)) {
          Action['prototype$updateAttributes']({id: action.id}, action, saveCb);
        } else {
          Action.create(action, saveCb);
        }
      };
      var saveCb = function(res) {
        Edit = res;
        $scope.action = _.extend({}, Edit);
        $scope.$emit('saved', res);
      }
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
    'Actions',
    'Axis',
    'Edit',
    'AxisActions',
    function($scope, Actions, Axis, Edit, AxisActions) {

      $scope.actions = Actions;
      $scope.eixo = _.extend({}, Edit);

      var updateActions = function(actions, axis) {
        var prevIds = _.map(AxisActions, function(action) { return action.id; });
        var newIds = _.map(actions, function(action) { return action.id; });
        var rm = _.difference(prevIds, newIds);
        var add = _.difference(newIds, prevIds);
        if(rm.length) {
          _.each(rm, function(actionId) {
            Axis.actions.unlink({id: axis.id, fk: actionId}, function() {
              AxisActions = _.filter(AxisActions, function(action) {
                return action.id !== actionId; });
            });
          });
        }
        if(add.length) {
          _.each(add, function(actionId) {
            Axis.actions.link({id: axis.id, fk: actionId}, null, function(data) {
              AxisActions.push(_.find($scope.actions, function(action) { return action.id == data.actionId; }));
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
      _.each(AxisActions, function(action) {
        $scope.selectedActions[action.id] = true;
      });


      $scope.$on('saved', function(ev, res) {
        var actions = _.filter($scope.actions, function(action) {
          return $scope.selectedActions[action.id];
        });
        updateActions(actions, res);
      });

      $scope.submit = function(eixo) {
        if(!_.isEmpty(Edit)) {
          Axis['prototype$updateAttributes']({id: eixo.id}, eixo, saveCb);
        } else {
          Axis.create(eixo, saveCb);
        }
      };
      var saveCb = function(res) {
        Edit = res;
        $scope.eixo = _.extend({}, Edit);
        $scope.$emit('saved', res);
      }
    }
  ]);

  app.controller('DashboardIndicadorCtrl', [
    '$scope',
    'Indicadores',
    'ActiveCycle',
    'Assessment',
    function($scope, Indicadores, ActiveCycle, Assessment) {
      $scope.indicadores = Indicadores;
      _.each($scope.indicadores, function(indicador) {
        Assessment.findOne({
          filter: {
            where: {
              indicatorId: indicador.id
            }
          }
        }, function(data) {
          indicador.assessed = true;
        });
      });
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

      $scope.$on('saved', function(ev, res) {
        var actions = _.filter($scope.actions, function(action) {
          return $scope.selectedActions[action.id];
        });
        updateActions(actions, res);
        updateOrganizations($scope.indicadorOrganizations, res);
      });

      $scope.submit = function(indicador) {
        if(!_.isEmpty(Edit)) {
          Indicator['prototype$updateAttributes']({id: indicador.id}, indicador, saveCb);
        } else {
          Indicator.create(indicador, saveCb);
        }
      };

      var saveCb = function(res) {
        Edit = res;
        $scope.indicador = _.extend({}, Edit);
        $scope.$emit('saved', res);
      }

    }
  ]);

  app.controller('DashboardAssessIndicadorCtrl', [
    '$scope',
    '$stateParams',
    'Review',
    'ReviewCycle',
    'Assessment',
    function($scope, $stateParams, Review, ReviewCycle, Assessment) {

      $scope.cycle = ReviewCycle;

      $scope.review = _.extend({
        indicatorId: $stateParams.id,
        cycleId: ReviewCycle.id
      }, Review);

      $scope.submit = function(review) {
        if(!_.isEmpty(Review)) {
          Assessment['prototype$updateAttributes']({id: review.id}, review, saveCb);
        } else {
          Assessment.create(review, saveCb);
        }
      };

      var saveCb = function(res) {
        Edit = res;
        $scope.review = _.extend({}, Edit);
        $scope.$emit('saved', res);
      }
    }
  ]);

};
