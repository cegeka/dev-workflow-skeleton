/* global angular, google */
let petcupidApp = angular.module("petcupidApp", ["ui.router", "ngResource"]);

petcupidApp.config(function($urlRouterProvider, $stateProvider) {
    "use strict";

    $stateProvider
        .state("gallery", {
            url: "/gallery",
            templateUrl: "partials/gallery.html",
            controller: "ProfileGalleryCtrl as profileGalleryCtrl"
        })
        .state("setupDate", {
            url: "/pets/:name",
            templateUrl: "partials/setupdate.html",
            controller: "SetupDateCtrl as setupDateCtrl",
            resolve: {
                pet(Pet, $stateParams) {
                    return Pet.get({name:$stateParams.name});
                }
            }
        });

    $urlRouterProvider.otherwise("/gallery");
});

petcupidApp.factory("Pet", function($resource) {
    "use strict";

    let Pet = $resource('/pets/:name', { name: '@name' });

    return Pet;
});

petcupidApp.controller("ProfileGalleryCtrl", function(Pet, $state) {
    "use strict";

    this.pets = Pet.query();
    this.searchCriteria = {
        $: "",
        kind: ""
    };

    this.selectedPet = null;

    this.selectPet = function ($event, newPet) {
        this.selectedPet = newPet;
        $event.stopPropagation();
    };

    this.deselectPet = function () {
        this.selectedPet = null;
    };

    this.setupDate = function () {
        $state.go('setupDate', { name: this.selectedPet.name });
    };
});


petcupidApp.controller("SetupDateCtrl", function(pet, $state) {
    "use strict";
    this.pet = pet;

    this.cancel = function() {
        $state.go("gallery");
    };

    this.submit = function() {
        $state.go("gallery");
    };

    this.selectedLocation = {
        lat: 50.85,
        long: 4.35
    };
});

petcupidApp.directive("pcGooglemaps", function() {
    "use strict";

    return {
        restrict: "A",
        scope: {
            'marker': "="
        },
        link(scope, element, attrs) {
            const map = new google.maps.Map(element[0], {
                center: new google.maps.LatLng(50.85, 4.35),
                zoom: 8
            });
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(scope.marker.lat, scope.marker.long),
                map: map,
                draggable: true
            });
            google.maps.event.addListener(marker, "dragend", () => {
                scope.$apply(function() {
                    scope.marker = {
                        lat: marker.getPosition().lat(),
                        long: marker.getPosition().lng()
                    };
                });
            });
        }
    };
});

petcupidApp.directive("pcReverseGeocode", () => {
    "use strict";

    return {
        restrict: "A",
        scope: {
            'position': "=pcReverseGeocode"
        },
        template: "<span>{{address}}</span>",
        link(scope) {
            const geocoder = new google.maps.Geocoder();
            scope.$watch("position", (newPosition) => {
                const latlng = new google.maps.LatLng(newPosition.lat, newPosition.long);
                geocoder.geocode({ 'latLng': latlng }, (results, status) => {
                    scope.$apply(() => {
                        scope.address = results[0].formatted_address;
                    });
                });
            });

        }
    };
});