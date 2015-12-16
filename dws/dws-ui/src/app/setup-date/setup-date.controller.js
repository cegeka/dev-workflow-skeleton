export default class SetupDateCtrl {
    
    constructor(petService, $routeParams, $location) {
        "ngInject";
        this.petService = petService;
        this.routeParams = $routeParams;
        this.location = $location;
    }
    
    activate(){
        this.pet = this.petService.get(this.routeParams.name);
        this.selectedLocation = {
            lat: 50.85,
            long: 4.35
        };
    }
    
    cancel() {
        this.location.path(`/`);
    }

    submit() {
        this.location.path(`/`);
    }
}
