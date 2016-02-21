'use strict';

var gulp = require('gulp');
var env = require('gulp-env');
var fs = require('fs');

var projectPath = 'app/';
var outputPath = 'public/build/';
var configPath = 'config/';

var envFile = configPath + 'env.prod.json';
if( fs.existsSync(configPath + 'env.local.json') ) {
  envFile = configPath + 'env.local.json';
}
console.log('Using env file: ' + envFile);

/**
 *  Check the SASS style.
 */
gulp.task('styles:ci', function () {
  gulp.src(projectPath + '**/*.s+(a|c)ss')
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
});

