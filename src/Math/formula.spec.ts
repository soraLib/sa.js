import { combinations, factorial, permutations } from './formula';

describe('Formula', () => {
  it('factorial test', () => {
    expect(factorial(4)).toBe(24);
    expect(factorial(0)).toBe(1);
    expect(factorial(-1)).toBe(1);
  });

  it('permutations test', () => {
    expect(permutations(3, 2)).toBe(6);
    expect(permutations(3, 4)).toBe(6);
  });

  it('combinations test', () => {
    expect(combinations(3, 2)).toBe(3);
    expect(combinations(3, 4)).toBe(1);
  });
});
