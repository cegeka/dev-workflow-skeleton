petcupidApp.factory("Pet", function() {
    "use strict";

    var data = [
        {
            name: "Princess",
            kind: "chicken",
            img: "assets/img/chicken1.jpg",
            profileText: "Meet Princess Fluffybutt! She is one of the fluffiest chickens you will ever meet. Most often you'll find Princess cuddled up in the warmest spot she can find, and if that happens to be in your lap, well then that's fine for her too! Princess also enjoys nomming treats out of your hand, clucking softly under her breath, and following her three sisters around the yard. Get to know Princess today!"
        }, {
            name: "MrFuzz",
            kind: "cat",
            img: "assets/img/cat1.jpg",
            profileText: "MrFuzz loves belly rubs, and likes playing with pieces of string"
        }, {
            name: "Burt",
            kind: "dog",
            img: "assets/img/dog1.jpg",
            profileText: "Burt looks cute, but is in reality a though guy. Secretly wants to work for the FBI"
        }, {
            name: "MissPoes",
            kind: "cat",
            img: "assets/img/cat2.jpg",
            profileText: "MissPoes is a classy lady who appreciates gentle pets"
        }, {
            name: "Lady",
            kind: "dog",
            img: "assets/img/dog2.jpg",
            profileText: "Lady isn't always very lady-like. She loves rolling in the mud and barking at naughty squirrels"
        }, {
            name: "Grumpy",
            kind: "cat",
            img: "assets/img/cat3.jpg",
            profileText: "Grumpy basically hates everything, especially dogs. He does looove lasagne though"
        }, {
            name: "Bobby",
            kind: "dog",
            img: "assets/img/dog3.jpg",
            profileText: "Bobby loves to fetch balls and chase rabbits. Great with kids."
        }
    ];

    function getPets() {
        return data;
    }

    function getPetWithName(name) {
        return data
            .filter(function(pet) {
                return pet.name === name;
            })[0];
    }

    return {
        query: getPets,
        get: getPetWithName
    };
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
            var map = new google.maps.Map(element[0], { // const
                center: new google.maps.LatLng(50.85, 4.35),
                zoom: 8
            });
            var marker = new google.maps.Marker({ //const
                position: new google.maps.LatLng(scope.marker.lat, scope.marker.long),
                map: map,
                draggable: true
            });
            google.maps.event.addListener(marker, "dragend", function() {
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

petcupidApp.directive("pcReverseGeocode", function() {
    "use strict";

    return {
        restrict: "A",
        scope: {
            'position': "=pcReverseGeocode"
        },
        template: "<span>{{address}}</span>",
        link(scope) {
            const geocoder = new google.maps.Geocoder();
            scope.$watch("position", function(newPosition) {
                const latlng = new google.maps.LatLng(newPosition.lat, newPosition.long);
                geocoder.geocode({ 'latLng': latlng }, function(results, status) {
                    scope.$apply(function() {
                        scope.address = results[0].formatted_address;
                    });
                });
            });

        }
    };
});
