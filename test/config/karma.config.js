/* global module */

module.exports = function configure(config) {
    config.set(
        {
            basePath: "../..",
            files: [
                "target/dist/src/vendor/js/polyfill.min.js",
                "target/dist/src/vendor/js/es6-module-loader.min.js",
                "target/dist/src/vendor/js/system.min.js",
                "target/dist/src/app/**/*.js",
                "target/dist/test/util/**/*.js",
                "target/dist/test/**/*.spec.js",
                "test/config/karma.bootstrap.js",
                {
                    pattern: "target/dist/**/*.js.map",
                    watched: false,
                    included: false
                }
            ],
            browsers: ["PhantomJS"],
            frameworks: ["jasmine"],
            reporters: ["mocha", "junit"],
            junitReporter: {
                outputDir: "target/surefire-reports/",
                outputFile: "TEST-results.xml",
                suite: "be.vdab.project.ui",
                useBrowserName: false
            },
            port: 9876
        });
};
