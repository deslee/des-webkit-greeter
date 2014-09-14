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