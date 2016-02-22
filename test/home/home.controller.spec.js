import HomeController from "home/home.controller";

describe("HomeController", () => {
    let homeController;

    beforeEach(() => (homeController = new HomeController()));

    describe("#$onInit()", () =>
        it("should initialize maximum number of projects", () => {
            homeController.$onInit();

            expect(homeController.maxNbOfProjects).toBe(100);
        })
    );
});
