import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import babel from "gulp-babel";
import ngAnnotate from "gulp-ng-annotate";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import mainBowerFiles from "main-bower-files";

gulp.task("default", callback =>
    runSequence("clean", "build", callback)
);

gulp.task("clean", () =>
    del("dist/")
);

gulp.task("build", ["build:app", "build:assets", "build:vendor"]);

gulp.task("build:app", ["build:app:js", "build:app:html"]);

gulp.task("build:assets", ["build:assets:css", "build:assets:img"]);

gulp.task("build:app:js", () =>
    gulp
    .src("src/**/*.js")
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
);

gulp.task("build:app:html", () =>
    gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("dist"))
);

gulp.task("build:assets:css", () =>
    gulp
    .src("src/assets/css/*", {
        base: "src"
    })
    .pipe(gulp.dest("dist"))
);

gulp.task("build:assets:img", () =>
    gulp
    .src("src/assets/img/*", {
        base: "src"
    })
    .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
    }))
    .pipe(gulp.dest("dist"))
);

gulp.task("build:vendor", () =>
    gulp
    .src(mainBowerFiles({
        checkExistence: true
    }))
    .pipe(gulp.dest("dist/vendor"))
);
