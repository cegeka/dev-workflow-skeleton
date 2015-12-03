/* global angular */
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