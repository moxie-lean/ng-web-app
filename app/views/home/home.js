'use strict';

angular.module('leean.views.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', [function() {

}]);
