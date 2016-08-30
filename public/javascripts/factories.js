/*
Starting-point tutorial: https://thinkster.io/mean-stack-tutorial
CAVEATS:
1. This tutorial didn't use directives, only controllers; added custom directives for readability.
2. Tested all Angular code, sans Node server, in folder "angularRewrite;" subsequently moved files into the new folder, with some liberties due to the use of more files than tutorial.
*/

(function() {
    "use strict";
    //app name = store; dependecies in string array
    var pageApp = angular.module('factories', []);
    
    pageApp.factory('updateFactory', ['$http', function($http) {
        var temp = { updates: [] };
        //$http.get('data/updates.json').success(function(data) {
        //    temp.updates = data;
        //});
        //console.log(temp);
        return temp;
        /*
        //bug below - it's not funding api/updates
        $http.get('/api/updates').success(function(data) {
            updateCtrl.updates = data;
            $scope.updates = data;
            console.log(data);
        })
        .error(function(err) {
            console.log('Error: ' + err);
        });
        */
        
    }]);
       
})();

// "dependencies": {
 //     "mongoose": "4.5.8"
//      , "express": "4.14.0"
 //     , "body-parser" : "1.15.2"
//  }

/*
node package manager commands:
1. npm install -g express-generator (4.14.4) //was using express alone earlier
2. to create project: express --ejs aphorism44 //folderName; ejs = HTML templates, not Jade
3. create the "model" version to move 
*/