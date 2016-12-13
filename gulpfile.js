var gulp = require('gulp'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    stylish = require('jshint-stylish'),
    map = require('map-stream'),
    chalk = require('chalk'),
    path = require('path'),
    events = require('events'),
    fs = require('fs');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version <%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// Custom linting reporter used for error notify
var emmitter = new events.EventEmitter();
    var jsHintErrorReporter = map(function (file, cb) {
    if (!file.jshint.success) {
        file.jshint.results.forEach(function (err) {
        if (err) {
            var msg = [
                path.basename(file.path),
                'Line: ' + err.error.line,
                'Reason: ' + err.error.reason
            ];
            emmitter.emit('error', new Error(msg.join('\n')));
        }
        });
    }
    cb(null, file);
});

gulp.task('build', function () {
  return gulp.src(['./src/node/module-head.js',
                   './utils/jsonp.js',
                   './src/*.js',
                   './src/node/module-footer.js'])
    .pipe(concat('jhub.js'))
    .pipe(header(banner, {pkg : pkg }))
    .pipe(gulp.dest('./'));
});

gulp.task('lint', ['build'], function () {
  gulp.src('./jhub.js')
    .pipe(plumber())
    .pipe(jshint('.jshintrc', {fail: true}))
    .pipe(jshint.reporter(stylish)) // Console output
    .pipe(jsHintErrorReporter) // If error pop up a notify alert
    .on('error', notify.onError(function (err) {
      return err.message;
    }));
});

gulp.task('uglify', ['lint'], function() {
    gulp.src('./jhub.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, {pkg : pkg }))
    .pipe(gulp.dest('./'));
});

gulp.task('create-index', ['uglify'], function() {
    fs.writeFile('./index.js', 'module.exports = require(\'./jhub\');', function(err) {
        if(err) {
            return console.log(err);
        }
        else {
            gutil.log(chalk.cyan('index.js created.'));
        }
    });
});

gulp.task('default', ['build', 'lint', 'uglify', 'create-index']);