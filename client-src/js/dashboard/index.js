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
            'ActiveCycle',
            'Organization',
            function($q, Auth, ActiveCycle, Organization) {
              if(Auth.organizationId) {
                var deferred = $q.defer();
                Organization.indicators({
                  id: Auth.organizationId,
                  filter: {
                    include: [
                      {
                        relation: 'feedbacks',
                        scope: {
                          where: {
                            organizationId: Auth.organizationId,
                            cycleId: ActiveCycle.id
                          }
                        }
                      }
                    ]
                  }
                }, function(data) {
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
          ],
          Status: [
            'Auth',
            'Cycle',
            function(Auth, Cycle) {
              if(Auth.isAdmin)
                return Cycle.status().$promise;
              else
                return {};
            }
          ],
          PendingOrganizations: [
            '$q',
            'Auth',
            'CycleEnrollment',
            'ActiveCycle',
            function($q, Auth, CycleEnrollment, ActiveCycle) {
              if(Auth.isAdmin) {
                var deferred = $q.defer();
                CycleEnrollment.find({
                  filter: {
                    where: {
                      cycleId: ActiveCycle.id,
                      confirmed: false
                    },
                    include: 'organization'
                  }
                }, function(data) {
                  deferred.resolve(data);
                }, function() {
                  deferred.resolve([]);
                });
                return deferred.promise;
              } else {
                return [];
              }
            }
          ]
        }
      })
      .state('dashboard.settings', {
        url: 'config/',
        controller: 'DashboardSettingsCtrl',
        templateUrl: '/views/dashboard/settings.html',
        resolve: {
          Edit: [
            '$q',
            'Settings',
            function($q, Settings) {
              var deferred = $q.defer();
              Settings.findOne(function(data) {
                deferred.resolve(data);
              }, function() {
                deferred.resolve({});
              });
              return deferred.promise;
            }
          ]
        }
      })
      .state('dashboard.profile', {
        url: 'perfil/',
        controller: 'DashboardProfileCtrl',
        templateUrl: '/views/dashboard/profile.html'
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
      .state('dashboard.cycle.enrollees', {
        url: 'organizacoes/?id',
        controller: 'DashboardCycleEnrolleesCtrl',
        templateUrl: '/views/dashboard/ciclo-organizations.html',
        resolve: {
          Ciclo: [
            '$stateParams',
            'Cycle',
            function($stateParams, Cycle) {
              return Cycle.findById({id: $stateParams.id}).$promise;
            }
          ],
          Enrollees: [
            '$stateParams',
            'CycleEnrollment',
            'Organization',
            function($stateParams, CycleEnrollment, Organization) {
              return CycleEnrollment.find({
                filter: {
                  where: {
                    cycleId: $stateParams.id
                  },
                  include: 'organization'
                }
              }).$promise;
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
              return Indicator.find({
                filter: {
                  include: [
                    {
                      relation: 'organizations'
                    },
                    {
                      relation: 'feedbacks'
                    }
                  ]
                }
              }).$promise;
              // return Indicator.find().$promise;
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
      .state('dashboard.indicador.feedback', {
        url: 'feedback/?id',
        controller: 'DashboardFeedbackCtrl',
        templateUrl: '/views/dashboard/feedback.html',
        resolve: {
          Indicador: [
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
                return false;
              }
            }
          ],
          Edit: [
            '$q',
            '$stateParams',
            'UserOrganization',
            'ActiveCycle',
            'Feedback',
            function($q, $stateParams, UserOrganization, ActiveCycle, Feedback) {
              var deferred = $q.defer();
              if($stateParams.id) {
                Feedback.findOne({
                  filter: {
                    where: {
                      indicatorId: $stateParams.id,
                      cycleId: ActiveCycle.id,
                      organizationId: UserOrganization.id
                    }
                  }
                }, function(data) {
                  deferred.resolve(data);
                }, function() {
                  deferred.resolve({});
                });
              } else {
                deferred.reject('Indicador não encontrado');
              }
              return deferred.promise;
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
          'Indicador': [
            '$stateParams',
            'Indicator',
            function($stateParams, Indicator) {
              return Indicator.findById({id: $stateParams.id}).$promise;
            }
          ],
          'Feedbacks': [
            '$stateParams',
            'ReviewCycle',
            'Feedback',
            function($stateParams, ReviewCycle, Feedback) {
              return Feedback.find({
                filter: {
                  where: {
                    cycleId: ReviewCycle.id,
                    indicatorId: $stateParams.id
                  },
                  include: 'organization'
                }
              }).$promise;
            }
          ],
          'Edit': [
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
          'Tasks': [
            'NotificationTask',
            function(NotificationTask) {
              return NotificationTask.find({
                // filter: {
                //   include: [
                //     {
                //       relation: 'NotificationEmails'
                //     }
                //   ]
                // }
              }).$promise;
            }
          ],
          'Templates': [
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
  require('./messages')(app);

};
