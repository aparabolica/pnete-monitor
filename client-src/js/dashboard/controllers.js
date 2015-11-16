module.exports = function(app) {

  app.controller('ConfirmUserCtrl', [
    '$scope',
    '$stateParams',
    'User',
    '$state',
    'MessageService',
    function($scope, $stateParams, User, $state, Message) {
      $scope.user = {
        token: $stateParams.token,
        uid: $stateParams.uid
      };
      $scope.confirm = function(user) {
        if(user.pwd && user.pwd == user.pwd_repeat) {
          user.password = user.pwd;
          delete user.pwd;
          delete user.pwd_repeat;
          User.confirmEmail({}, user, function() {
            Message.add('Conta de usuário confirmada!');
            $state.go('login');
          });
        } else {
          Message.add('Verifique se você digitou uma senha e que ambas são idênticas');
        }
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
    'UserOrganization',
    'UserIndicators',
    'ContentCount',
    'PendingOrganizations',
    function($scope, $state, Auth, ActiveCycle, User, UserOrganization, UserIndicators, Count, PendingOrganizations) {

      $scope.user = Auth;

      if(UserOrganization.id)
        $scope.userOrganization = UserOrganization;

      $scope.userIndicators = UserIndicators;

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
      $scope.pendingOrganizations = PendingOrganizations;

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
    '$state',
    'MessageService',
    'User',
    'Users',
    function($scope, $state, Message, User, Users) {
      $scope.users = Users;
      _.each($scope.users, function(user) {
        User.organization({id: user.id}, function(organization) {
          user.organization = organization;
        });
      });
      $scope.delete = function(cycle) {
        if(confirm('Você tem certeza?')) {
          User.deleteById({id: cycle.id}, function() {
            Message.add('Usuário removido');
            $state.go($state.current, {}, {reload:true});
          });
        }
      };
    }
  ]);

  app.controller('DashboardEditUserCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'User',
    'Organization',
    'Edit',
    'UserOrganization',
    function($scope, $state, Message, User, Organization, Edit, UserOrganization) {
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
        $state.go($state.current, {id: res.id}, {reload:true});
        Message.add('Usuário enviado com sucesso');
      };
    }
  ]);

  app.controller('DashboardCycleCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Cycle',
    'Ciclos',
    function($scope, $state, Message, Cycle, Ciclos) {
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
      $scope.delete = function(cycle) {
        if(confirm('Você tem certeza?')) {
          Cycle.deleteById({id: cycle.id}, function() {
            Message.add('Ciclo removido');
            $state.go($state.current, {}, {reload:true});
          });
        }
      };
    }
  ]);

  app.controller('DashboardEditCycleCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Cycle',
    'Edit',
    function($scope, $state, Message, Cycle, Edit) {
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
        $state.go($state.current, {id: res.id}, {reload:true});
        Message.add('Ciclo enviado com sucesso');
      };
    }
  ]);

  app.controller('DashboardCycleEnrolleesCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Ciclo',
    'Enrollees',
    'CycleEnrollment',
    function($scope, $state, Message, Ciclo, Enrollees, CycleEnrollment) {
      $scope.ciclo = Ciclo;
      $scope.enrollees = Enrollees;

      var update = function(enrollee, data, message) {
          CycleEnrollment['prototype$updateAttributes']({id: enrollee.id}, data, function(res) {
            _.extend(enrollee, res);
            Message.add(message);
          });
      };

      $scope.confirm = function(enrollee) {
        if(enrollee.confirmed) {
          update(enrollee, {confirmed: false}, 'Confirmação removida para ' + enrollee.organization.name);
        } else {
          update(enrollee, {confirmed: true}, enrollee.organization.name + ' maracada como confirmada!');
        }
      };

      $scope.activate = function(enrollee) {
        if(enrollee.active) {
          update(enrollee, {active: false}, enrollee.organization.name +  ' marcada como inativa!');
        } else {
          update(enrollee, {active: true}, enrollee.organization.name + ' maracada como ativa!');
        }
      };

      $scope.delete = function(enrollee) {
        if(confirm('Você tem certeza?')) {
          CycleEnrollment.deleteById({id: enrollee.id}, function() {
            $state.go($state.current, {}, {reload: true});
          });
        }
      }
    }
  ])

  app.controller('DashboardOrganizationCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Organization',
    'Organizations',
    function($scope, $state, Message, Organization, Organizations) {
      $scope.organizations = Organizations;

      $scope.delete = function(cycle) {
        if(confirm('Você tem certeza?')) {
          Organization.deleteById({id: cycle.id}, function() {
            Message.add('Organização removida');
            $state.go($state.current, {}, {reload:true});
          });
        }
      };

    }
  ]);

  app.controller('DashboardEditOrganizationCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Organization',
    'Edit',
    function($scope, $state, Message, Organization, Edit) {
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
        $state.go($state.current, {id: res.id}, {reload:true});
        Message.add('Organização enviada com sucesso');
      }
    }
  ]);

  app.controller('DashboardActionCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Action',
    'Actions',
    function($scope, $state, Message, Action, Actions) {
      $scope.actions = Actions;
      $scope.delete = function(cycle) {
        if(confirm('Você tem certeza?')) {
          Action.deleteById({id: cycle.id}, function() {
            Message.add('Ação removida');
            $state.go($state.current, {}, {reload:true});
          });
        }
      };
    }
  ]);

  app.controller('DashboardEditActionCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Action',
    'Edit',
    function($scope, $state, Message, Action, Edit) {
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
        $state.go($state.current, {id: res.id}, {reload:true});
        Message.add('Ação enviada com sucesso');
      };
    }
  ]);

  app.controller('DashboardEixoCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Axis',
    'Eixos',
    function($scope, $state, Message, Axis, Eixos) {
      $scope.eixos = Eixos;
      $scope.delete = function(cycle) {
        if(confirm('Você tem certeza?')) {
          Axis.deleteById({id: cycle.id}, function() {
            Message.add('Eixo removido');
            $state.go($state.current, {}, {reload:true});
          });
        }
      };
    }
  ]);

  app.controller('DashboardEditEixoCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Actions',
    'Axis',
    'Edit',
    'AxisActions',
    function($scope, $state, Message, Actions, Axis, Edit, AxisActions) {

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
        $state.go($state.current, {id: res.id}, {reload:true});
        Message.add('Eixo enviado com sucesso');
      }
    }
  ]);

  app.controller('DashboardIndicadorCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Indicator',
    'Indicadores',
    'ActiveCycle',
    'Assessment',
    function($scope, $state, Message, Indicator, Indicadores, ActiveCycle, Assessment) {
      $scope.indicadores = Indicadores;
      _.each($scope.indicadores, function(indicador) {
        Assessment.findOne({
          filter: {
            where: {
              cycleId: ActiveCycle.id,
              indicatorId: indicador.id
            }
          }
        }, function(data) {
          indicador.assessed = true;
        });
      });
      $scope.delete = function(cycle) {
        if(confirm('Você tem certeza?')) {
          Indicator.deleteById({id: cycle.id}, function() {
            Message.add('Indicador removido');
            $state.go($state.current, {}, {reload:true});
          });
        }
      };
    }
  ]);

  app.controller('DashboardEditIndicadorCtrl', [
    '$scope',
    '$state',
    'MessageService',
    'Indicator',
    'Organization',
    'Eixos',
    'Actions',
    'Edit',
    'IndicatorOrganizations',
    'IndicatorActions',
    function($scope, $state, Message, Indicator, Organization, Eixos, Actions, Edit, IndicatorOrganizations, IndicatorActions) {

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
        $state.go($state.current, {id: res.id}, {reload:true});
        Message.add('Indicador enviado com sucesso');
      }

    }
  ]);

  app.controller('DashboardAssessIndicadorCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'MessageService',
    'Indicador',
    'Feedbacks',
    'Edit',
    'ReviewCycle',
    'Assessment',
    function($scope, $state, $stateParams, Message, Indicador, Feedbacks, Edit, ReviewCycle, Assessment) {

      $scope.indicador = Indicador;
      $scope.cycle = ReviewCycle;
      $scope.feedbacks = Feedbacks;

      $scope.review = _.extend({
        indicatorId: $stateParams.id,
        cycleId: ReviewCycle.id
      }, Edit);

      $scope.submit = function(review) {
        if(!_.isEmpty(Edit)) {
          Assessment['prototype$updateAttributes']({id: review.id}, review, saveCb);
        } else {
          Assessment.create(review, saveCb);
        }
      };

      var saveCb = function(res) {
        Edit = res;
        $scope.review = _.extend({}, Edit);
        $scope.$emit('saved', res);
        $state.go($state.current, {}, {reload:true});
        Message.add('Análise enviada com sucesso');
      }
    }
  ]);

  app.controller('DashboardFeedbackCtrl', [
    '$scope',
    '$stateParams',
    '$state',
    'MessageService',
    'Indicador',
    'ActiveCycle',
    'UserOrganization',
    'Edit',
    'Feedback',
    function($scope, $stateParams, $state, Message, Indicador, Cycle, Organization, Edit, Feedback) {

      $scope.indicador = Indicador;
      $scope.organization = Organization;
      $scope.cycle = Cycle;

      $scope.feedback = _.extend({
        organizationId: Organization.id,
        cycleId: Cycle.id,
        indicatorId: Indicador.id
      }, Edit);

      $scope.submit = function(feedback) {
        if(!_.isEmpty(Edit)) {
          Feedback['prototype$updateAttributes']({id: feedback.id}, feedback, saveCb);
        } else {
          Feedback.create(feedback, saveCb);
        }
      };

      var saveCb = function(res) {
        Edit = res;
        $scope.feedback = _.extend({}, Edit);
        $scope.$emit('saved', res);
        $state.go($state.current, {}, {reload:true});
        Message.add('Resposta enviada com sucesso');
      }

    }
  ])

  app.controller('DashboardNotificationCtrl', [
    '$scope',
    'Notifications',
    'NotificationTemplates',
    function($scope, Notifications, NotificationTemplates) {
      $scope.notifications = Notifications;
      $scope.notificationTemplates = NotificationTemplates;
    }
  ])

};
