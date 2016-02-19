'use strict';

// Declare app level module which depends on views, and components
angular.module('leean', [
  'ngRoute',
  'leean.views.home',
  'leean.views.about'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

//require('./view1');
//require('./view2');
//require('./components/version');
