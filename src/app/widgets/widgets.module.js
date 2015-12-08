import GoogleMapsDirective from "widgets/widgets.google-maps.directive";
import ReverseGeocodeDirective from "widgets/widgets.reverse-geocode.directive";

export default angular
    .module("app.widgets", [])
    .directive("pcGoogleMaps", () => new GoogleMapsDirective())
    .directive("pcReverseGeocode", () => new ReverseGeocodeDirective());
