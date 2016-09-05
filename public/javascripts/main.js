/* General design: am using AngularJS (1.5.8) directives whenever possible. Implementing state representation transfer using added ui.router library. 
Starting-point tutorial: https://thinkster.io/mean-stack-tutorial
CAVEATS: heavily modified
1. This tutorial didn't use directives, only controllers; added custom directive for nav bar.
2. Tested all Angular code, sans Node server, in folder "angularRewrite;" subsequently moved files into the new folder, with some liberties due to the use of more files than tutorial.
*/

(function() {
    "use strict";
    var pageApp = angular.module('page', ['ui.router', 'factories']);
     
    /* Use state machine to implement REST
    Angular Routing uses seperate library ui-router
    DOCS: https://github.com/angular-ui/ui-router
    Good tutorial: https://scotch.io/tutorials/angular-routing-using-ui-router*/
     pageApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        
        $stateProvider.state('homeState', {
            url: '/home'
            , templateUrl: 'templates/update-view.ejs'
            , contoller: 'UpdateCtrl'
            , resolve: {
                updatePromise: ['updates', function(updates) {
                    return updates.getAll();
               }]
            }
        })
        .state('blogState', {
            url: '/blog'
            , templateUrl: 'templates/blog-view.ejs'
        })
        .state('aboutState', {
            url: '/about'
            , templateUrl: 'templates/about-view.ejs'
        })
        .state('publishState', {
            url: '/publish'
            , templateUrl: 'templates/publish-view.ejs'
        })
        .state('linkState', {
            url: '/links'
            , templateUrl: 'templates/link-view.ejs'
        })
        .state('loginState', {
            url: '/login'
            , templateUrl: 'templates/login-view.ejs'
            , controller: 'AuthCtrl'
            , onEnter: ['$state', 'auth', function($state, auth) {
                if(auth.isLoggedIn()){
                    $state.go('homeState');
                }
            }]
        })
        .state('editUpdateState', {
            url: '/edit'
            , templateUrl: 'templates/edit-update-view.ejs'
            , contoller: 'UpdateCtrl'
            , resolve: {
                updatePromise: ['updates', function(updates) {
                    return updates.getAll();
               }]
            }
            , onEnter: ['$state', 'auth', function($state, auth){
                if(!auth.isLoggedIn()){
                    $state.go('homeState');
                }
            }]
        });

        //if you have trouble with infinite loops, use the complex otherwise function
        $urlRouterProvider.otherwise('home');
        //$urlRouterProvider.otherwise( function($injector, $location) {
         //   var $state = $injector.get('$state');
         //   $state.go('homeState');
        //});
        
    }]);
    
    //UpdateCtry - controls the updates, which appear on home page and are
    //editable on the edit page
     pageApp.controller('UpdateCtrl', ['$scope', 'updates', function($scope, updates) {
         $scope.updates = updates.updates;
         $scope.deleteUpdates = [];
         
        $scope.addUpdate = function() {
            //the form has all fields as required, _but_ adding the below function to keep things safe  
            if(!$scope.updateDate || $scope.updateText === '') { return; }
            updates.create({
                date: $scope.updateDate
                , text: $scope.updateText
                , isVisible: true
            });
            
            $scope.updateDate = '';
            $scope.updateText = '';
            
        };
             
        $scope.deleteUpdate = function() {
            //get list of all items to be deleted
            var deleteIds = [];
            for (var key in $scope.updates.selected) 
                if ($scope.updates.selected[key]) 
                    deleteIds.push(key);
            //delete from client $scope
            //NOTE - when I tried to do this in the factory where it belongs (using temp.updates), it didn't work!
            $scope.updates = $scope.updates.filter(function(u) {
                    return !deleteIds.includes(u._id);
                });
            //call factory delete for persistent data
            updates.delete(deleteIds);
            //clear checked ones
            $scope.updates.selected = {};
        };
        
    }]);
    
    //controller for user identification
    //NOTE - am only doing login, not registration, since there will be only 1 user allowed to edit
    pageApp.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
        $scope.user = {};

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('homeState');
            });
        };
    }]);
    
    //show/hide nav buttons depending on login status
    pageApp.controller('NavCtrl', ['$scope', 'auth', function($scope, auth) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.logOut = auth.logOut;
    }]);
    
    //am keeping the navbar in a module
    pageApp.directive('navView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/nav-view.ejs'
            , controller: 'NavCtrl'
        };
    });
     
    /*general functions*/
    /*Below is needed to convert text with HTML in it; PIPE text like this:
        <span ng-bind-html="u.date | trustAsHtml">
    FROM: http://creative-punch.net/2014/04/preserve-html-text-output-angularjs/ */
    pageApp.filter('trustAsHtml', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
            
})();