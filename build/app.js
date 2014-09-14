'use strict';

angular.module('des-webkit-greeter', [
    'ngRoute',
    'des-webkit-greeter-main',
    'pickUser',
    'templates' ])
    .config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/pickUser'
            });
    })
    .run(function ($rootScope) {

        var $doc = angular.element(document);
        $doc.on('keydown', function(e) {
            $rootScope.$apply(function() {
                $rootScope.$broadcast('keydown', e.keyCode);
            });
        });
        $rootScope.users = lightdm.users;
        $rootScope.hostname = lightdm.hostname;
    });

// called when the greeter asks to show a login prompt for a user
function show_prompt(text) {
    console.log("PROMPT: " + text);
}

// called when the greeter asks to show a message
function show_message(text) {
    console.log("MESSAGE: " + text);
}

// called when the greeter asks to show an error
function show_error(text) {
    console.log("ERROR: " + text);
}

// called when the greeter is finished the authentication request
function authentication_complete() {
    $('.container').scope().$broadcast('authentication_complete');
}


'app controller goes here';
'common service goes here';
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


/**
 * Created by desmond on 9/13/2014.
 */
angular.module('pickUser', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/pickUser', {
                templateUrl: 'pickUser/pickUser.html',
                controller: 'PickUser'
            });
    })
    .controller('PickUser', function ($scope, $rootScope, $location) {
        $scope.cursor = $scope.cursor ? $scope.cursor : 0;
        $scope.userSelected = function (user) {
            $rootScope.selectedUser = user;
            $location.url('/login/?'+ $.param(user));
        };
        $scope.$on('keydown', function (e, keyCode) {
            switch (keyCode) {
                case 37:
                    if ($scope.cursor >= 1) {
                        $scope.cursor = $scope.cursor - 1;
                    }
                    break;
                case 39:
                    if ($scope.cursor < $rootScope.users.length - 1) {
                        $scope.cursor = $scope.cursor + 1;
                    }
                    break;
                case 13:
                    $scope.userSelected($rootScope.users[$scope.cursor]);
                    break;
            }
        })
    });
/**
 * Created by desmond on 9/13/2014.
 */
angular.module('user', ['userDirective']);
/**
 * Created by desmond on 9/13/2014.
 */
angular.module('userDirective', []).directive('dmUser', function() {
    return {
        restrict: 'EA',
        scope: {
            cursor: '=',
            user: '='
        },
        templateUrl: 'user/user.html'
    }
});