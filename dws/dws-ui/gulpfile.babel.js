/* global __dirname, process */

import gulp from "gulp";
import runSequence from "run-sequence";
import del from "del";
import babel from "gulp-babel";
import ngAnnotate from "gulp-ng-annotate";
import eslint from "gulp-eslint";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
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
import csslint from "gulp-csslint";
import gulpProtractor from "gulp-protractor";
import protractorQA from "gulp-protractor-qa";

const server = browserSync.create("dev-workflow-skeleton");
const protractor = gulpProtractor.protractor;

const src = "src";
const dest = "target";
const dist = "dist";
const test = "test";

const dirs = {
    app: `${dest}/${dist}/app`,
    vendor: `${dest}/${dist}/vendor`,
    css: `${dest}/${dist}/assets/css`,
    img: `${dest}/${dist}/assets/img`,
    test: {
        unit: `${dest}/${test}/unit`,
        e2e: `${dest}/${test}/e2e`
    }
};

const files = {
    html: `${src}/**/*.html`,
    js: `${src}/app/**/*.js`,
    css: `${src}/assets/css/*`,
    img: `${src}/assets/img/*`,
    dest: `${dest}/${dist}/**/*`,
    test: {
        unit: `${test}/unit/**/*.spec.js`,
        e2e: `${test}/e2e/**/*.spec.js`
    },
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
        "watch:protractor-qa",
        "serve",
        callback)
);

gulp.task("build", callback =>
    runSequence(
        "clean",
        ["build:app", "build:assets", "build:test", "build:vendor"],
        ["jslint", "protractor-qa"],
        "test:unit",
        //"test:e2e",
        callback)
);

gulp.task("clean", () =>
    del(dest)
);

gulp.task("build:app", ["build:app:js", "build:app:html"]);
gulp.task("build:assets", ["build:assets:css", "build:assets:img"]);
gulp.task("build:vendor", ["build:vendor:npm", "build:vendor:bower"]);
gulp.task("build:test", ["build:test:unit", "build:test:e2e"]);

gulp.task("watch", () => {
    gulp.watch(files.html, ["build:app:html"]);
    gulp.watch(files.js, ["jslint", "build:app:js"]);
    gulp.watch(files.css, ["build:assets:css"]);
    gulp.watch(files.img, ["build:assets:img"]);
    gulp.watch(files.bower, ["build:vendor:bower"]);
    gulp.watch([files.test.e2e, `${test}/e2e/page/**/*.js`, `${test}/e2e/config/**/*.js`], ["build:test:e2e"]);
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
    .pipe(plumber())
    .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
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
    gulp.src(files.test.unit)
    .pipe(sourceMaps.init())
    .pipe(babel({
        moduleIds: true,
        presets: ["es2015"],
        plugins: ["transform-es2015-modules-systemjs"]
    }))
    .pipe(sourceMaps.init())
    .pipe(gulp.dest(dirs.test.unit))
);

gulp.task("build:test:e2e", () =>
    gulp
    .src([files.test.e2e, `${test}/e2e/page/**/*.js`, `${test}/e2e/config/**/*.js`], {
        base: "test/e2e/"
    })
    .pipe(sourceMaps.init())
    .pipe(babel({
        moduleIds: true,
        presets: ["es2015"],
        plugins: ["transform-es2015-modules-systemjs"]
    }))
    .pipe(gulp.dest(dirs.test.e2e))
    .pipe(concat("e2e.js"))
    .pipe(sourceMaps.init())
    .pipe(gulp.dest(dirs.test.e2e))
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

gulp.task("test:e2e", callback =>
    runSequence("serve:start", "test:e2e:protractor", "serve:stop", callback)
);

gulp.task("serve:start", callback =>
    server.init(
        {
            open: false,
            port: 8080,
            server: {
                baseDir: `${dest}/${dist}`
            }
        },
        callback)
);

gulp.task("serve:stop", () => server.exit());

gulp.task("test:e2e:protractor", () =>
    gulp
        .src(`${test}/e2e/protractor.bootstrap.js`)
        .pipe(protractor({
            configFile: `${test}/e2e/protractor.conf.js`
        }))
        .on("error", () => process.exit(1))
);

let startProtractorQA = runOnce =>
    protractorQA.init({
        runOnce,
        testSrc: `${dirs.test.e2e}/**/!(e2e).js`,
        viewSrc: files.html
    });

gulp.task("protractor-qa", () =>
    startProtractorQA(true)
);

gulp.task("watch:protractor-qa", () =>
    startProtractorQA(false)
);

gulp.task("jslint", () =>
    gulp.src([files.gulp, files.js, `${test}/unit/**/*.js`, `${test}/e2e/**/*.js`])
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
    let proxy = httpProxy("http://localhost:8080/api");
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
