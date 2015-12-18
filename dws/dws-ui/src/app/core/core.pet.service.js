export default class PetService {

    constructor($resource) {
        "ngInject";
        this.Pet = $resource("api/pet/:petId", {petId: "@id"});
    }

    query() {
        return this.Pet.query();
    }

    get(id) {
        return this.Pet.get({petId: id});
    }
}
