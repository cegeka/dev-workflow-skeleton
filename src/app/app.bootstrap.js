 /* global document */

 System
    .import("app.module")
    .then(() =>
        angular
            .element(document)
            .ready(() => angular.bootstrap(document, ["app"], {strictDi: true}))
    );
