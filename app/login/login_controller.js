'use strict';

angular.module('des-webkit-greeter-main', ['ngRoute', 'user'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login/', {
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl'
            });
    })
    .controller('LoginCtrl', function ($rootScope, $scope, $routeParams, $timeout) {
        $scope.user = $routeParams;
        $scope.login = function (form) {
            lightdm.provide_secret(form.password);
            $('.pwinput')[0].disabled = true;
        };
        $scope.$on('authentication_complete', function () {
            if (lightdm.is_authenticated) {
                lightdm.login(lightdm.authentication_user, lightdm.default_session);
            }
            else {
                lightdm.start_authentication($scope.user.name);

                (function(x) {
                    $scope.form.password = '';
                    var pwinput = $('.pwinput');
                    var className = pwinput.attr('class');
                    $timeout(function() {
                        pwinput.removeClass()
                            .addClass(x + ' invalidpw animated ' + className)
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                $(this).removeClass().addClass(className);
                                $scope.$apply(function() {
                                    $scope.form.password = '';
                                    $('.pwinput')[0].disabled = false;
                                });
                            });
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

