import { hasSubset, setObjectValues } from './object';

describe('Object', () => {
  it('set values test', () => {
    const source = {
      a: 1,
      b: '2'
    };

    setObjectValues(source, { a: 2 })

    expect(source).toEqual({ a: 2, b: '2' });
  });

  it('test subset', () => {
    expect(hasSubset({ a: 1, b: 2 }, { a: 1 })).toBe(true);
    expect(hasSubset({ a: 1, b: 2 }, { a: 2 })).toBe(false);
    expect(hasSubset({}, { b: 2 })).toBe(false);
    expect(hasSubset({ a: 1, b: 2 }, {})).toBe(true);
    expect(hasSubset({}, {})).toBe(true);
  })
});
