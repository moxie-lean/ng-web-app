import angular from 'angular';

module.exports = angular.module('views.about', [
  'ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'templates/about/about.html',
    controller: 'AboutController'
  });
}])
.controller('AboutController');
