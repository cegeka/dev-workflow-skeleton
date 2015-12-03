/* global angular */
angular.module("app.setup-date").controller("SetupDateCtrl", function(pet, $state) {
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