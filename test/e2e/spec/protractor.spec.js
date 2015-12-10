import GalleryPage from "page/gallery.page";

describe("Protractor Demo App", () => {
    it("should have a title", () => {
        GalleryPage
            .open()
            .assertOnGalleryPage();
    });
});
