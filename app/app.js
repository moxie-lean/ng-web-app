import angular from 'angular';
import { name as home } from './views/home/';
import { name as about } from './views/about';

angular
  .module('app', ['ngRoute', home, about])
  .config(config);

function config($routeProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/'
    });
}
