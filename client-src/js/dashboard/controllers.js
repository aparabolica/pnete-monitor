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
        if(!_.isEmpty(organization)) {
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
    'Eixos',
    'Actions',
    'Edit',
    function($scope, Indicator, Eixos, Actions, Edit) {
      $scope.eixos = Eixos;
      $scope.actions = Actions;
      $scope.indicador = _.extend({}, Edit);
      $scope.submit = function(indicador) {
        console.log(Edit);
        if(!_.isEmpty(Edit)) {
          Indicator.update({where: {id: indicador.id}}, indicador, function(res) {
            console.log(res);
            $scope.indicador = res;
          });
        } else {
          Indicator.create(indicador, function(res) {
            console.log(res);
            $scope.indicador = res;
          })
        }
      };
    }
  ]);

};
