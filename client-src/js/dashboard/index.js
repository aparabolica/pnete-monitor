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
      .state('dashboard.users', {
        url: 'users/',
      })
      .state('dashboard.indicadores', {
        url: 'indicadores/',
      })
      .state('dashboard.actions', {
        url: 'acoes/',
      })
      .state('dashboard.eixos', {
        url: 'eixos/',
      })
      .state('dashboard.organizations', {
        url: 'organizacoes/',
      });

    }
  ]);

  require('./controllers')(app);

};
