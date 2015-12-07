/* global google */
angular.module("app.widgets").directive("pcGooglemaps", function() {
    "use strict";

    return {
        restrict: "A",
        scope: {
            "marker": "="
        },
        link(scope, element) {
            let map = new google.maps.Map(element[0], {
                center: new google.maps.LatLng(50.85, 4.35),
                zoom: 8
            });
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(scope.marker.lat, scope.marker.long),
                map,
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
