import expect from "config/chai.config";

export default class GalleryPage {

    constructor(){
        browser.get("");
    }

    assertOnGalleryPage(){
        expect(browser.getTitle()).to.eventually.equal("PetCupid");
        return this;
    }

    static open(){
        return new GalleryPage();
    }
}
