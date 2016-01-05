/* global process */

import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import babel from "gulp-babel";
import concat from "gulp-concat";
import eslint from "gulp-eslint";
import browserSync from "browser-sync";
import httpProxy from "http-proxy-middleware";
import gulpProtractor from "gulp-protractor";

const server = browserSync.create("dev-workflow-skeleton");
const protractor = gulpProtractor.protractor;

gulp.task("test:local", callback =>
	runSequence(
        "front-end:start",
        "end2end:test:local",
        "front-end:stop",
        callback)
);

gulp.task("test:jenkins", ["end2end:test:jenkins"]);

gulp.task("front-end:start", callback => {
    let proxy = httpProxy("http://localhost:8080/api");
    server.init(
        {
            open: false,
            port: 8082,
            server: {
                baseDir: "target/acceptance-tests/front-end",
                middleware: [proxy]
            }
        },
        callback);
});

gulp.task("front-end:stop", () => server.exit());

gulp.task("end2end:test:local", callback =>
    runSequence(
        "clean",
        "lint",
        "build",
        "protractor:test:local",
        callback)
);

gulp.task("end2end:test:jenkins", callback =>
    runSequence(
        "clean",
        "lint",
        "build",
        "protractor:test:jenkins",
        callback)
);

gulp.task("clean", () =>
    del("target/dist")
);

gulp.task("lint", () =>
    gulp.src(["gulpfile.babel.js", "test/e2e/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("build", ["build:e2e", "build:vendor"]);

gulp.task("build:e2e", () =>
    gulp
    .src("test/e2e/**/*.js")
    .pipe(babel({
        moduleIds: true,
        presets: ["es2015"],
        plugins: ["transform-es2015-modules-systemjs"]
    }))
    .pipe(concat("e2e.js"))
    .pipe(gulp.dest("target/dist/test/e2e/"))
);

gulp.task("build:vendor", () =>
    gulp
    .src(["node_modules/babel-polyfill/dist/polyfill.js",
        "node_modules/es6-module-loader/dist/es6-module-loader.js",
        "node_modules/systemjs/dist/system.js"])
    .pipe(gulp.dest("target/dist/vendor/"))
);

gulp.task("protractor:test:local", () =>
    gulp
        .src("test/e2e/protractor.bootstrap.js")
        .pipe(protractor({
            configFile: "test/e2e/protractor.conf.js"
        }))
        .on("error", () => process.exit(1))
);

gulp.task("protractor:test:jenkins", () =>
    gulp
        .src("test/e2e/protractor.bootstrap.js")
        .pipe(protractor({
            configFile: "test/e2e/protractor.conf.js",
            args: ["--baseUrl", "http://dws_front-end_jenkins_test:80"]
        }))
        .on("error", () => process.exit(1))
);
