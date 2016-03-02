'use strict';

angular.module('leean.views.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'templates/about/about.html',
    controller: 'AboutController'
  });
}])

.controller('AboutController', [function() {
}]);