import angular from 'angular';

require('../public/js/ngConstants.js');
require('ln-cms');
require('ln-filters');

angular
  .module('app', [
    'ngSanitize',
    'templateCache',
    'lnCms',
    'lnFilters'
  ]);

// Dependent on app.
require('./templates');
