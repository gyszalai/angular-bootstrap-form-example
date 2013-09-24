/**
 * Created by gyszalai on 22/09/13.
 */

var MyApp = angular.module('MyApp', ['ui.bootstrap']);

MyApp.controller('RegisterTrainerController', ['$scope', '$http', function($scope, $httpProvider) {
    $scope.trainer = {"name":"John Doe","sports":["Running","Biking"],"phone":"+36-22-1111111"};
    $scope.registerClick = function() {
        console.log("Trainer:" + JSON.stringify($scope.trainer));
        $httpProvider.post("http://localhost:8100/trainer/register", $scope.trainer)
            .success(function(data, status, headers, config) {
                console.log("SUCCESS!!!! : " + JSON.stringify(data) + ", " + status);
                $scope.trainer = data;
            })
            .error(function(data, status, headers, config) {
                console.log("ERROR!!!! : " + JSON.stringify(data) + ", " + status);
            });
    }

}]);