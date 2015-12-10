/* global exports, require */
/* eslint babel/object-shorthand: 0 */

exports.config = {
    framework: "mocha",
    mochaOpts: {
        reporter: "spec"
    },
    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    baseUrl: "http://localhost:8080",
    beforeLaunch: function() {
        require("../../dist/vendor/polyfill.min.js");
        require("../../dist/vendor/es6-module-loader.min.js");
        require("../../dist/vendor/system.min.js");
        require("../../dist/test/e2e/e2e.js");
    },
    specs: ["protractor.bootstrap.js"]
};
