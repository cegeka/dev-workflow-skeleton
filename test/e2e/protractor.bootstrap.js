describe("protractor", function() {
    it("should bootstrap", function() {
        return Promise.all([
            System.import("spec/protractor.spec")
        ]);
    });
});
