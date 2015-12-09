/* globals require */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect;

describe("Protractor Demo App", function() {
    it("should have a title", function() {
        browser.get("http://localhost:8080");

        expect(browser.getTitle()).to.eventually.equal("PetCupid");
    });
});
