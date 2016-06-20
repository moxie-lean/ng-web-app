import angular from 'angular';

angular
  .module( 'app', [
    'ngConstants',
    'ngSanitize',
    'templateCache',
    'lnCms',
    'lnFilters',
    'lnPatterns',
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

appRun.$inject = ['lnOGravityFormService', 'lnCmsClientService', '$log',
  'lnMAdminBarService', 'lnApi'];

function appRun( lnOGravityFormService, lnCmsClientService, $log,
  lnMAdminBarService, lnApi ) {
  lnMAdminBarService.setApiUrl(
    getEndpoints( lnApi.base, lnApi.endpoints ).adminBar
  );

  lnCmsClientService
    .getStatic()
    .then( function response( response ) {
      if ( response.data.hasOwnProperty( 'gravity_forms' ) ) {
        lnOGravityFormService.setConfig( response.data.gravity_forms );
      } else {
        $log.error( 'Run -> No data available for lnOGravityForm', response );
      }
    }, function error( error ) {
      $log.error( error );
    });
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
