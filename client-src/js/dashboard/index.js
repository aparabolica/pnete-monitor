module.exports = function(app) {

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

      $stateProvider
      .state('confirmUser', {
        url: '/confirmar-email/?token&uid',
        controller: 'ConfirmUserCtrl',
        templateUrl: '/views/dashboard/user-confirm.html',
        resolve: {
          Validate: [
            '$stateParams',
            '$state',
            function($stateParams, $state) {
              if(!$stateParams.token || !$stateParams.uid) {
                $state.go('login');
              }
              return true;
            }
          ]
        }
      })
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
                deferred.resolve({});
                $state.go('login');
              });
              return deferred.promise;
            }
          ],
          UserOrganization: [
            '$q',
            'Auth',
            'User',
            function($q, Profile, User) {
              var deferred = $q.defer();
              User.organization({id: Profile.id}, function(data) {
                deferred.resolve(data);
              }, function() {
                deferred.resolve({});
              });
              return deferred.promise;
            }
          ],
          UserIndicators: [
            '$q',
            'Auth',
            'Organization',
            function($q, Auth, Organization) {
              if(Auth.organizationId) {
                var deferred = $q.defer();
                Organization.indicators({id: Auth.organizationId}, function(data) {
                  deferred.resolve(data);
                }, function() {
                  deferred.resolve([]);
                });
                return deferred.promise;
              } else {
                return [];
              }
            }
          ],
          ActiveCycle: [
            '$q',
            'Cycle',
            function($q, Cycle) {
              var deferred = $q.defer();
              Cycle.findOne({
                filter: {
                  where: {
                    active: true
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
          // Admin data
          ContentCount: [
            '$q',
            'Auth',
            'Cycle',
            'Axis',
            'Action',
            'Indicator',
            'Organization',
            'User',
            function($q, Auth, Cycle, Axis, Action, Indicator, Organization, User) {
              if(Auth.isAdmin) {
                var promises = {};
                promises.cycle = Cycle.count().$promise;
                promises.axis = Axis.count().$promise;
                promises.action = Action.count().$promise;
                promises.indicator = Indicator.count().$promise;
                promises.organization = Organization.count().$promise;
                promises.user = User.count().$promise;
                return $q.all(promises);
              } else {
                return {};
              }
            }
          ]
        }
      })
      .state('dashboard.profile', {
        url: 'perfil/',
        controller: 'DashboardProfileCtrl',
        templateUrl: '/views/dashboard/profile.html',
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
          ],
          'UserOrganization': [
            '$stateParams',
            'User',
            function($stateParams, User) {
              if($stateParams.id) {
                return User.organization({id: $stateParams.id}).$promise;
              } else {
                return {};
              }
            }
          ]
        }
      })
      .state('dashboard.cycle', {
        url: 'ciclos/',
        controller: 'DashboardCycleCtrl',
        templateUrl: '/views/dashboard/ciclo.html',
        resolve: {
          Ciclos: [
            'Cycle',
            function(Cycle) {
              return Cycle.find().$promise;
            }
          ]
        }
      })
      .state('dashboard.cycle.edit', {
        url: 'editar/?id',
        controller: 'DashboardEditCycleCtrl',
        templateUrl: '/views/dashboard/ciclo-edit.html',
        resolve: {
          Edit: [
            '$stateParams',
            'Cycle',
            function($stateParams, Cycle) {
              if($stateParams.id) {
                return Cycle.findOne({
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
        controller: 'DashboardIndicadorCtrl',
        templateUrl: '/views/dashboard/indicador.html',
        resolve: {
          Indicadores: [
            'Indicator',
            function(Indicator) {
              return Indicator.find().$promise;
            }
          ]
        }
      })
      .state('dashboard.indicador.edit', {
        url: 'editar/?id',
        controller: 'DashboardEditIndicadorCtrl',
        templateUrl: '/views/dashboard/indicador-edit.html',
        resolve: {
          'Eixos': [
            'Axis',
            function(Axis) {
              return Axis.find().$promise;
            }
          ],
          'Actions': [
            'Action',
            function(Action) {
              return Action.find().$promise;
            }
          ],
          'Edit': [
            '$stateParams',
            'Indicator',
            function($stateParams, Indicator) {
              if($stateParams.id) {
                return Indicator.findOne({
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
          ],
          'IndicatorOrganizations': [
            '$stateParams',
            'Indicator',
            function($stateParams, Indicator) {
              if($stateParams.id) {
                return Indicator.organizations({id: $stateParams.id}).$promise;
              } else {
                return [];
              }
            }
          ],
          'IndicatorActions': [
            '$stateParams',
            'Indicator',
            function($stateParams, Indicator) {
              if($stateParams.id) {
                return Indicator.actions({id: $stateParams.id}).$promise;
              } else {
                return [];
              }
            }
          ]
        }
      })
      .state('dashboard.indicador.review', {
        url: 'avaliar/?id&ciclo',
        controller: 'DashboardAssessIndicadorCtrl',
        templateUrl: '/views/dashboard/indicador-review.html',
        resolve: {
          'ReviewCycle': [
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
          'Review': [
            '$stateParams',
            '$q',
            'ReviewCycle',
            'Assessment',
            function($stateParams, $q, ReviewCycle, Assessment) {
              var deferred = $q.defer();
              Assessment.findOne({
                filter: {
                  where: {
                    cycleId: ReviewCycle.id,
                    indicatorId: $stateParams.id
                  }
                }
              }, function(data) {
                deferred.resolve(data);
              }, function() {
                deferred.resolve({});
              });
              return deferred.promise;
            }
          ]
        }
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
          'Actions': [
            'Action',
            function(Action) {
              return Action.find().$promise;
            }
          ],
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
          ],
          'AxisActions': [
            '$stateParams',
            'Axis',
            function($stateParams, Axis) {
              if($stateParams.id) {
                return Axis.actions({id: $stateParams.id}).$promise;
              } else {
                return [];
              }
            }
          ]
        }
      })
      .state('dashboard.notification', {
        url: 'notificacoes/',
        controller: 'DashboardNotificationCtrl',
        templateUrl: '/views/dashboard/notification.html',
        resolve: {
          'Notifications': [
            'Notification',
            function(Notification) {
              return Notification.find().$promise;
            }
          ],
          'NotificationTemplates': [
            'NotificationTemplate',
            function(NotificationTemplate) {
              return NotificationTemplate.find().$promise;
            }
          ]
        }
      })
      .state('dashboard.notification.send', {
        url: 'enviar/',
        controller: 'DashboardSendNotificationCtrl',
        templateUrl: '/views/dashboard/notification-send.html',
      })
      .state('dashboard.notification.template', {
        url: 'template/?id',
        controller: 'DashboardNotificationTemplateCtrl',
        templateUrl: '/views/dashboard/notification-template.html',
        resolve: {
          'Edit': [
            '$stateParams',
            'NotificationTemplate',
            function($stateParams, NotificationTemplate) {
              if($stateParams.id) {
                return NotificationTemplate.findOne({
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
  require('./directives')(app);

};
