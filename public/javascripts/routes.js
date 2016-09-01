/* Routing uses a seperate library
DOCS: https://github.com/angular-ui/ui-router
Good tutorial: https://scotch.io/tutorials/angular-routing-using-ui-router
Careful to use "template" attribute since most controllers are inside directives */

(function() {
    "use strict";
    var pageApp = angular.module('routes', ['ui.router']);
    
    pageApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('homeState', {
            url: '/home'
            , template: '<update-view>'
            , resolve: {
                postPromise: ['updates', function(updates) {
                    return updates.getAll();
                }]
            }
        })
        .state('blogState', {
            url: '/blog'
            , template: '<blog-view>'
        })
        .state('aboutState', {
            url: '/about'
            , template: '<about-view>'
        })
        .state('linkState', {
            url: '/links'
            , template: '<link-view>'
        })
        .state('editUpdateState', {
            url: '/editUpdate'
            , template: '<edit-update-view>'
        });

        $urlRouterProvider.otherwise('home');

    }]);
    
})();
