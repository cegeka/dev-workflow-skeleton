/* global exports */

exports.config = {
    framework: "mocha",
    mochaOpts: {
        reporter: "nyan"
    },
    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    specs: ["e2e.spec.js"]
};
