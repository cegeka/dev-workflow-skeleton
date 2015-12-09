import GalleryCtrl from "gallery/gallery.controller";

describe("GalleryCtrl", () => {
    describe("#selectPet()", () => {
        it("should select a pet", () => {
            let ctrl = new GalleryCtrl();
            let event = {
                stopPropagation(){}
            };

            ctrl.selectPet(event, "MissPoes");

            ctrl.selectedPet.should.equal("MissPoes");
        });
    });
});
