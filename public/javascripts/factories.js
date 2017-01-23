
(function() {
    "use strict";
    //app name = store; dependecies in string array
    var pageApp = angular.module('factories', []);
    
    pageApp.factory('Update', function($resource) {
        return $resource('/api/updates/:id', {id: "@id"}); 
    });
   
    pageApp.factory('PublishList', function($http) {
        return $http.get("data/programJson.json");
    });
    
    pageApp.factory('AuthorizeUser', function($http, $window) {
        //use this auth object and store the data in a token
        //lost my tutorial link for passport middleware; need docs for this
        var auth = {};
        
        auth.saveToken = function (token){
            $window.localStorage['page-token'] = token;
        };
        auth.getToken = function (){
            return $window.localStorage['page-token'];
        };
        auth.isLoggedIn = function(){
            var token = auth.getToken();
            if (token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
        auth.logIn = function(user){
            return $http.post('/api/login', user).success(function(data){
                auth.saveToken(data.token);
            });
        };
        auth.logOut = function(){
            $window.localStorage.removeItem('page-token');
        };
        
        return auth;
    });
    
})();