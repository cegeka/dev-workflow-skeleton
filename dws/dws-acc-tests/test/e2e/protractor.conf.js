/* global exports, require */
/* eslint babel/object-shorthand: 0 */

exports.config = {
    framework: "mocha",
    mochaOpts: {
        reporter: "mocha-jenkins-reporter",
        reporterOptions: {
            junit_report_name: "be.cegeka.dws.acc-tests",             
            junit_report_path: "target/surefire-reports/TEST-results.xml",
            junit_report_stack: 1
        },
        timeout: 120000,
        slow: 5000
    },
    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    baseUrl: "http://localhost:8082",
    beforeLaunch: function() {
        require("../../target/dist/vendor/polyfill.js");
        require("../../target/dist/vendor/es6-module-loader.js");
        require("../../target/dist/vendor/system.js");
        require("../../target/dist/test/e2e/e2e.js");
    },
    capabilities: {
        browserName: "firefox"
    },
    specs: ["protractor.bootstrap.js"]
};
