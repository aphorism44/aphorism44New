/*
Starting-point tutorial: https://thinkster.io/mean-stack-tutorial
CAVEATS:
1. This tutorial didn't use directives, only controllers; added custom directive for nav bar.
2. Tested all Angular code, sans Node server, in folder "angularRewrite;" subsequently moved files into the new folder, with some liberties due to the use of more files than tutorial.
*/

(function() {
    "use strict";
    //app name = store; dependecies in string array
    var pageApp = angular.module('factories', []);
    
    //factory service
    pageApp.factory('updates', ['$http' , function($http) {
        var temp = { updates: [] };

        temp.getAll = function() {
            return $http.get('/updates').success(function(data){
                angular.copy(data, temp.updates);
            });
        };

        temp.create = function(update) {
            return $http.post('/updates', update).success(function(data) {
                temp.updates.push(data);
            });
        };
        
        temp.delete = function(deleteIds) {
            deleteIds.forEach(function(uId) {
                return $http.delete('/updates/' + uId).success(function(data) { });
            });
        };
        return temp;
    }]);
       
})();

/*
node package manager commands:
1. npm install -g express-generator (4.14.4) //was using express alone earlier
2. to create project: express --ejs aphorism44 //folderName; ejs = HTML templates, not Jade
3. create the "model" version to move 
*/