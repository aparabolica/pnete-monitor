module.exports = function(app) {

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

      $stateProvider
      .state('login', {
        url: '/login/',
        controller: 'LoginCtrl',
        templateUrl: '/views/dashboard/login.html',
        resolve: {
          Auth: [
            '$state',
            '$q',
            'User',
            function($state, $q, User) {
              var deferred = $q.defer();
              User.getCurrent(function(val) {
                $state.go('dashboard');
                deferred.reject(false);
              }, function(err) {
                deferred.resolve(true);
              });
              return deferred.promise;
            }
          ]
        }
      })
      .state('dashboard', {
        url: '/dashboard/',
        controller: 'DashboardCtrl',
        templateUrl: '/views/dashboard/index.html',
        resolve: {
          Auth: [
            '$state',
            '$q',
            'User',
            function($state, $q, User) {
              var deferred = $q.defer();
              User.getCurrent(function(val) {
                deferred.resolve(val);
              }, function(err) {
                $state.go('login');
              });
              return deferred.promise;
            }
          ]
        }
      })
      .state('dashboard.user', {
        url: 'usuarios/',
        controller: 'DashboardUserCtrl',
        templateUrl: '/views/dashboard/user.html',
        resolve: {
          Users: [
            'User',
            function(User) {
              return User.find().$promise;
            }
          ]
        }
      })
      .state('dashboard.user.edit', {
        url: 'editar/?id',
        controller: 'DashboardEditUserCtrl',
        templateUrl: '/views/dashboard/user-edit.html',
        resolve: {
          'Edit': [
            '$stateParams',
            'User',
            function($stateParams, User) {
              if($stateParams.id) {
                return User.findOne({
                  filter: {
                    where: {
                      id: $stateParams.id
                    }
                  }
                }).$promise;
              } else {
                return {};
              }
            }
          ]
        }
      })
      .state('dashboard.indicador', {
        url: 'indicadores/',
        templateUrl: '/views/dashboard/indicador.html'
      })
      .state('dashboard.indicador.edit', {
        url: 'editar/?id',
        templateUrl: '/views/dashboard/indicador-edit.html'
      })
      .state('dashboard.indicador.review', {
        url: 'avaliar/?id',
        templateUrl: '/views/dashboard/indicador-review.html'
      })
      .state('dashboard.action', {
        url: 'acoes/',
        controller: 'DashboardActionCtrl',
        templateUrl: '/views/dashboard/action.html',
        resolve: {
          'Actions': [
            'Action',
            function(Action) {
              return Action.find().$promise;
            }
          ]
        }
      })
      .state('dashboard.action.edit', {
        url: 'editar/?id',
        controller: 'DashboardEditActionCtrl',
        templateUrl: '/views/dashboard/action-edit.html',
        resolve: {
          'Edit': [
            '$stateParams',
            'Action',
            function($stateParams, Action) {
              if($stateParams.id) {
                return Action.findOne({
                  filter: {
                    where: {
                      id: $stateParams.id
                    }
                  }
                }).$promise;
              } else {
                return {};
              }
            }
          ]
        }
      })
      .state('dashboard.organization', {
        url: 'organizacoes/',
        controller: 'DashboardOrganizationCtrl',
        templateUrl: '/views/dashboard/organization.html',
        resolve: {
          'Organizations': [
            'Organization',
            function(Organization) {
              return Organization.find().$promise;
            }
          ]
        }
      })
      .state('dashboard.organization.edit', {
        url: 'editar/?id',
        controller: 'DashboardEditOrganizationCtrl',
        templateUrl: '/views/dashboard/organization-edit.html',
        resolve: {
          'Edit': [
            '$stateParams',
            'Organization',
            function($stateParams, Organization) {
              if($stateParams.id) {
                return Organization.findOne({
                  filter: {
                    where: {
                      id: $stateParams.id
                    }
                  }
                }).$promise;
              } else {
                return {};
              }
            }
          ]
        }
      })
      .state('dashboard.eixo', {
        url: 'eixos/',
        controller: 'DashboardEixoCtrl',
        templateUrl: '/views/dashboard/eixo.html',
        resolve: {
          'Eixos': [
            'Axis',
            function(Axis) {
              return Axis.find().$promise;
            }
          ]
        }
      })
      .state('dashboard.eixo.edit', {
        url: 'editar/?id',
        controller: 'DashboardEditEixoCtrl',
        templateUrl: '/views/dashboard/eixo-edit.html',
        resolve: {
          'Edit': [
            '$stateParams',
            'Axis',
            function($stateParams, Axis) {
              if($stateParams.id) {
                return Axis.findOne({
                  filter: {
                    where: {
                      id: $stateParams.id
                    }
                  }
                }).$promise;
              } else {
                return {};
              }
            }
          ]
        }
      });

    }
  ]);

  require('./controllers')(app);

};
