const findMin = require("../findMin");

describe("find min function", () => {
    test('should return the minimum number between 3 arguments', () => {
        expect(findMin(1, 2, 3)).toEqual(1);
        expect(findMin(5, 1, 2)).toEqual(1);
        expect(findMin(102, 404, 48)).toEqual(48);
        expect(findMin(-1, 0, -1)).toEqual(-1);
        expect(findMin(2, 2, 2)).toEqual(2);
    });
});