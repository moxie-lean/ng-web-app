'use strict';

/*********************************************************
 * Modules
 ********************************************************/
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var ngConstant = require('gulp-ng-constant');
var ngAnnotate = require('gulp-ng-annotate');

// Non-Gulp dependencies
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');

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
      standalone: true,
      transformUrl: function (url) {
        return url.replace('custom/', '');
      }
    }))
    .pipe(gulp.dest(outputPath + 'js'));
});

/*********************************************************
 * JavaScript
 ********************************************************/

gulp.task('js:build', function() {
  return browserify(projectPath + 'app.js', {
    debug: false
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest(outputPath + 'js'));
});

gulp.task('js:dev', function() {
  return browserify(projectPath + 'app.js', {
    debug: true
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(outputPath + 'js'));
});

gulp.task('js:watch', [], function() {
  var bundler = browserify({
    entries: [projectPath + 'app.js'],
    extensions: ['.js'],
    debug: true,
    fullPaths: true,
    cache: {},
    packageCache: {}
  })

  var rebundle = function() {
    var startDate = new Date();
    return bundler.bundle(function(err, buf) {
      if (err) {
        console.log('JS error: ' + err.toString());
      } else {
        console.log('JS bundle updated in ' + (new Date().getTime() - startDate.getTime()) + ' ms');
      }
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(outputPath + 'js'));
  };

  bundler.plugin(watchify);
  bundler.on('update', rebundle);

  return rebundle();
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
