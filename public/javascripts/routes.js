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
            , templateUrl: 'templates/update-view.ejs'
            , contoller: 'UpdateCtrl'
            //, resolve: {
            //    postPromise: ['updates', function(updates) {
            //        console.log(2);
             //       return updates.getAll();
             //   }]
            //}
        })
        .state('blogState', {
            url: '/blog'
            , templateUrl: 'templates/blog-view.ejs'
        })
        .state('aboutState', {
            url: '/about'
            , templateUrl: 'templates/about-view.ejs'
        })
        .state('linkState', {
            url: '/links'
            , templateUrl: 'templates/link-view.ejs'
        })
        .state('editUpdateState', {
            url: '/editUpdate'
            , templateUrl: 'templates/edit-update-view.ejs'
            , contoller: 'UpdateCtrl'
        });

        $urlRouterProvider.otherwise('home');

    }]);
    
})();
