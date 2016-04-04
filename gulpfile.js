'use strict';

/*********************************************************
 * Modules
 ********************************************************/
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var ngConstant = require('gulp-ng-constant');

var fs = require('fs');

/*********************************************************
 * Vars
 ********************************************************/
var projectPath = 'app/';
var outputPath = 'public/';
var configPath = 'config/';

/*********************************************************
 * Angular Templates
 ********************************************************/

gulp.task('templates', function() {
  return gulp.src(projectPath + '**/*.html')
    .pipe(templateCache({
      module: 'templateCache',
      standalone: true
    }))
    .pipe(gulp.dest(outputPath + 'js'));
});


/*********************************************************
 * Environment Config
 ********************************************************/

var configFunc = function(env) {
  var config = './' + configPath + 'config.json';
  var localConfig = './' + configPath + 'config.local.json';
  var myConfig;

  if (fs.existsSync(localConfig)) {
    console.log('Using local config file: ' + localConfig);
    myConfig = require(localConfig);
  } else {
    console.log('Using default config file: ' + config);
    myConfig = require(config);
  }

  var envConfig = myConfig[env];

  return ngConstant({
    constants: envConfig,
    stream: true
  })
    .pipe(gulp.dest(outputPath + 'js'));
};

gulp.task('config:dev', configFunc.bind(this, 'dev'));

gulp.task('config:staging', configFunc.bind(this, 'staging'));

gulp.task('config:build', configFunc.bind(this, 'production'));
