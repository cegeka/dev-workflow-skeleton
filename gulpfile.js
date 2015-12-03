var gulp = require("gulp");
var mainBowerFiles = require("main-bower-files");

gulp.task("default", ["build:app", "build:vendor"]);

gulp.task("build:app", function() {
    return gulp
        .src("src/**/*")
        .pipe(gulp.dest("dist"));
});


gulp.task("build:vendor", function() {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true
        }))
        .pipe(gulp.dest("dist/vendor"));
});
