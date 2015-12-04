/* global angular */
let camelToDash = name => {
    const UPPERCASE = /([A-Z])/g;
    let upperCaseToDashLowerCase = $1 => `-${$1.toLowerCase()}`;

    return name.replace(UPPERCASE, upperCaseToDashLowerCase);
};

let camelToCtrl = name => `${name[0].toUpperCase()}${name.substring(1)}Ctrl`;

angular.module("petcupidApp").config(($componentLoaderProvider) => {
    $componentLoaderProvider.setTemplateMapping((component) => `app/${camelToDash(component)}/${camelToDash(component)}.html`);
    $componentLoaderProvider.setCtrlNameMapping((component) => camelToCtrl(component));
}).controller("PetcupidAppCtrl", function($router) {
    $router.config([{
        path: "/",
        component: "gallery"
    }, {
        path: "/pets/:name",
        component: "setupDate"
    }]);
});
/*
angular.module("petcupidApp").config(function($urlRouterProvider, $stateProvider) {
    "use strict";

    $stateProvider
        .state("gallery", {
            url: "/gallery",
            templateUrl: "app/gallery/gallery.html",
            controller: "ProfileGalleryCtrl as profileGalleryCtrl"
        })
        .state("setupDate", {
            url: "/pets/:name",
            templateUrl: "app/setup-date/setup-date.html",
            controller: "SetupDateCtrl as setupDateCtrl",
            resolve: {
                pet(Pet, $stateParams) {
                    return Pet.get($stateParams.name);
                }
            }
        });

    $urlRouterProvider.otherwise("/gallery");
});
*/