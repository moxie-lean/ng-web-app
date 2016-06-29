import angular from 'angular';

angular
  .module( 'app', [
    'ngConstants',
    'ngSanitize',
    'ngAnimate',
    'templateCache',
    'lnCms',
    'lnFilters',
    'lnPatterns',
  ])
  .animation( '.view-content', appAnimation )
  .config( appConfig )
  .run( appRun );

//
// ANIMATION
//

appAnimation.$inject = ['$rootScope', '$state'];

function appAnimation( $rootScope, $state ) {
  function resetTweenProps( element, done ) {
    //this is needed to make fixed elements work after the animations
    TweenMax.set( element, {
      clearProps: 'all',
    });

    done();
  }

  return {
    enter: function enter( element, done ) {
      if ( $state.current.name === 'loading' ) {
        TweenMax.from( element, 1, {
          opacity: 0,
          onComplete: function complete() {
            resetTweenProps( element, done );
          },
        });
      } else {
        TweenMax.from( element, 1, {
          opacity: 0,
          y: '-100',
          onComplete: function complete() {
            resetTweenProps( element, done );
          },
        });
      }
    },
  };
}

//
// CONFIG
//

appConfig.$inject = ['$locationProvider', 'lnCmsConfigProvider', 'lnApi'];

function appConfig( $locationProvider, lnCmsConfigProvider, lnApi ) {
  $locationProvider.html5Mode( true );

  lnCmsConfigProvider.setConfig(
    { endpoints: getEndpoints( lnApi.base, lnApi.endpoints ) }
  );
}

//
// RUN
//

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

//
// DEPENDENCIES
//

require( '../public/js/ngConstants.js' );
require( 'ln-cms' );
require( 'ln-filters' );
require( 'ln-patternlab' );
require( './custom/templates' );
