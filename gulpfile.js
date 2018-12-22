'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin')

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Gulp task to minify CSS files
gulp.task('css', function () {
  return gulp.src('sass/*.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    //.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    //Output - save as .css
    .pipe(gulp.dest('prod/assets/css/'))
    // Minify the file
    .pipe(csso())
    // Output - save as .min.css
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('prod/assets/css/'))
});

// Gulp task to minify JavaScript files
gulp.task('js', function() {
  return gulp.src('js/*.js')
    // Minify the file
    .pipe(uglify())
    // Output save as .min.js
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('prod/assets/js'))
});

// Gulp task to minify HTML files
gulp.task('html', function() {
  return gulp.src(['prod/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('prod'));
});

//Gulp task to minify img files
gulp.task('img', function() {
  return gulp.src(['prod/img/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('prod/img/min/'))
});

// Gulp task to minify all files
gulp.task('default', function () {

  //watch task to update files automatically
  gulp.watch('sass/*.scss', gulp.series('css'));
  gulp.watch('js/*.js',gulp.series('js'));
});
