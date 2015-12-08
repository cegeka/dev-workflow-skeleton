import routerConfig from "core/core.config";
import PetService from "core/core.pet.service";

export default angular
    .module("app.core", ["ngNewRouter"])
    .config(routerConfig)
    .service("petService", PetService);
