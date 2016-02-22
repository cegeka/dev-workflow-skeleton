export default $stateProvider => {
    "ngInject";
    $stateProvider.state("home", {
        url: "/",
        template: "<home min-nb-of-projects=\"10\"></home>"
    });
};
