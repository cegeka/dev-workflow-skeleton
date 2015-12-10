import expect from "config/chai.config";

export default class GalleryPage {

    constructor(){
        browser.get("http://localhost:8080");
    }

    assertOnGalleryPage(){
        expect(browser.getTitle()).to.eventually.equal("PetCupid");
        return this;
    }

    static open(){
        return new GalleryPage();
    }
}
