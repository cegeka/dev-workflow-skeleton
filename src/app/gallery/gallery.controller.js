/* global angular */
angular.module("app.gallery").controller("GalleryCtrl", function(Pet) {
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
       // $state.go("setupDate", { name: this.selectedPet.name });
    };
});
