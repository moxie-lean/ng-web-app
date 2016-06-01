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

appConfig.$inject = ['$locationProvider', 'lnCmsConfigProvider', 'lnApi'];

function appConfig( $locationProvider, lnCmsConfigProvider, lnApi ) {
  $locationProvider.html5Mode( true );

  lnCmsConfigProvider.setConfig(
    { endpoints: getEndpoints( lnApi.base, lnApi.endpoints ) }
  );
}

appRun.$inject = ['lnMAdminBarService', 'lnApi'];

function appRun( lnMAdminBarService, lnApi ) {
  lnMAdminBarService.setApiUrl(
    getEndpoints( lnApi.base, lnApi.endpoints ).adminBar
  );
}

function getEndpoints( apiBase, apiEndpoints ) {
  var resolvedEndpoints = apiEndpoints;

  function resolveEndpoint( endpoint, name ) {
    resolvedEndpoints[name] = endpoint.replace( '{API_BASE}', apiBase );
  }

  if ( angular.isDefined( apiBase ) && '' !== apiBase ) {
    angular.forEach( apiEndpoints, resolveEndpoint );
  }

  return resolvedEndpoints;
}

require( '../public/js/ngConstants.js' );
require( 'ln-cms' );
require( 'ln-filters' );
require( 'ln-patternlab' );

// Dependent on app.
require( './custom/templates' );
