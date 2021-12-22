import { safeDiv, revNum } from './num';

describe('Num', () => {
  it('reverse number test', () => {
    expect(revNum(1234)).toBe(4321);
    expect(revNum(1200)).toBe(21);
  });

  it('division test', () => {
    expect(safeDiv(100, 0)).toBe(0);
    expect(safeDiv(100, 2)).toBe(50);
  });
});
