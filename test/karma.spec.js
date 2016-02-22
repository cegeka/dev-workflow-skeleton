/* eslint no-unused-expressions: 0 */

describe("Karma", () => {
    it("should work", () => {});

    it("should work with Jasmine", () =>
        expect([1, 2, 3].length).toBe(3)
    );

    it("should work with Jasmine spies", () => {
        let spy = jasmine.createSpy("spy");

        spy();

        expect(spy).toHaveBeenCalled();
    });

    it("should work with Jasmine spies with return values", () => {
        let ten = jasmine
            .createSpy("ten")
            .and.returnValue(10);

        let actual = ten();

        expect(actual).toBe(10);
    });

    it("should work with Jasmine spy objects", () => {
        let spyObject = jasmine.createSpyObj("spy", ["method"]);

        spyObject.method();

        expect(spyObject.method).toHaveBeenCalled();
    });

    it("should work with Jasmine spy objects with return values", () => {
        let twenty = jasmine
            .createSpyObj("twenty", ["timesTwo"]);
        twenty.timesTwo.and.returnValue(40);

        let actual = twenty.timesTwo();

        expect(actual).toBe(40);
    });
});
