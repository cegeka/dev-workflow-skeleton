angular.module("app.setup-date").controller("SetupDateCtrl", function(Pet, $routeParams, $location) {
    "use strict";

    this.pet = Pet.get($routeParams.name);

    this.cancel = function() {
        $location.path(`/`);
    };

    this.submit = function() {
        $location.path(`/`);
    };

    this.selectedLocation = {
        lat: 50.85,
        long: 4.35
    };
});
