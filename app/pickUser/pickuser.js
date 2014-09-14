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