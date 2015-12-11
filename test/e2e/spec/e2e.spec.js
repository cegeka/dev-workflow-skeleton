import HomePage from "page/home.page";

describe("PetCupid", () => {
    describe("home page", () => {
        it("should display pet gallery", () => {
            HomePage
                .open()
                .assertTitle()
                .convertToGalleryPage()
                .containsPetGallery();
        });
    });

    describe("gallery page", () => {
        it("should have search filter", () => {
            HomePage
                .open()
                .convertToGalleryPage()
                .assertNumberOfPets(7)
                .filerByText("Princess")
                .assertNumberOfPets(1)
                .clearTextFilter()
                .assertNumberOfPets(7)
                .filterByKind("Dog")
                .assertNumberOfPets(3)
                .clearKindFilter()
                .assertNumberOfPets(7);
        });

        it("should have setup date feature", () => {
            HomePage
                .open()
                .convertToGalleryPage()
                .assertNoPetIsSelectedForDate()
                .selectPet("Princess")
                .assertPetIsSelectedForDate("Princess");
        });
    });

    describe("setup date page", () => {
        it("should show selected pet", () => {
            HomePage
                .open()
                .convertToGalleryPage()
                .selectPet("Princess")
                .setupDate()
                .assertSetupDateForPet("Princess")
                .assertContainsLocation()
                .assertContainsGoogleMaps()
                .setupDate();
        });
    });
});
