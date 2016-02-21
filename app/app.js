import angular from 'angular';
import { name as home } from './views/home/';
import { name as about } from './views/about';

angular.module('leean', [
  'ngRoute',
  home,
  about
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
