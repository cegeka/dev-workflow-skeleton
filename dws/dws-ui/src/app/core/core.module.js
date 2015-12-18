import routerConfig from "core/core.config";
import PetService from "core/core.pet.service";

export default angular
    .module("app.core", ["ngNewRouter", "ngResource"])
    .config(routerConfig)
    .service("petService", PetService);
