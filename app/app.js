import angular from 'angular';

angular
  .module( 'app', [
    'ngConstants',
    'ngSanitize',
    'templateCache',
    'lnCms',
    'lnFilters',
    'lnPatterns'
  ])
  .config( appConfig )
  .run( appRun );

appConfig.$inject = ['$locationProvider'];

function appConfig( $locationProvider, lnMAdminBarService, apiBase ) {
  $locationProvider.html5Mode( true );
}

appRun.$inject = ['lnMAdminBarService', 'apiBase'];

function appRun( lnMAdminBarService, apiBase ) {
  lnMAdminBarService.setApiUrl( apiBase + 'admin-bar' );
}

require( '../public/js/ngConstants.js' );
require( 'ln-cms' );
require( 'ln-filters' );
require( 'ln-patternlab' );

// Dependent on app.
require( './custom/templates' );
