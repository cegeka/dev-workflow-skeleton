var gulp = require("gulp");
var runSequence = require("run-sequence");
var del = require("del");
var mainBowerFiles = require("main-bower-files");

gulp.task("default", function(callback) {
    runSequence("clean", "build", callback);
});

gulp.task("clean", function(){
    return del("dist/")
});

gulp.task("build", ["build:app", "build:vendor"]);

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
