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
        url: 'users/',
        templateUrl: '/views/dashboard/users.html'
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
        templateUrl: '/views/dashboard/actions.html'
      })
      .state('dashboard.organization', {
        url: 'organizacoes/',
        templateUrl: '/views/dashboard/organizations.html'
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
