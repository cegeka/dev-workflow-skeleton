export default class PetcupidAppCtrl {

    constructor($router) {
        "ngInject";
        $router.config([{
            path: "/",
            component: "gallery"
        }, {
            path: "/pets/:name",
            component: "setupDate"
        }]);
    }
}
