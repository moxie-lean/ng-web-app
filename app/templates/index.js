import angular from 'angular';

module.exports = angular.module('templates', [])
.run(['$templateCache', function($templateCache) {
  $templateCache.put('home.html', require('./home/home.html'));
  $templateCache.put('about.html', require('./about/about.html'));
}]);
