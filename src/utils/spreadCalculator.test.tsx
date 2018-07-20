import calculateSpread from "./spreadCalculator";

describe("Spread calculator test", () => {
    it("Spread calculation", () => {
        expect(calculateSpread(0, 200)).toBe(0);
    });
    it("Spread calculation", () => {
        expect(calculateSpread(0.064677, 0.06462357)).toBe(-0.08);
    });
    it("Spread calculation", () => {
        expect(calculateSpread(0.06178725, 0.062004)).toBe(0.35);
    });
    it("Spread calculation", () => {
        expect(calculateSpread(0.6466449, 0.6462357)).toBe(-0.06);
    });
    it("Spread calculation", () => {
        expect(calculateSpread(0, 0)).toBe(0);
    });
});