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

const server = browserSync.create("dev-workflow-skeleton");

const dirs = {
    src: "src",
    dest: "dist"
};

const paths = {
    vendor: `${dirs.dest}/vendor`,
    html: "src/**/*.html",
    srcAppJs: "src/app/**/*.js",
    testUnitJs: "test/unit/**/*.js",
    testE2EJs: "test/e2e/**/*.js",
    test: "test/unit/**/*.spec.js",
    css: "src/assets/css/*",
    img: "src/assets/img/*",
    ngNewRouter: `node_modules/angular-new-router/dist/router.es5.js`,
    babelPolyfill: `node_modules/babel-polyfill/dist/polyfill.js`,
    bower: "bower.json",
    gulp: "gulpfile.babel.js"
};

let test = singleRunEnabled => {
    return callback => {
        new karma.Server({
            configFile: `${__dirname}/test/unit/karma.conf.js`,
            singleRun: singleRunEnabled
        },
        callback)
        .start();
    };
};
let testSingleRun = test(true);

gulp.task("default", callback =>
    runSequence("clean", "build", callback)
);

gulp.task("clean", () =>
    del(dirs.dest)
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
    gulp.watch(paths.srcAppJs, ["jslint", "build:app:js"]);
    gulp.watch(paths.css, ["csslint", "build:assets:css"]);
    gulp.watch(paths.img, ["build:assets:img"]);
    gulp.watch(paths.bower, ["build:vendor:bower"]);
});

gulp.task("build:app:js", () =>
    gulp
    .src(paths.srcAppJs)
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
    .pipe(plumber())
    .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
    }))
    .pipe(gulp.dest(dirs.dest))
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
    .pipe(gulp.dest(paths.vendor))
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
    .pipe(gulp.dest(paths.vendor))
);

gulp.task("jslint", () =>
    gulp.src([paths.gulp, paths.srcAppJs, paths.testUnitJs, paths.testE2EJs])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("csslint", () =>
    gulp.src(paths.css)
    .pipe(csslint())
    .pipe(csslint.reporter("compact"))
    // .pipe(csslint.failReporter())
);

gulp.task("build:test", () =>
    gulp.src(paths.test)
    .pipe(sourceMaps.init())
    .pipe(babel({
        moduleIds: true,
        presets: ["es2015"],
        plugins: ["transform-es2015-modules-systemjs"]
    }))
    .pipe(sourceMaps.init())
    .pipe(gulp.dest(`${dirs.dest}/test/unit`))
);

gulp.task("serve", () =>
    server.init({
        port: 8080,
        ui: {
            port: 8081
        },
        server: {
            baseDir: dirs.dest
        },
        files: `${dirs.dest}/**/*`
    })
);
