'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var templateCache = require('gulp-angular-templatecache');
var env = require('gulp-env');
var fs = require('fs');
var sassLint = require('gulp-sass-lint');

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
  var sassFiles = [
  ];
  gulp.src(projectPath + '**/*.s+(a|c)ss')
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
});

// Files to inspect in order to follow the same standard
var jsFiles = [
  projectPath + '**/*.js'
];

// Tasks that are handle the lints without breaking the gulp report
gulp.task('js:lint', ['js:cs']);

// Gulp taks to analyze the code using JS CS rules witouth breaking gulp
gulp.task('js:cs', function() {
  return gulp.src( jsFiles )
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe( notify({ message: 'JS Completed', onLast: true }) );
});

// Tasks for continuous integration using the JS CS rules
gulp.task('js:ci', function() {
  return gulp.src( jsFiles )
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});


gulp.task('tc', function () {
  return gulp.src(projectPath + '**/*.html')
  .pipe(templateCache())
  .pipe(gulp.dest(outputPath + 'js'));
});

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

gulp.task('ci', ['js:ci', 'styles:ci']);

gulp.task('default', ['watch:js', 'watch:sass']);
