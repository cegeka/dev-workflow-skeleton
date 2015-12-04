import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import babel from "gulp-babel";
import mainBowerFiles from "main-bower-files";

gulp.task("default", callback =>
    runSequence("clean", "build", callback)
);

gulp.task("clean", () =>
    del("dist/")
);

gulp.task("build", ["build:app", "build:assets", "build:vendor"]);

gulp.task("build:app", ["build:app:js", "build:app:html"]);

gulp.task("build:app:js", () =>
    gulp
    .src("src/**/*.js")
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(gulp.dest("dist"))
);

gulp.task("build:app:html", () =>
    gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("dist"))
);

gulp.task("build:assets", () =>
    gulp
    .src("src/assets/**/*", {
        base: "src"
    })
    .pipe(gulp.dest("dist"))
);

gulp.task("build:vendor", () =>
    gulp
    .src(mainBowerFiles({
        checkExistence: true
    }))
    .pipe(gulp.dest("dist/vendor"))
);
