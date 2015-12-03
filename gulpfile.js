var gulp = require('gulp');

gulp.task('default', function() {
    return gulp
        .src("src/**/*")
        .pipe(gulp.dest("dist"));
});
