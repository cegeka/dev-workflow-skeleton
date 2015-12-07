angular
    .module("petcupidApp")
    .controller("PetcupidAppCtrl", function($router) {
        $router.config([{
            path: "/",
            component: "gallery"
        }, {
            path: "/pets/:name",
            component: "setupDate"
        }]);
    });
