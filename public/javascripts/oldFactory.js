
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
    }])
    .factory('auth', ['$http', '$window', function($http, $window){
        var auth = {};
        
        auth.saveToken = function (token){
            $window.localStorage['page-token'] = token;
        };

        auth.getToken = function (){
            return $window.localStorage['page-token'];
        };
        
        auth.isLoggedIn = function(){
            var token = auth.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
        
        auth.logIn = function(user){
            return $http.post('/login', user).success(function(data){
                auth.saveToken(data.token);
            });
        };
        
        auth.logOut = function(){
            $window.localStorage.removeItem('page-token');
        };
        
        return auth;
    }]);
       
})();