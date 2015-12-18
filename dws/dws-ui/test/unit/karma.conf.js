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
        reporters: ["mocha"],
        port: 9876
    });
};
