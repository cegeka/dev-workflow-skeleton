/* global __dirname  */

import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import babel from "gulp-babel";
import ngAnnotate from "gulp-ng-annotate";
import eslint from "gulp-eslint";
import mainBowerFiles from "main-bower-files";
import browserSync from "browser-sync";
import httpProxy from "http-proxy-middleware";
import concat from "gulp-concat";
import karma from "karma";
import plumber from "gulp-plumber";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import extReplace from "gulp-ext-replace";
import sourceMaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import minifyCss from "gulp-minify-css";
import imagemin from "gulp-imagemin";
import csslint from "gulp-csslint";

const server = browserSync.create("dev-workflow-skeleton");

const src = "src";
const dest = "target";
const dist = "dist";
const test = "test";

const dirs = {
    app: `${dest}/${dist}/app`,
    vendor: `${dest}/${dist}/vendor`,
    css: `${dest}/${dist}/assets/css`,
    img: `${dest}/${dist}/assets/img`,
    test: `${dest}/${test}/unit`
};

const files = {
    html: `${src}/**/*.html`,
    js: `${src}/app/**/*.js`,
    css: `${src}/assets/css/*`,
    img: `${src}/assets/img/*`,
    dest: `${dest}/${dist}/**/*`,
    test: `${test}/unit/**/*.spec.js`,
    ngNewRouter: `node_modules/angular-new-router/dist/router.es5.js`,
    babelPolyfill: `node_modules/babel-polyfill/dist/polyfill.js`,
    bower: "bower.json",
    gulp: "gulpfile.babel.js",
    karma: "karma.conf.js"
};

gulp.task("default", ["build"]);

gulp.task("dev", callback =>
    runSequence(
        "build",
        "watch",
        "serve",
        callback)
);

gulp.task("build", callback =>
    runSequence(
        "clean",
        ["build:app", "build:assets", "build:test", "build:vendor"],
        ["jslint"],
        "test:unit",
        callback)
);

gulp.task("clean", () =>
    del(dest)
);

gulp.task("build:app", ["build:app:js", "build:app:html"]);
gulp.task("build:assets", ["build:assets:css", "build:assets:img"]);
gulp.task("build:vendor", ["build:vendor:npm", "build:vendor:bower"]);
gulp.task("build:test", ["build:test:unit"]);

gulp.task("watch", () => {
    gulp.watch(files.html, ["build:app:html"]);
    gulp.watch(files.js, ["jslint", "build:app:js"]);
    gulp.watch(files.css, ["build:assets:css"]);
    gulp.watch(files.img, ["build:assets:img"]);
    gulp.watch(files.bower, ["build:vendor:bower"]);
});

gulp.task("build:app:js", () =>
    gulp
    .src(files.js)
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
    .pipe(gulp.dest(dirs.app))
);

gulp.task("build:app:html", () =>
    gulp
    .src(files.html)
    .pipe(gulp.dest(`${dest}/${dist}`))
);

gulp.task("build:assets:css", () =>
    gulp
    .src(files.css)
    .pipe(sourceMaps.init())
    .pipe(autoprefixer({
        browsers: ["> 5%"],
        cascade: false
    }))
    .pipe(minifyCss())
    .pipe(concat("main.css"))
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest(dirs.css))
);

gulp.task("build:assets:img", () =>
    gulp
    .src(files.img)
    .pipe(imagemin({
        optimizationLevel: 4,
        progressive: true
    }))
    .pipe(gulp.dest(dirs.img))
);

gulp.task("build:vendor:bower", () =>
    gulp
    .src(mainBowerFiles({
        checkExistence: true,
        filter: "**/*.js"
    }))
    .pipe(extReplace(".js", ".src.js"))
    .pipe(sourceMaps.init())
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest(dirs.vendor))
);

gulp.task("build:vendor:npm", () =>
    gulp
    .src([files.ngNewRouter, files.babelPolyfill])
    .pipe(sourceMaps.init())
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest(dirs.vendor))
);

gulp.task("build:test:unit", () =>
    gulp.src(files.test)
    .pipe(sourceMaps.init())
    .pipe(babel({
        moduleIds: true,
        presets: ["es2015"],
        plugins: ["transform-es2015-modules-systemjs"]
    }))
    .pipe(sourceMaps.init())
    .pipe(gulp.dest(dirs.test))
);

gulp.task("test:unit", callback => {
    new karma.Server(
        {
            configFile: `${__dirname}/${test}/unit/${files.karma}`,
            singleRun: true
        },
        callback)
    .start();
});

gulp.task("jslint", () =>
    gulp.src([files.gulp, files.js, `${test}/unit/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("csslint", () =>
    gulp.src(files.css)
    .pipe(csslint())
    .pipe(csslint.reporter("compact"))
    .pipe(csslint.failReporter())
);

gulp.task("serve", callback => {
    let proxy = httpProxy("/api", {target: "http://localhost:8080"});
    server.init(
        {
            port: 8082,
            ui: {
                port: 8083
            },
            server: {
                baseDir: `${dest}/${dist}`,
                middleware: [proxy]
            },
            files: files.dest
        },
        callback);
});
