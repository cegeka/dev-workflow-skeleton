import expect from "config/chai.config";
import SetupDatePage from "page/setup-date.page";

export default class GalleryPage {

    constructor() {
        this.pets = element.all(by.repeater("pet in gallery.pets"));
        this.petNames = element.all(by.binding("pet.name"));
        this.selectedPet = element(by.binding("gallery.selectedPet.name"));
        this.setupDateButton = element(by.id("setup-date"));
        this.textFilter = element(by.model("gallery.searchCriteria.$"));
        this.kindFilter = element(by.model("gallery.searchCriteria.kind"));
    }

    containsPetGallery() {
        return this.assertNumberOfPets(7);
    }

    assertNumberOfPets(number) {
        expect(this.pets.count()).to.eventually.equal(number);
        return this;
    }

    filerByText(text) {
        this.textFilter.sendKeys(text);
        return this;
    }

    clearTextFilter() {
        this.textFilter.clear();
        return this;
    }

    filterByKind(kind) {
        this.kindFilter
                .all(by.tagName("option"))
                .filter(element => element.getText().then(text => text === kind))
                .click();
        return this;
    }

    clearKindFilter() {
        return this.filterByKind("All");
    }

    selectPet(petName) {
        this.petNames
            .filter(element => element.getText().then(text => text === petName))
            .click();
        return this;
    }

    assertNoPetIsSelectedForDate(){
        expect(this.selectedPet.isDisplayed()).to.eventually.equal(false);
        return this;
    }

    assertPetIsSelectedForDate(petName) {
        expect(this.selectedPet.isDisplayed()).to.eventually.equal(true);
        expect(this.selectedPet.getText()).to.eventually.equal(petName);
        return this;
    }

    setupDate() {
        this.setupDateButton.click();
        return new SetupDatePage();
    }
}
