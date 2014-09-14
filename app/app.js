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

