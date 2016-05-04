import angular from 'angular';

angular
  .module( 'app', [
    'ngSanitize',
    'templateCache',
    'lnCms',
    'lnFilters',
    'lnPatterns'
  ])
  .config(appConfig);

appConfig.$inject = ['$locationProvider'];

function appConfig($locationProvider) {
  $locationProvider.html5Mode(true);
}

require( '../public/js/ngConstants.js' );
require( 'ln-cms' );
require( 'ln-filters' );
require( 'ln-patternlab' );

// Dependent on app.
require( './custom/templates' );
