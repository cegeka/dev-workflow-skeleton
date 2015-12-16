export default class GalleryCtrl {
    
    constructor(petService, $location) {
        "ngInject";
        this.petService = petService;
        this.location = $location;
    }

    activate() {
        this.pets = this.petService.query();
        this.searchCriteria = {
            $: "",
            kind: ""
        };
        this.selectedPet = null;
    }
    
    selectPet($event, newPet) {
        this.selectedPet = newPet;
        $event.stopPropagation();
    }

    deselectPet() {
        this.selectedPet = null;
    }

    setupDate() {
        this.location.path(`/pets/${this.selectedPet.name}`);
    }
}
