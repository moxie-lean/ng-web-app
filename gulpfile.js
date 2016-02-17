'use strict';

/******************************************************************************
 | >   PLUGINS
 ******************************************************************************/
var gulp = require('gulp');
var babelify = require('babelify');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
//var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var templateCache = require('gulp-angular-templatecache');
var env = require('gulp-env');
var fs = require('fs');

/******************************************************************************
 | >   PROJECT VARIABLES
 ******************************************************************************/
var projectPath = 'app/';
var outputPath = 'www/build/';
var configPath = 'config/';

var envFile = configPath + 'env.prod.json';
if( fs.existsSync(configPath + 'env.local.json') ) {
  envFile = configPath + 'env.local.json';
}
console.log('Using env file: ' + envFile);

/******************************************************************************
 | >  JS and CSS task
 ******************************************************************************/
gulp.task('assets', ['styles', 'js']);

/******************************************************************************
 | >   CSS TASKS
 ******************************************************************************/

/**
 * Run the minify:styles task as dependency, which will compile from sass,
 * will generate a source map and then minify the result css.
 */
gulp.task('styles', ['styles:minify'], function() {
  var styles = [
    outputPath + 'style.css',
    outputPath + 'style.min.css'
  ];
  return gulp.src(styles)
    .pipe( notify({
      title: 'Styles completed',
      message: 'The Sass files has been compiled into CSS',
      onLast: true,
      icon: './assets/images/notify/sass.png',
    }));
});

/**
 * Minify the CSS after has been created with source maps, styles:minify
 * is a depnency after this task it's completed it's going to minify
 * the CSS.
 */
gulp.task('styles:minify', ['styles:combine'], function(){
  return gulp.src(outputPath + 'css/style.css')
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(outputPath + 'css'));
});

/**
 * Task to compile the CSS from sass, this will add the prefixes and creates the
 * sourcemap, this source map is going to be loaded only in the non minified
 * version.
 */
gulp.task('styles:combine', function(){
  return gulp.src(projectPath + 'style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(
      'last 2 version',
      'ie 9',
      'ios 7',
      'android 4'
    ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputPath + 'css'));
});

/******************************************************************************
 | >   JS TASKS
 ******************************************************************************/

//
//// Task to combine and minify the js scripts.
//gulp.task('js', ['js:combine', 'js:minify'], function() {
//  return gulp.src( sourcePath + 'js/production.js')
//    .pipe( notify({
//      title: 'JS completed',
//      message: 'The JS has been created',
//      onLast: true,
//      icon: './assets/images/notify/js.png',
//    }));
//});
//
///**
// * Runs a minify task to combine and minify the scripts after are combined in
// * a single file stored in js as production.js
// */
//gulp.task('js:minify', ['js:combine_without_sourcemaps'], function(){
//  return gulp.src(sourcePath + 'js/production-min.js')
//    .pipe(uglify())
//    .pipe(gulp.dest(sourcePath + 'js'));
//});
//
//gulp.task('js:combine_without_sourcemaps', function(){
//  return browserified({
//    debug: false,
//    output: 'production-min.js'
//  });
//});
//
///**
// * Combines all the files in the scripts array, and creates a source map for the
// * generated file to easy access to the original files from the browser to
// * enable faster development process.
// */
//gulp.task('js:combine', ['browserify']);
//
//gulp.task('browserify', function(){
//  return browserified({
//    debug: true,
//    output: 'production.js'
//  });
//});
//
//var mainJS = sourcePath + 'js/app/main.js';
//
//function browserified( opts ){
//  var options = opts || {};
//  return browserify(mainJS, options)
//    .transform(babelify, {
//      presets: ['es2015', 'react']
//    })
//    .bundle()
//    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//    .pipe(source( options.output ))
//    .pipe(gulp.dest( sourcePath + '/js'));
//};
//
//// Files to inspect in order to follow the same standard
//var jsFiles = [
//  sourcePath + 'js/app/**/*.js',
//  sourcePath + 'js/app/**/*.jsx'
//];
//
//// Tasks that are handle the lints without breaking the gulp report
//gulp.task('js:lint', ['js:cs']);
//
//// Gulp taks to analyze the code using JS CS rules witouth breaking gulp
//gulp.task('js:cs', function() {
//  return gulp.src( jsFiles )
//    .pipe(eslint())
//    .pipe(eslint.format())
//    .pipe( notify({ message: 'JS Completed', onLast: true }) );
//});
//
//// Tasks for continuous integration using the JS CS rules
//gulp.task('js:cs-ci', function() {
//  return gulp.src( jsFiles )
//    .pipe(eslint())
//    .pipe(eslint.format())
//    .pipe(eslint.failAfterError());
//});
//
//// Group of JS tasks for continuous integration
//gulp.task('js:ci', ['js:cs-ci']);

/******************************************************************************
 | >   TEMPLATE TASKS
 ******************************************************************************/

gulp.task('tc', function () {
  return gulp.src(projectPath + '**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest(outputPath + 'js'));
});

/******************************************************************************
 | >   WATCH TASKS
 ******************************************************************************/
// Alias to the watch:all task
gulp.task('watch', ['watch:all']);
gulp.task('watch:all', ['watch:js', 'watch:sass', 'watch:templates']);

gulp.task('watch:js', ['js'], function(){
  gulp.watch(sourcePath + 'js/app/**/*.js', ['js']);
});

gulp.task('watch:sass', ['styles'], function(){
  gulp.watch(projectPath + '**/*.scss', ['styles']);
});

gulp.task('watch:templates', ['tc'], function(){
  gulp.watch(projectPath + '**/*.html', ['tc']);
});

/******************************************************************************
 | >   CONTINUOUS INTEGRATION TASK
 ******************************************************************************/
gulp.task('ci', ['js:ci', 'php:ci']);

/******************************************************************************
 | >   DEFAULT TASK
 ******************************************************************************/
gulp.task('default', ['watch:js', 'watch:sass']);
