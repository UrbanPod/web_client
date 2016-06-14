"use strict";



// IMPORTS =====================================================================

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");

var browserify = require('browserify');
var tsify = require('tsify');
var watchify = require('watchify');

var sass = require('gulp-sass');


// JS ==========================================================================

var tsconfig = require('./tsconfig');

var b = browserify({
  basedir: "src/ts",
  cache: {},
  packageCache: {},
  debug: true
}).add("index.ts")
  .plugin(tsify);
b = watchify(b);

gulp.task('ts:watch', bundle); // So you can run `gulp ts` to build the file.
b.on('update', bundle); // On any dep update, runs the bundler.
b.on('log', gutil.log); // Output build logs to terminal.

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error')) // Log errors if they happen.
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}


// CSS =========================================================================

gulp.task("css:build", function() {
  return gulp.src("src/scss/index.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task("css:watch", function() {
  gulp.watch('./src/**/*.scss', ['build:css']);
});


// ASSETS ======================================================================

var indexPath = './src/index.html';

gulp.task('assets:copy', function() {
  gulp.src(indexPath).pipe(gulp.dest('./dist/'));
});

gulp.task('assets:watch', function() {
  gulp.watch(indexPath, ['assets:copy']);
});


// TESTING =====================================================================

gulp.task("test", function() {
});

gulp.task("tdd", function() {
});


// FINAL =======================================================================

gulp.task("build", ["ts:watch", "css:watch", "assets:copy"]);
gulp.task("watch", ["ts:watch", "css:watch", "assets:watch"]);
