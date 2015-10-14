window.$ = window.jQuery = require('jquery');
window.angular = require('angular');
window._ = require('underscore');
window.moment = require('moment');
require('moment/locale/pt-br.js');
moment.locale('pt-br');

window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

require('angular-ui-router');
require('ng-dialog');

var app = angular.module('pnete', [
  'ngDialog',
  'ui.router'
]);
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $locationProvider.hashPrefix('!');

    $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: '/views/home.html'
    })
    .state('trabalho-escravo', {
      url: '/trabalho-escravo/',
      templateUrl: '/views/pages/trabalho-escravo.html'
    })
    .state('conatrae', {
      url: '/conatrae/',
      templateUrl: '/views/pages/conatrae.html'
    })
    .state('status', {
      url: '/status/',
      controller: 'StatusCtrl',
      templateUrl: '/views/status.html'
    })
    .state('dados', {
      url: '/dados/',
      templateUrl: '/views/pages/data.html'
    })
    .state('relatorios', {
      url: '/relatorios/',
      templateUrl: '/views/pages/reports.html'
    })
    .state('indicador', {
      url: '/indicador/:indicadorId/',
      controller: 'IndicadorCtrl',
      templateUrl: '/views/indicador.html'
    })
    .state('eixo', {
      url: '/eixo/:eixoId/',
      controller: 'EixoCtrl',
      templateUrl: '/views/eixo.html'
    })
    .state('rep', {
      url: '/rep/:repId/',
      controller: 'RepCtrl',
      templateUrl: '/views/rep.html'
    });

    /*
    * Trailing slash rule
    */
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path(),
      search = $location.search(),
      params;

      // check to see if the path already ends in '/'
      if (path[path.length - 1] === '/') {
        return;
      }

      // If there was no search string / query params, return with a `/`
      if (Object.keys(search).length === 0) {
        return path + '/';
      }

      // Otherwise build the search string and return a `/?` prefix
      params = [];
      angular.forEach(search, function(v, k){
        params.push(k + '=' + v);
      });

      return path + '/?' + params.join('&');
    });
  }
])
.run([
  '$rootScope',
  '$location',
  '$window',
  'ngDialog',
  function($rootScope, $location, $window, ngDialog) {
    /*
    * Analytics
    */
    $rootScope.$on('$stateChangeSuccess', function(ev, toState, toParams, fromState, fromParams) {

      if($window._gaq && fromState.name) {
        $window._gaq.push(['_trackPageview', $location.path()]);
      }
      if(fromState.name) {
        ngDialog.closeAll();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    });
  }
]);

require('./controllers.js')(app);
require('./directives.js')(app);

require('./dashboard')(app);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['pnete']);
});
