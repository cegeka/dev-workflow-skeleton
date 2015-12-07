let camelToDash = name => {
    const UPPERCASE = /([A-Z])/g;
    let upperCaseToDashLowerCase = $1 => `-${$1.toLowerCase()}`;

    return name.replace(UPPERCASE, upperCaseToDashLowerCase);
};

let camelToCtrl = name => `${name[0].toUpperCase()}${name.substring(1)}Ctrl`;

angular.module("petcupidApp").config($componentLoaderProvider => {
    $componentLoaderProvider.setTemplateMapping(component => `app/${camelToDash(component)}/${camelToDash(component)}.html`);
    $componentLoaderProvider.setCtrlNameMapping(component => camelToCtrl(component));
}).controller("PetcupidAppCtrl", function($router) {
    $router.config([{
        path: "/",
        component: "gallery"
    }, {
        path: "/pets/:name",
        component: "setupDate"
    }]);
});
