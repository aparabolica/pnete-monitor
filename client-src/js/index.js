window.$ = window.jQuery = require('jquery');
window.angular = require('angular');
window._ = require('underscore');
window.moment = require('moment');
require('moment/locale/pt-br.js');
moment.locale('pt-br');

window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

require('angular-ui-router');
require('angular-resource');
require('ng-dialog');

/* -- Loopback generated service -- */
require('./service.js');
/* -------------------------------- */

var app = angular.module('pnete', [
  'pnete.service',
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
      templateUrl: '/views/home.html',
      resolve: {
        Eixos: [
          'Axis',
          function(Axis) {
            return Axis.find().$promise;
          }
        ]
      }
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
      templateUrl: '/views/status.html',
      resolve: {
        Status: [
          'Cycle',
          function(Cycle) {
            return Cycle.status().$promise;
          }
        ],
        Organizations: [
          'Organization',
          function(Organization) {
            return Organization.find().$promise;
          }
        ],
        Eixos: [
          'Axis',
          function(Axis) {
            return Axis.find().$promise;
          }
        ]
      }
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
      url: '/indicador/:indicadorId/?ciclo',
      controller: 'IndicadorCtrl',
      templateUrl: '/views/indicador.html',
      resolve: {
        Cycles: [
          'Cycle',
          function(Cycle) {
            return Cycle.find().$promise;
          }
        ],
        Indicador: [
          '$stateParams',
          'Indicator',
          function($stateParams, Indicator) {
            return Indicator.findOne({
              'filter': {
                'where': {
                  'id': $stateParams.indicadorId
                }
              }
            }).$promise;
          }
        ],
        Eixo: [
          '$stateParams',
          'Indicador',
          'Axis',
          function($stateParams, Indicador, Axis) {
            return Axis.findOne({
              'filter': {
                'where': {
                  'id': Indicador.axisId
                }
              }
            }).$promise;
          }
        ],
        Actions: [
          '$stateParams',
          'Indicator',
          function($stateParams, Indicator) {
            return Indicator.actions({id: $stateParams.indicadorId});
          }
        ],
        ActiveCycle: [
          '$stateParams',
          'Cycle',
          function($stateParams, Cycle) {
            var where;
            if($stateParams.ciclo) {
              where = {
                name: $stateParams.ciclo
              };
            } else {
              where = {
                active: true
              };
            }
            return Cycle.findOne({
              filter: {
                where: where
              }
            }).$promise;
          }
        ],
        Analise: [
          '$q',
          '$stateParams',
          'ActiveCycle',
          'Assessment',
          function($q, $stateParams, ActiveCycle, Assessment) {
            var deferred = $q.defer();
            Assessment.findOne({
              filter: {
                where: {
                  cycleId: ActiveCycle.id,
                  indicatorId: $stateParams.indicadorId
                }
              }
            }, function(data) {
              deferred.resolve(data);
            }, function() {
              deferred.resolve(false);
            });
            return deferred.promise;
          }
        ],
        Organizations: [
          '$stateParams',
          'Indicator',
          'ActiveCycle',
          function($stateParams, Indicator, ActiveCycle) {
            return Indicator.organizations({
              id: $stateParams.indicadorId,
              filter: {
                include: [
                  {
                    relation: 'feedbacks',
                    scope: {
                      where: {
                        indicatorId: $stateParams.indicadorId,
                        cycleId: ActiveCycle.id
                      }
                    }
                  },
                  {
                    relation: 'enrollments',
                    scope: {
                      where: {
                        cycleId: ActiveCycle.id
                      }
                    }
                  }
                ]
              }
            }).$promise;
          }
        ]
      }
    })
    .state('eixo', {
      url: '/eixo/:eixoId/',
      controller: 'EixoCtrl',
      templateUrl: '/views/eixo.html',
      resolve: {
        Eixo: [
          '$stateParams',
          'Axis',
          function($stateParams, Axis) {
            return Axis.findOne({
              'filter': {
                'where': {
                  'id': $stateParams.eixoId
                }
              }
            }).$promise;
          }
        ],
        Actions: [
          '$stateParams',
          'Axis',
          function($stateParams, Axis) {
            return Axis.actions({id: $stateParams.eixoId}).$promise;
          }
        ],
        Indicadores: [
          '$stateParams',
          'Axis',
          function($stateParams, Axis) {
            return Axis.indicators({id: $stateParams.eixoId}).$promise;
          }
        ],
        Organizations: [
          '$stateParams',
          'Axis',
          function($stateParams, Axis) {
            return Axis.organizations({id: $stateParams.eixoId}).$promise;
          }
        ]
      }
    })
    .state('organization', {
      url: '/organizacao/:organizationId/',
      controller: 'OrganizationCtrl',
      templateUrl: '/views/organization.html',
      resolve: {
        Organizacao: [
          '$stateParams',
          'Organization',
          function($stateParams, Organization) {
            return Organization.findById({id: $stateParams.organizationId}).$promise;
          }
        ],
        Status: [
          '$stateParams',
          'Cycle',
          function($stateParams, Cycle) {
            return Cycle.status({organizationId: $stateParams.organizationId}).$promise;
          }
        ],
        ActiveCycle: [
          'Cycle',
          function(Cycle) {
            return Cycle.findOne({
              filter: {
                where: {
                  active: true
                }
              }
            }).$promise;
          }
        ],
        OrganizationEnrollment: [
          '$stateParams',
          'ActiveCycle',
          'CycleEnrollment',
          function($stateParams, ActiveCycle, CycleEnrollment) {
            return CycleEnrollment.findOne({
              filter: {
                where: {
                  organizationId: $stateParams.organizationId,
                  cycleId: ActiveCycle.id
                }
              }
            }).$promise;
          }
        ],
        Indicadores: [
          '$stateParams',
          'ActiveCycle',
          'Organization',
          function($stateParams, ActiveCycle, Organization) {
            return Organization.indicators({
              id: $stateParams.organizationId,
              filter: {
                include: [
                  {
                    relation: 'axis',
                    scope: {
                      fields: ['name', 'color']
                    }
                  },
                  {
                    relation: 'feedbacks',
                    scope: {
                      where: {
                        cycleId: ActiveCycle.id,
                        organizationId: $stateParams.organizationId
                      }
                    }
                  }
                ]
              }
            }).$promise;
          }
        ]
      }
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
require('./filters.js')(app);

require('./dashboard')(app);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['pnete']);
});
