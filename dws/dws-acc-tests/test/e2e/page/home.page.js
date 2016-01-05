import expect from "config/chai.config";
import GalleryPage from "page/gallery.page";

export default class HomePage {

    constructor() {
        browser.get("");
        browser.driver.manage().window().maximize();
    }

    assertTitle() {
        expect(browser.getTitle()).to.eventually.equal("Pet Cupid");
        return this;
    }

    convertToGalleryPage() {
        return new GalleryPage();
    }

    static open() {
        return new HomePage();
    }
}
