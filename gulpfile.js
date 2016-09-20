// Include gulp
var gulp = require('gulp');
 // Include plugins
var concat = require('gulp-concat');
 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src(['./common/head.js',
                     './lib/*.js',
                     './common/footer.js'])
      .pipe(concat('jhub.js'))
      .pipe(gulp.dest('dist'));
});
 // Default Task
gulp.task('default', ['scripts']);