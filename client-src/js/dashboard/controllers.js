module.exports = function(app) {

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
    'User',
    function($scope, $state, Auth, User) {

      $scope.user = Auth;

      $scope.$watch(function() {
        return User.isAuthenticated();
      }, function(auth) {
        if(!auth)
          $state.go('login');
      })

    }
  ]);

  app.controller('DashboardUserCtrl', [
    '$scope',
    'Users',
    function($scope, Users) {
      $scope.users = Users;
    }
  ]);

  app.controller('DashboardEditUserCtrl', [
    '$scope',
    'User',
    'Edit',
    function($scope, User, Edit) {
      $scope.user = Edit;
      $scope.submit = function(user) {
        if(user.id) {
          User.update({where: {id: user.id}}, user, function(res) {
            console.log(res);
            $scope.user = res;
          });
        } else {
          User.create(user, function(res) {
            console.log(res);
            $scope.user = res;
          })
        }
      };
    }
  ]);

  app.controller('DashboardOrganizationCtrl', [
    '$scope',
    'Organizations',
    function($scope, Organizations) {
      $scope.organizations = Organizations;
    }
  ]);

  app.controller('DashboardEditOrganizationCtrl', [
    '$scope',
    'Organization',
    'Edit',
    function($scope, Organization, Edit) {
      $scope.organization = Edit;
      $scope.submit = function(organization) {
        if(organization.id) {
          Organization.update({where: {id: organization.id}}, organization, function(res) {
            console.log(res);
            $scope.organization = res;
          });
        } else {
          Organization.create(organization, function(res) {
            console.log(res);
            $scope.organization = res;
          })
        }
      };
    }
  ])

};
