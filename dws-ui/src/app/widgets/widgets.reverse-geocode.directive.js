/* global google */
export default class ReverseGeocodeDirective {

    constructor() {
        this.restrict = "E";
        this.scope = {
            "position": "="
        };
        this.template = "{{address}}";
    }

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
}
