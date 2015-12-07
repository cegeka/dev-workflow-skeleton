angular
    .module("petcupidApp", [
        /* Shared modules */
        "app.core",
        "app.widgets",

        /* Components */
        "app.gallery",
        "app.setup-date"
    ])
    .config($locationProvider => $locationProvider.html5Mode(true));
