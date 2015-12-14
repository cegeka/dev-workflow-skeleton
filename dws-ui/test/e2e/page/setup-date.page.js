import expect from "config/chai.config";
import GalleryPage from "page/gallery.page";

export default class SetupDatePage {

    constructor() {
        this.petName = element(by.id("header")).element(by.tagName("h3"));
        this.location = element(by.tagName("pc-reverse-geocode"));
        this.googleMaps = element(by.className("map-container"));
        this.submit = element(by.id("submit"));
    }

    assertSetupDateForPet(petName) {
        expect(this.petName.getText()).to.eventually.equal(petName);
        return this;
    }

    assertContainsLocation() {
        this.location.isDisplayed();
        return this;
    }

    assertContainsGoogleMaps() {
        this.googleMaps.isDisplayed();
        return this;
    }

    setupDate() {
        this.submit.click();
        return new GalleryPage();
    }
}
