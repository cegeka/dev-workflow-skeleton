/* globals __karma__ */
/* eslint
    no-underscore-dangle: 0,
    prefer-arrow-callback: 0 */

(function bootstrapKarma() {
    function disableKarmaAutoStartUp() {
        __karma__.loaded = function noop() {};
    }

    function importTestFiles() {
        return Object.keys(__karma__.files)
            .filter(function hasProperty(filePath) {
                return __karma__.files.hasOwnProperty(filePath);
            })
            .filter(function isTestFile(filePath) {
                return (/^\/base\/target\/dist\/test\/(.*).spec.js$/).test(filePath);
            })
            .map(function toTestName(filePath) {
                return filePath.match(/^\/base\/target\/dist\/test\/(.*).js$/)[1];
            })
            .map(function importModule(testModuleName) {
                return System.import(testModuleName);
            });
    }

    function startKarma(importTestFilePromises) {
        Promise
            .all(importTestFilePromises)
            .then(
                function onSuccess() {
                    __karma__.start();
                },
                function onError(error) {
                    __karma__.error(error.stack || error);
                });
    }

    disableKarmaAutoStartUp();
    startKarma(importTestFiles());
})();
