'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
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

gulp.task('assets', ['styles']);

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
    onLast: true
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

/**
 *  Check the SASS style.
 */
gulp.task('styles:ci', function () {
  gulp.src(projectPath + '**/*.s+(a|c)ss')
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
});

// Alias to the watch:all task
gulp.task('watch', ['watch:all']);
gulp.task('watch:all', ['watch:sass', 'watch:templates']);

gulp.task('watch:sass', ['styles'], function(){
  gulp.watch(projectPath + '**/*.scss', ['styles']);
});

gulp.task('default', ['watch:sass']);
