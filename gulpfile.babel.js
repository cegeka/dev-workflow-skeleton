import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import babel from "gulp-babel";
import ngAnnotate from "gulp-ng-annotate";
// import uglify from "gulp-uglify";
import eslint from "gulp-eslint";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import mainBowerFiles from "main-bower-files";
import browserSync from "browser-sync";
import gutil from "gulp-util";

const server = browserSync.create("dev-workflow-skeleton");

const dirs = {
    src: "src",
    dest: "dist"
};

const paths = {
    vendor: `${dirs.dest}/vendor`,
    html: "src/**/*.html",
    js: "src/app/**/*.js",
    css: "src/assets/css/*",
    img: "src/assets/img/*",
    ngNewRouter: `node_modules/angular-new-router/dist/router.es5.js`,
    babelPolyfill: `node_modules/babel-polyfill/dist/polyfill.js`,
    bower: "bower.json"
};

gulp.task("default", callback =>
    runSequence("clean", "build", callback)
);

gulp.task("clean", () =>
    del(`${dirs.dest}/`)
);

gulp.task("dev", callback =>
    runSequence("clean", ["build", "watch"], "serve", callback)
);

gulp.task("build", ["build:app", "build:assets", "build:vendor", "lint"]);

gulp.task("build:app", ["build:app:js", "build:app:html"]);

gulp.task("build:assets", ["build:assets:css", "build:assets:img"]);

gulp.task("build:vendor", ["build:vendor:npm", "build:vendor:bower"]);

gulp.task("watch", () => {
    gulp.watch(paths.html, ["build:app:html"]);
    gulp.watch(paths.js, ["build:app:js"]);
    gulp.watch(paths.css, ["build:assets:css"]);
    gulp.watch(paths.img, ["build:assets:img"]);
    gulp.watch(paths.bower, ["build:vendor:bower"]);
});

gulp.task("build:app:js", () =>
    gulp
    .src(paths.js)
    .pipe(babel({
        moduleIds: true,
        presets: ["es2015"],
        plugins: ["transform-es2015-modules-systemjs"]
    }))
    .on("error", handleError)
    .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(gulp.dest(`${dirs.dest}/app`))
);

gulp.task("build:app:html", () =>
    gulp
    .src(paths.html)
    .pipe(gulp.dest(dirs.dest))
);

gulp.task("build:assets:css", () =>
    gulp
    .src(paths.css, {
        base: dirs.src
    })
    .pipe(gulp.dest(dirs.dest))
);

gulp.task("build:assets:img", () =>
    gulp
    .src(paths.img, {
        base: dirs.src
    })
    .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
    }))
    .pipe(gulp.dest(dirs.dest))
);

gulp.task("build:vendor:bower", () =>
    gulp
    .src(mainBowerFiles({
        checkExistence: true
    }))
    .pipe(gulp.dest(paths.vendor))
);

gulp.task("build:vendor:npm", () =>
    gulp
    .src([paths.ngNewRouter, paths.babelPolyfill])
    .pipe(gulp.dest(paths.vendor))
);

gulp.task("lint", () =>
    gulp.src(["gulpfile.babel.js", paths.js])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("serve", () =>
    server.init({
        // ui: {
        //     port: 8081
        // },
        port: 8080,
        server: {
            baseDir: dirs.dest
        }
    })
);

function handleError(err) {
    gutil.log(err);
    this.emit("end");
}
