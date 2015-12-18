/* global exports, require */
/* eslint babel/object-shorthand: 0 */

exports.config = {
    framework: "mocha",
    mochaOpts: {
        reporter: "spec",
        timeout: 120000,
        slow: 5000
    },
    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    baseUrl: "http://localhost:8080",
    beforeLaunch: function() {
        require("../../target/dist/vendor/polyfill.min.js");
        require("../../target/dist/vendor/es6-module-loader.min.js");
        require("../../target/dist/vendor/system.min.js");
        require("../../target/test/e2e/e2e.js");
    },
    capabilities: {
        "browserName": "firefox"
    },
    specs: ["protractor.bootstrap.js"]
};
