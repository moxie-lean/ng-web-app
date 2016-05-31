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

appConfig.$inject = ['$locationProvider', 'lnCmsConfigProvider', 'apiEndpoints'];

function appConfig( $locationProvider, lnCmsConfigProvider, apiEndpoints ) {
  $locationProvider.html5Mode( true );

  lnCmsConfigProvider.setConfig({ endpoints: apiEndpoints });
}

appRun.$inject = ['lnMAdminBarService', 'apiEndpoints'];

function appRun( lnMAdminBarService, apiEndpoints ) {
  lnMAdminBarService.setApiUrl( apiEndpoints.adminBar );
}

require( '../public/js/ngConstants.js' );
require( 'ln-cms' );
require( 'ln-filters' );
require( 'ln-patternlab' );

// Dependent on app.
require( './custom/templates' );
