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
        $scope.login = function (form) {
            NProgress.start();
            NProgress.set(0.4);
            lightdm.provide_secret(form.password);
        };
        $scope.$on('authentication_complete', function () {
            NProgress.done();
            if (lightdm.is_authenticated) {
                lightdm.login(lightdm.authentication_user, lightdm.default_session);
            }
            else {
                lightdm.start_authentication($scope.user.name);

                $scope.form.password = '';

                (function(x) {
                    var pwinput = $('.pwinput');
                    var className = pwinput.attr('class');
                    console.log(className);
                    pwinput.removeClass()
                        .addClass(x + ' invalidpw animated ' + className)
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass().addClass(className);
                        });
                })('shake');


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

