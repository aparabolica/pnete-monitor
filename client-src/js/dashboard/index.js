module.exports = function(app) {

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

      $stateProvider
      .state('dashboard', {
        url: '/dashboard/',
        controller: 'DashboardCtrl',
        templateUrl: '/views/dashboard/index.html'
      })
      .state('dashboard.user', {
        url: 'usuarios/',
        templateUrl: '/views/dashboard/user.html'
      })
      .state('dashboard.user.edit', {
        url: 'editar/?id',
        templateUrl: '/views/dashboard/user-edit.html'
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
        templateUrl: '/views/dashboard/action.html'
      })
      .state('dashboard.action.edit', {
        url: 'editar/?id',
        templateUrl: '/views/dashboard/action-edit.html'
      })
      .state('dashboard.organization', {
        url: 'organizacoes/',
        templateUrl: '/views/dashboard/organization.html'
      })
      .state('dashboard.organization.edit', {
        url: 'editar/?id',
        templateUrl: '/views/dashboard/organization-edit.html'
      })
      .state('dashboard.eixo', {
        url: 'eixos/',
        templateUrl: '/views/dashboard/eixo.html'
      })
      .state('dashboard.eixo.edit', {
        url: 'editar/',
        templateUrl: '/views/dashboard/eixo-edit.html'
      });

    }
  ]);

  require('./controllers')(app);

};
