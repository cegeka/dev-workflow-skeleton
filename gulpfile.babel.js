/* global __dirname */
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
import concat from "gulp-concat";
import karma from "karma";
import csslint from "gulp-csslint";
import plumber from "gulp-plumber";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import extReplace from "gulp-ext-replace";
import sourceMaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import minifyCss from "gulp-minify-css";
// import gutil from "gulp-util";
// import uglify from "gulp-uglify";

const server = browserSync.create("dev-workflow-skeleton");

const src = "src";
const dest = "dist";
const test = "test";

const dirs = {
    app: `${dest}/app`,
    vendor: `${dest}/vendor`,
    css: `${dest}/assets/css`,
    img: `${dest}/assets/img`,
    test: {
        unit: `${dest}/${test}/unit`,
        e2e: `${dest}/${test}/e2e`
    }
};

const paths = {
    html: `${src}/**/*.html`,
    js: `${src}/app/**/*.js`,
    css: `${src}/assets/css/*`,
    img: `${src}/assets/img/*`,
    dest: `${dest}/**/*`,
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

let runTests = singleRunEnabled => {
    return callback => {
        new karma.Server({
            configFile: `${__dirname}/${test}/unit/${paths.karma}`,
            singleRun: singleRunEnabled
        }, callback)
        .start();
    };
};

let testSingleRun = runTests(true);

gulp.task("default", callback =>
    runSequence("clean", "build", callback)
);

gulp.task("clean", () =>
    del(dest)
);

gulp.task("dev", callback =>
    runSequence("clean", ["build", "watch"], "serve", callback)
);

gulp.task("build", ["build:app", "build:assets", "build:vendor", "build:test", "jslint"], testSingleRun);

gulp.task("build:app", ["build:app:js", "build:app:html"]);

gulp.task("build:assets", ["csslint", "build:assets:css", "build:assets:img"]);

gulp.task("build:vendor", ["build:vendor:npm", "build:vendor:bower"]);

gulp.task("watch", () => {
    gulp.watch(paths.html, ["build:app:html"]);
    gulp.watch(paths.js, ["jslint", "build:app:js"]);
    gulp.watch(paths.css, ["csslint", "build:assets:css"]);
    gulp.watch(paths.img, ["build:assets:img"]);
    gulp.watch(paths.bower, ["build:vendor:bower"]);
});

gulp.task("build:app:js", () =>
    gulp
    .src(paths.js)
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
    .src(paths.html)
    .pipe(gulp.dest(dest))
);

gulp.task("build:assets:css", () =>
    gulp
    .src(paths.css)
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
    .src(paths.img)
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
    .src([paths.ngNewRouter, paths.babelPolyfill])
    .pipe(sourceMaps.init())
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest(dirs.vendor))
);

gulp.task("jslint", () =>
    gulp.src([paths.gulp, paths.js, paths.test.unit, paths.test.e2e])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("csslint", () =>
    gulp.src(paths.css)
    .pipe(csslint())
    .pipe(csslint.reporter("compact"))
    .pipe(csslint.failReporter())
);

gulp.task("build:test", () =>
    gulp.src(paths.test.unit)
    .pipe(sourceMaps.init())
    .pipe(babel({
        moduleIds: true,
        presets: ["es2015"],
        plugins: ["transform-es2015-modules-systemjs"]
    }))
    .pipe(sourceMaps.init())
    .pipe(gulp.dest(dirs.test.unit))
);

gulp.task("serve", () =>
    server.init({
        port: 8080,
        ui: {
            port: 8081
        },
        server: {
            baseDir: dest
        },
        files: paths.dest
    })
);
