'use strict';

angular.module('des-webkit-greeter-main', ['ngRoute', 'user'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login/', {
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl'
            });
    })
    .controller('LoginCtrl', function ($rootScope, $scope, $routeParams) {
        $scope.user = $routeParams;
        $scope.login = function(form) {
          lightdm.provide_secret(form.password);
        };
        $scope.$on('authentication_complete', function() {
            if(lightdm.is_authenticated) {
                lightdm.login(lightdm.authentication_user, lightdm.default_session);
            }
            else {
                lightdm.start_authentication($scope.user.name);
            }
        });
        console.log($rootScope.authenticating);
        if ($rootScope.authenticating) {
            lightdm.cancel_authentication();
        }
        $rootScope.authenticating = true;
        lightdm.start_authentication($scope.user.name);
        $('.pwinput').focus();
    });
