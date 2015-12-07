/* global google */
angular.module("app.widgets").directive("pcReverseGeocode", function() {
    "use strict";

    return {
        restrict: "A",
        scope: {
            "position": "=pcReverseGeocode"
        },
        template: "<span>{{address}}</span>",
        link(scope) {
            const geocoder = new google.maps.Geocoder();
            scope.$watch("position", function(newPosition) {
                const latlng = new google.maps.LatLng(newPosition.lat, newPosition.long);
                geocoder.geocode({
                    "latLng": latlng
                }, function(results) {
                    scope.$apply(function() {
                        scope.address = results[0].formatted_address;
                    });
                });
            });
        }
    };
});
