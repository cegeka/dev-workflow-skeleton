/* global angular */
angular.module("app.core").factory("Pet", function() {
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
