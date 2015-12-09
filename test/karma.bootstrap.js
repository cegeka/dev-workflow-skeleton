/* test/unit/karma.bootstrap.js */

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
                return (/^\/base\/test\/unit\/(.*).spec.js$/).test(filePath);
            })
            .map(function toTestName(filePath) {
                return filePath.match(/^\/base\/test\/unit\/(.*).js$/)[1];
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