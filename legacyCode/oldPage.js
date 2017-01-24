/* General design: am using AngularJS (1.5.8) directives whenever possible. Implementing state representation transfer using added ui.router library.
First course in basics: https://www.codeschool.com/courses/shaping-up-with-angular-js/videos
Can also: https://thinkster.io/mean-stack-tutorial
CAVEATS: tutorial heavily modified
1. This tutorial didn't use directives, only controllers; added custom directive (per course) for nav bar.
2. Tested all Angular code, sans Node server, in folder "angularRewrite;" subsequently moved files into the new folder, with some liberties due to the use of more files than tutorial.
*/

(function() {
    "use strict";
    
    var pageApp = angular.module('page', []);
    
    
    
    
     
    /* NOTE temporarily reverted from Angular routing (ui-router) to basic controllers; plan to redo using components
    Angular Routing uses seperate library ui-router
    DOCS: https://github.com/angular-ui/ui-router
    Good tutorial: https://scotch.io/tutorials/angular-routing-using-ui-router*/
    /* 
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
     */
    
    
    /*
    pageApp.controller('PageStateController', function() {
        this.pageId = 1;
        this.isPageActive = function(id) {
            return this.pageId === id;
        };
        this.setActivePage = function(id) {
            this.pageId = id;
        };
    });
    
    
    pageApp.directive('UpdateView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/update-view.ejs'
            , controller: 'UpdateController'
        };
    });
    pageApp.directive('NavView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/nav-view.ejs'
            , controller: 'NavController'
            };
    });
    
    pageApp.directive('AboutView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/about-view.ejs'
            , controller: 'AboutController'
            };
    });
    pageApp.directive('BlogView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/blog-view.ejs'
            , controller: 'BlogController'
        };
    });
    pageApp.directive('LinkView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/link-view.ejs'
            , controller: 'LinkController'
        };
    });
    pageApp.directive('PublishView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/publish-view.ejs'
            , controller: 'PublishController'
        };
    });
    
    //UpdateCtrl - controls the updates, which appear on home page and are
    //editable on the edit page
     pageApp.controller('UpdateController', ['$http', function($http) {
         this.updates = [];
         this.deleteUpdates = [];
         
        this.addUpdate = function() {
            //the form has all fields as required, _but_ adding the below function to keep things safe  
            if(!this.updateDate || this.updateText === '') { return; }
            updates.create({
                date: this.updateDate
                , text: this.updateText
                , isVisible: true
            });
            
            this.updateDate = '';
            this.updateText = '';
            
        };
             
        this.deleteUpdate = function() {
            //get list of all items to be deleted
            var deleteIds = [];
            for (var key in this.updates.selected) 
                if (this.updates.selected[key]) 
                    deleteIds.push(key);
            //delete from client $scope
            //NOTE - when I tried to do this in the factory where it belongs (using temp.updates), it didn't work!
            this.updates = this.updates.filter(function(u) {
                    return !deleteIds.includes(u._id);
                });
            //call factory delete for persistent data
            updates.delete(deleteIds);
            //clear checked ones
            this.updates.selected = {};
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
    
    
   
    
    
    //simple controller for program tab; just switches the visible tab
    pageApp.controller('PublishController', ['$http', function($http) {
        var publish = this;
        publish.programTags = [];
        this.pTag = 1;
        this.selectPTag = function() {
            this.pTag = tabNo;
            console.log(this.pTag);
        };
        this.isPTabSelected = function(tabNo) {
            return this.pTag === tabNo;
        }
        //$http.get('tempPrograms.json').success(function(data) {
        //    publish.programTags = data;
        //});
        //add to the below when you add more program links
        this.programTags = [
            { name: "The Stranger in Town", desc: "HTML game (RPG/puzzle)", tabNo: 1
             , pLink: "http://www.newgrounds.com/portal/view/645734"
             , codeLink: "https://github.com/aphorism44/gladePrologue"
             , pGraphic: "mages/game1.png"  
             , pText: "A combination RPG-puzzle game. Added some innovative gameplay features and a neat, simple storyline, but the game engine needed work. Enchant.js."  }
            , { name: "Apprentice Wars", desc: "HTML game (RPG/puzzle)", tabNo: 2
             , pLink: "http://www.newgrounds.com/portal/view/661204"
             , codeLink: "https://github.com/aphorism44/glade1"
             , pGraphic: "mages/game1.png"  
             , pText: "The sequel to the previous game. While its engine and gameplay have been greatly enhanced and improved, along with much better music and multimedia features, the underlying storyline isn't as strong. Enchant.js."  }
            , { name: "The Townfolk Cartel", desc: "HTML game (idle)", tabNo: 3
             , pLink: "http://www.newgrounds.com/portal/view/687176"
             , codeLink: "https://github.com/aphorism44/townfolkCartel"
             , pGraphic: "mages/game3.png"  
             , pText: "A simple idle game based on classic RPG tropes. Like all idle games, the hardest part was making sure the growth mathematics worked and large numbers were handled correctly. Unlike most idle games, it's possible to win this. Phaser.io."  }
        ];
    }]);
     
    /*general functions
    //Below is needed to convert text with HTML in it; PIPE text like this:
      <span ng-bind-html="u.date | trustAsHtml">
    FROM: http://creative-punch.net/2014/04/preserve-html-text-output-angularjs/ 
    pageApp.filter('trustAsHtml', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
    */        
})();