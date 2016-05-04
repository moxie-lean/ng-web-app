import angular from 'angular';

require( '../public/js/ngConstants.js' );
require( 'ln-cms' );
require( 'ln-filters' );
require( 'ln-patternlab' );

angular
  .module( 'app', [
    'ngSanitize',
    'templateCache',
    'lnCms',
    'lnFilters',
    'lnPatterns'
  ]);

// Dependent on app.
require( './custom/templates' );
