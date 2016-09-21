var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version <%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('build', function () {
  return gulp.src(['./common/head.js',
                   './common/jsonp.js',
                   './lib/*.js',
                   './common/footer.js'])
    .pipe(concat('jhub.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./'));
});

gulp.task('uglify', ['build'], function() {
  gulp.src('./jhub.js')
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(header(banner, { pkg : pkg } ))
  .pipe(gulp.dest('./'));
});

gulp.task('test', ['uglify'], function() {
  gulp.src('./jhub.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('default', ['build', 'uglify', 'test']);