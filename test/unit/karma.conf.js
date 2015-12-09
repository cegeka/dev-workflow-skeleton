/* global module */

module.exports = function(config) {
    config.set({
        basePath: "../..",
        files: [
            "dist/vendor/polyfill.js",
            "dist/vendor/es6-module-loader.src.js",
            "dist/vendor/system.src.js",
            "dist/app/**/*.js",
            "dist/test/unit/**/*.spec.js",
            "test/unit/karma.bootstrap.js"
        ],
        browsers: ["PhantomJS"],
        frameworks: ["mocha", "chai-sinon"],
        reporters: ["mocha"],
        port: 9876
    });
};
