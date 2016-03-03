import angular from 'angular';
import { name as templates } from './../../templates';

module.exports = angular.module('views.about', [
  'ngRoute',
  templates
])
.config(config);

function config($routeProvider) {
  $routeProvider
    .when('/about', {
      templateUrl: 'about.html'
    });
}

