import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import mainBowerFiles from "main-bower-files";

gulp.task("default", (callback) => {
    runSequence("clean", "build", callback);
});

gulp.task("clean", () => {
    return del("dist/");
});

gulp.task("build", ["build:app", "build:vendor"]);

gulp.task("build:app", () => {
    return gulp
        .src("src/**/*")
        .pipe(gulp.dest("dist"));
});

gulp.task("build:vendor", () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true
        }))
        .pipe(gulp.dest("dist/vendor"));
});
