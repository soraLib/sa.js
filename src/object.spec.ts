import { setObjectValues } from './object';

describe('Object', () => {
  it('set values test', () => {
    const source = {
      a: 1,
      b: '2'
    };

    setObjectValues(source, { a: 2 })

    expect(source).toEqual({ a: 2, b: '2' });
  });
});
