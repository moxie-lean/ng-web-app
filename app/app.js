import angular from 'angular';

require('../public/js/ngConstants.js');
require('leean-cms');
require('components/ln-filters/module');

angular
  .module('app', [
    'ngSanitize',
    'templateCache',
    'lnCms',
    'lnFilters'
  ]);

// Dependent on app.
require('./templates');
