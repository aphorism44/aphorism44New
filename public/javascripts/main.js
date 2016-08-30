/* General design: am using AngularJS (1.5.8) directives whenever possible. Implementing state representation transfer using added ui.router library. 
Primary tutorial (besides traditional course in Angular): https://thinkster.io/mean-stack-tutorial#getting-user-input,
but this was heavily modified to incorporate directives
*/
// http://localhost:3000 

(function() {
    "use strict";
    var pageApp = angular.module('page', ['routes']);
     
     pageApp.controller('UpdateCtrl', ['$scope', '$http', 'updateFactory', function($scope, $http, updateFactory) {
        
        $scope.updates = updateFactory.updates;
         
        $scope.addUpdate = function() {
            var newUpdate = {date: $scope.updateDate, text: $scope.updateText};
            //auto increment the updateId
            var newId  = Math.max.apply(Math, $scope.updates.map(function(elem){return elem.updateId;})) + 1;
            //console.log(newId);
            newUpdate.updateId = newId;
            console.log(newUpdate);
            $scope.updates.push(newUpdate);
            $scope.updateDate = '';
            $scope.updateText = '';
        };
        
        this.deleteUpdate = function(update) {
            
        };
        
    }]);
    
    pageApp.directive('navView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'nav-view.ejs'
            , controllerAs: 'navCtrl'
        };
    });
    
    pageApp.directive('updateView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'update-view.ejs'
            , controllerAs: 'updateCtrl'
            , controller: 'UpdateCtrl'
            , bindToController: true
        };
    });
    
    pageApp.directive('aboutView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'about-view.ejs'
            , controllerAs: 'aboutCtrl'
        };
    });
    
    pageApp.directive('linkView', function() {
        return {
            restrict: 'E'
            , templateUrl: 'link-view.ejs'
            , controllerAs: 'linkCtrl'
        };
    });
     
    pageApp.directive('editUpdateView', ['updateFactory', function(updateFactory) {
        return {
            restrict: 'E'
            , templateUrl: 'edit-update-view.ejs'
            , controller: 'UpdateCtrl'
            , controllerAs: 'updateCtrl'
            , bindToController: true
        };
    }]);
    
    /*general functions*/
    /*Below is needed to convert text with HTML in it; PIPE text like this:
        <span ng-bind-html="u.date | trustAsHtml">
    FROM: http://creative-punch.net/2014/04/preserve-html-text-output-angularjs/
    */
    pageApp.filter('trustAsHtml', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
        
})();





