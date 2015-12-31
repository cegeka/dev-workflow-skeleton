/* global module */

module.exports = function(config) {
    config.set({
        basePath: "../..",
        files: [
            "target/dist/vendor/polyfill.min.js",
            "target/dist/vendor/es6-module-loader.min.js",
            "target/dist/vendor/system.min.js",
            "target/dist/app/**/*.js",
            "target/test/unit/**/*.spec.js",
            "test/unit/karma.bootstrap.js"
        ],
        browsers: ["PhantomJS"],
        frameworks: ["mocha", "chai-sinon"],
        reporters: ["mocha", "junit"],
        junitReporter: {
            outputDir: "target/surefire-reports/",
            outputFile: "TEST-results.xml",
            suite: "be.cegeka.dws.ui",
            useBrowserName: false
        },
        port: 9876
    });
};
