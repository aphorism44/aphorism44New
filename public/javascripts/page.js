/* General design: am using AngularJS (1.5.8) directives whenever possible. Also using angular_resource to greatly simplify API calls to Node
First course in basics: https://www.codeschool.com/courses/shaping-up-with-angular-js/videos
$resources: https://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/, but then use Freeman pp 570-6 for more details
*/

(function() {
    "use strict";
    
    var model = {};
    
    var pageApp = angular.module("page", ["ngResource","factories"]);
    
    pageApp.directive("updateView", function() {
        return {
            restrict: "E"
            ,  templateUrl: "templates/update-view.ejs"
            , controller: "UpdateController"
            , controllerAs: "uCtrl"
        };
    });
    pageApp.directive("aboutView", function() {
        return {
            restrict: "E"
            ,  templateUrl: "templates/about-view.ejs"
        };
    });
    pageApp.directive("publishView", function() {
        return {
            restrict: "E"
            ,  templateUrl: "templates/publish-view.ejs"
            , controller: "PublishController"
            , controllerAs: "pCtrl"
        };
    });
    pageApp.directive("linkView", function() {
        return {
            restrict: "E"
            ,  templateUrl: "templates/link-view.ejs"
        };
    });
    pageApp.directive("loginView", function() {
        return {
            restrict: "E"
            ,  templateUrl: "templates/login-view.ejs"
            , controller: "LoginController"
            ,  controllerAs: "lCtrl"
        };
    });
    pageApp.directive("editupdateView", function() {
        return {
            restrict: "E"
            ,  templateUrl: "templates/editupdate-view.ejs"
            , controller: "UpdateController"
            ,  controllerAs: "uCtrl"
        };
    });
    
    pageApp.controller("NavController", function($scope, AuthorizeUser) {
        //since these variables and functions are used to show/hide different partials, is okay to place them into the scope
        $scope.pageTab = 1;
        $scope.isLoggedIn = AuthorizeUser.isLoggedIn;
        $scope.logOut = function() { 
            AuthorizeUser.logOut();
            $scope.setPageTab(5);
        };
        $scope.setPageTab = function(pTab) {
            $scope.pageTab = pTab;
        };
        $scope.isTabSet = function(pTab) {
            return $scope.pageTab === pTab;
        };
    });
    
    pageApp.controller("UpdateController", function($scope, Update) {
        //used in both main and edit page; add to scope
        $scope.updates = Update.query();
        this.addUpdate = function(nu) {
            var newUpdate = new Update(nu); //resource instance; all properties set automatically by ng-model on form
            newUpdate.$save().then(function() {
                $scope.update.date = '';
                $scope.update.text = '';
                $scope.updates = Update.query();
            });
        }; 
        this.deleteUpdate = function(du) {
            if (confirm("Are you sure?")) {
                du.$delete({id: du._id}).then(function() {
                    $scope.updates = Update.query();
                });
            }
        };
    });
    
    pageApp.controller("PublishController", function($scope, $http, PublishList) {
        PublishList.success(function(data) { $scope.programs = data; });
        this.programTab = 1;
        this.selectPTab = function(pTab) {
            this.programTab = pTab;
        };
        this.isPTabSelected = function(pTab) {
            return this.programTab === pTab;
        };
    });
    pageApp.controller("LoginController", function($scope, $location, AuthorizeUser) {
        $scope.user = {};
        this.logIn = function(){
            AuthorizeUser.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function() {
                $scope.setPageTab(1);
            });
        };
    });
    
    //Below is needed to convert update text with HTML in it; PIPE text like this:<span ng-bind-html="u.date | trustAsHtml">
    //FROM: http://creative-punch.net/2014/04/preserve-html-text-output-angularjs/ 
    pageApp.filter("trustAsHtml", function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
    
})();