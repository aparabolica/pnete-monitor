function getPastelColor() {
  var r = (Math.round(Math.random()* 127) + 70).toString(16);
  var g = (Math.round(Math.random()* 127) + 70).toString(16);
  var b = (Math.round(Math.random()* 127) + 70).toString(16);
  return '#' + r + g + b;
}

module.exports = function(app) {

  app.controller('MainCtrl', [
    '$scope',
    'User',
    'Cycle',
    function($scope, User, Cycle) {

      $scope.loggedIn = false;
      $scope.$watch(function() {
        return User.isAuthenticated();
      }, function(auth) {
        $scope.loggedIn = auth;
      });
      $scope.logout = function() {
        User.logout(function() {
          $scope.loggedIn = false;
        });
      };

      $scope.nav = false;
      $scope.toggleNav = function() {
        if($scope.nav) {
          $scope.nav = false;
        } else {
          $scope.nav = true;
        }
      }
      $scope.isHome = true;
      $scope.$on('$stateChangeSuccess', function(ev, to) {
        $scope.nav = false;
        if(to.name == 'home')
          $scope.isHome = true;
        else
          $scope.isHome = false;
      });

      Cycle.findOne({
        filter: {
          where: {
            active: true
          }
        }
      }, function(data) {
        $scope.cycle = data;
      });

      Cycle.status(function(data) {
        $scope.status = data.status.feedbacks;
      });

    }
  ]);

  app.controller('HomeCtrl', [
    '$scope',
    'Eixos',
    'AssessmentCount',
    function($scope, Eixos, AssessmentCount) {
      $scope.eixos = Eixos;
      $scope.assessCount = AssessmentCount;
    }
  ]);

  app.controller('IndicadorCtrl', [
    '$scope',
    'Cycles',
    'Indicador',
    'Eixo',
    'Actions',
    'ActiveCycle',
    'Analise',
    'Organizations',
    function($scope, Cycles, Indicador, Eixo, Actions, ActiveCycle, Analise, Organizations, Posts) {

      $scope.ciclos = Cycles;
      $scope.indicador = Indicador;
      $scope.eixo = Eixo;
      $scope.actions = Actions
      $scope.ciclo = ActiveCycle;
      $scope.analise = Analise;
      $scope.organizations = Organizations;

      $scope.getStatus = function(analise) {
        if(analise.status == 'partial')
          return 'Parcialmente cumprido';
        else if(analise.status == 'complete')
          return 'Cumprido';
        else if(analise.status == 'incomplete')
          return 'Não cumprido';
      };

      $scope.getStatusClass = function(analise) {
        if(analise.status == 'partial')
          return 'cross yellow';
        else if(analise.status == 'complete')
          return 'check';
        else if(analise.status == 'incomplete')
          return 'cross red';
      };

      $scope.showActions = false;
      $scope.toggleActions = function() {
        if($scope.showActions)
          $scope.showActions = false;
        else
          $scope.showActions = true;
      }

    }
  ]);

  app.controller('EixoCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$resolve',
    '$q',
    '$timeout',
    'Eixo',
    'Actions',
    'Indicadores',
    'Organizations',
    'Posts',
    function($scope, $state, $stateParams, $resolve, $q, $timeout, Eixo, Actions, Indicadores, Organizations, Posts) {

      $scope.eixo = Eixo;
      $scope.actions = Actions;
      $scope.indicadores = Indicadores;
      $scope.organizations = Organizations.organizations;
      $scope.posts = Posts;

      if($stateParams.print) {

        $scope.resolved = {};

        var promises = [];

        $scope.indicadores.forEach(function(indicador) {
          promises.push($resolve.resolve($state.get('indicador').resolve, {
            '$stateParams': angular.extend({
              indicadorId: indicador.id
            }, $stateParams)
          }));
        });

        $q.all(promises).then(function(res) {
          $scope.resolved.indicadores = res;
          $timeout(function() {
            window.print();
          }, 500);
        });

        $scope.getStatus = function(analise) {
          if(analise.status == 'partial')
            return 'Parcialmente cumprido';
          else if(analise.status == 'complete')
            return 'Cumprido';
          else if(analise.status == 'incomplete')
            return 'Não cumprido';
        };

      }

      // console.log($resolve.resolve($state.get('indicador').resolve, {indicadorId: $scope.indicadores[0].id}));

    }
  ]);

  app.controller('PostCtrl', [
    '$scope',
    'EixoPost',
    function($scope, EixoPost) {
      $scope.post = EixoPost;
    }
  ]);

  app.controller('OrganizationCtrl', [
    '$scope',
    'Organizacao',
    'Status',
    'Indicadores',
    'OrganizationEnrollment',
    function($scope, Organizacao, Status, Indicadores, OrganizationEnrollment) {
      $scope.status = Status.status.feedbacks;
      $scope.organization = Organizacao;
      $scope.indicadores = Indicadores;
      $scope.enrollment = OrganizationEnrollment;
    }
  ]);

  app.controller('StatusCtrl', [
    '$scope',
    'Organizations',
    'Eixos',
    'Status',
    'Cycle',
    function($scope, Organizations, Eixos, Status, Cycle) {

      $scope.status = Status.status.feedbacks;

      $scope.label = '{{ratio.given}}/{{ratio.needed}} respondidas';

      $scope.organizations = Organizations;
      $scope.eixos = Eixos;

      _.each($scope.organizations, function(organization) {
        Cycle.status({organizationId: organization.id}, function(data) {
          organization.status = data.status.feedbacks;
          organization.percent = (organization.status.given / organization.status.needed) * 100;
        });
      });

      _.each($scope.eixos, function(eixo) {
        Cycle.status({axisId: eixo.id}, function(data) {
          eixo.status = data.status.feedbacks;
        });
      });

      $scope.orgSorts = [
        {
          label: 'Nome',
          key: 'name'
        },
        {
          label: 'Porcentagem',
          key: function(item) {
            return -item.percent;
          }
        },
        {
          label: 'Nº de indicadores',
          key: function(item) {
            return -item.status.needed;
          }
        },
        {
          label: 'Nº de respostas',
          key: function(item) {
            return -item.status.given;
          }
        }
      ];
      $scope.setSort = function(sort) {
        $scope.activeSort = angular.copy(sort);
      };
      $scope.setSort($scope.orgSorts[0]);

    }
  ]);

  app.controller('ExportCtrl', [
    '$scope',
    'Axis',
    'Assessment',
    'Indicator',
    'Feedback',
    'Organization',
    'Post',
    function($scope, Axis, Assessment, Indicator, Feedback, Organization, Post) {

      var args = arguments;

      var getCollection = function(c) {
        return _.find(args, function(a) {
          if(a.modelName && a.modelName == c) {
            return a;
          }
        });
      };

      $scope.export = function(collection, filter) {
        getCollection(collection).export(filter);
      };

    }
  ])

};
