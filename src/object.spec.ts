import { hasSubset, setObjectValues, deepAssign } from './object';

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

  it('test deep assign', () => {
    expect(deepAssign({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
    expect(deepAssign({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
    expect(deepAssign({ a: { b: 2 } }, { a: { b: 3 } })).toEqual({ a: { b: 3 } })
    expect(deepAssign({ a: { c: 2 }, b: 1 }, { a: { c: 3 } })).toEqual({ a: { c: 3 }, b: 1 })
  })
});
