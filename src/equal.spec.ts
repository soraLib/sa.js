import { multiAndEqual, multiOrEqual } from "./equal";

describe('Equal', () => {
  it('multiple or equal test', () => {
    const num = 100;
    expect(multiOrEqual(100, num => num > 5, 0)).toBe(true);
    expect(multiOrEqual(100, num => num < 10, num)).toBe(true);
  });

  it('multiple and equal test', () => {
    const num = 100;
    expect(multiAndEqual(100, num => num > 5, 0)).toBe(false);
    expect(multiAndEqual(100, num => num < 10, num)).toBe(false);
    expect(multiAndEqual(100, num => num > 10, 100)).toBe(true);
  });
});
