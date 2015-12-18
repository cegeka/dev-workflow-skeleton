export default class PetcupidAppCtrl {

    constructor($router) {
        "ngInject";
        $router.config([{
            path: "/",
            component: "gallery"
        }, {
            path: "/pets/:id",
            component: "setupDate"
        }]);
    }
}
