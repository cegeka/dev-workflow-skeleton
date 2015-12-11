describe("protractor", function() {
    it("should bootstrap", function() {
        return Promise.all([
            System.import("spec/e2e.spec")
        ]);
    });
});
