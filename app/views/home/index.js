import angular from 'angular';
import { name as templates } from './../../templates';

module.exports = angular.module('views.home', [
  'ngRoute',
  templates
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
  });
}]);
