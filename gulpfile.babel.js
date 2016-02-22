/* global __dirname */

import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import plumber from "gulp-plumber";
import htmlmin from "gulp-htmlmin";
import templateCache from "gulp-angular-templatecache";
import addStream from "add-stream";
import sourceMaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import concat from "gulp-concat";
import ngAnnotate from "gulp-ng-annotate";
import uglify from "gulp-uglify";
import cssnano from "gulp-cssnano";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import eslint from "gulp-eslint";
import karma from "karma";
import mainBowerFiles from "main-bower-files";
import browserSync from "browser-sync";

const browserSyncServer = browserSync.create("project");

let paths = {
    gulpfile: "gulpfile.babel.js",
    bower: "bower.json",
    npm: "package.json",
    indexHtml: "src/index.html",
    srcAppJs: "src/app/**/*.js",
    srcAppHtml: "src/app/**/*.html",
    srcContentCss: "src/content/css/*.css",
    srcContentImg: "src/content/images/*",
    testJs: "test/**/*.js",
    dist: "target/dist/",
    distSrc: "target/dist/src/",
    distSrcApp: "target/dist/src/app/",
    distSrcContentCss: "target/dist/src/content/css/",
    distSrcContentImg: "target/dist/src/content/images/",
    distSrcVendorJs: "target/dist/src/vendor/js/",
    distSrcVendorCss: "target/dist/src/vendor/css/",
    distTest: "target/dist/test/"
};

/*
 * main tasks
 */
gulp.task("build", callback => {
    runSequence(
        "clean",
        ["build:app", "build:vendor"],
        "lint",
        "test:unit",
        callback);
});

gulp.task("dev", callback => {
    runSequence(
        "clean",
        ["build:app", "build:vendor"],
        ["watch:app", "watch:vendor", "watch:test:unit", "serve"],
        callback);
});

/*
 * helper tasks
 */
gulp.task("build:app", ["build:app:src", "build:app:test"]);
gulp.task("watch:app", ["watch:app:src", "watch:app:test"]);
gulp.task("build:app:src", ["build:app:src:js", "build:app:src:index", "build:app:src:css", "build:app:src:img"]);
gulp.task("watch:app:src", ["watch:app:src:js", "watch:app:src:index", "watch:app:src:css", "watch:app:src:img"]);
gulp.task("build:app:test", ["build:app:test:unit"]);
gulp.task("watch:app:test", ["watch:app:test:unit"]);

gulp.task("build:vendor", ["build:vendor:js", "build:vendor:css"]);
gulp.task("watch:vendor", ["watch:vendor:js", "watch:vendor:css"]);
gulp.task("build:vendor:js", ["build:vendor:js:bower", "build:vendor:js:npm"]);
gulp.task("watch:vendor:js", ["watch:vendor:js:bower", "watch:vendor:js:npm"]);
gulp.task("build:vendor:css", ["build:vendor:css:bower"]);
gulp.task("watch:vendor:css", ["watch:vendor:css:bower"]);

/*
 * general
 */
gulp.task("clean", () => {
    return del(paths.dist);
});

gulp.task("lint", () => {
    return gulp
        .src([paths.gulpfile, paths.srcAppJs, paths.testJs])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("serve", callback => {
    browserSyncServer.init(
        {
            server: {baseDir: paths.distSrc},
            files: `${paths.distSrc}**/*`
        },
        callback
    );
});

/*
 * app:src:js
 */
let templates = () => {
    return gulp
        .src(paths.srcAppHtml, {base: "src"})
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            preserveLineBreaks: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            keepClosingSlash: true,
            quoteCharacter: "\""
        }))
        .pipe(templateCache("app.templates.run.js", {
            templateHeader: "export default $templateCache => {\n\"ngInject\";\n",
            templateFooter: "\n};",
            transformUrl(url) {
                return url.substring(url.indexOf("app"));
            }
        }));
};

gulp.task("build:app:src:js", () => {
    return gulp
        .src(paths.srcAppJs)
        .pipe(addStream.obj(templates()))
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(concat("app.js"))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcApp));
});

gulp.task("watch:app:src:js", () => {
    gulp.watch([paths.srcAppJs, paths.srcAppHtml], ["build:app:src:js"]);
});

/*
 * app:src:index
 */
gulp.task("build:app:src:index", () => {
    return gulp
        .src(paths.indexHtml)
        .pipe(gulp.dest(paths.distSrc));
});

gulp.task("watch:app:src:index", () => {
    gulp.watch(paths.indexHtml, ["build:app:src:index"]);
});

/*
 * app:src:css
 */
gulp.task("build:app:src:css", () => {
    return gulp
        .src(paths.srcContentCss)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(concat("app.css"))
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcContentCss));
});

gulp.task("watch:app:src:css", () => {
    gulp.watch(paths.srcContentCss, ["build:app:src:css"]);
});

/*
 * app:src:img
 */
gulp.task("build:app:src:img", () => {
    return gulp
        .src(paths.srcContentImg)
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true
        }))
        .pipe(gulp.dest(paths.distSrcContentImg));
});

gulp.task("watch:app:src:img", () => {
    gulp.watch(paths.srcContentImg, ["build:app:src:img"]);
});

/*
 * app:test:unit
 */
gulp.task("build:app:test:unit", () => {
    return gulp
        .src(paths.testJs)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distTest));
});

gulp.task("watch:app:test:unit", () => {
    gulp.watch(paths.testJs, ["build:app:test:unit"]);
});

let unitTest = (singleRun, callback) => {
    new karma.Server({
        configFile: `${__dirname}/test/config/karma.config.js`,
        singleRun
    },
    callback)
    .start();
};

gulp.task("test:unit", callback => {
    unitTest(true, callback);
});

gulp.task("watch:test:unit", callback => {
    unitTest(false, callback);
});

/*
 * vendor:js:bower
 */
let srcJsToJs = path => {
    if(path.basename.endsWith(".src")) {
        path.basename = path.basename.substring(0, path.basename.lastIndexOf(".src"));
    }
};

gulp.task("build:vendor:js:bower", () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: "**/*.js"
        }))
        .pipe(plumber())
        .pipe(rename(srcJsToJs))
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendorJs));
});

gulp.task("watch:vendor:js:bower", () => {
    gulp.watch(paths.bower, ["build:vendor:js:bower"]);
});

/*
 * vendor:js:npm
 */
gulp.task("build:vendor:js:npm", () => {
    return gulp
        .src(["node_modules/babel-polyfill/dist/polyfill.js"])
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendorJs));
});

gulp.task("watch:vendor:js:npm", () => {
    gulp.watch(paths.npm, ["build:vendor:js:npm"]);
});

/*
 * vendor:css:bower
 */
gulp.task("build:vendor:css:bower", () => {
    return gulp
        .src(mainBowerFiles({
            checkExistence: true,
            filter: "**/*.css"
        }))
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(paths.distSrcVendorCss));
});

gulp.task("watch:vendor:css:bower", () => {
    gulp.watch(paths.bower, ["build:vendor:css:bower"]);
});
