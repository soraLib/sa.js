import { Array } from './array';

describe('Arrays', () => {
  it('remove predicate test', () => {
    const arr = [1, 2, 3, 4];
    const removed = Array.remove(arr, item => item === 2);
    expect(arr).toEqual([1, 3, 4]);
    expect(removed).toEqual([1, 3, 4]);
  });

  it('remove index test', () => {
    expect(Array.remove([1, 2, 3, 4], 0)).toEqual([2, 3, 4]);
    expect(Array.remove([1, 2, 3, 4], 0, 2)).toEqual([3, 4]);
  });

  it('remove indexs test', () => {
    expect(Array.remove([1, 2, 3, 4], [1, 2])).toEqual([1, 4]);
    expect(Array.remove([1, 2, 3, 4], [2, 1])).toEqual([1, 4]);
  });

  it('swap predicate test', () => {
    expect(Array.swap([1, 2, 3, 4], (item) => item === 2, (item) => item === 3)).toEqual([1, 3, 2, 4]);
    expect(Array.swap([1, 2, 3, 4], (item) => item === 2, (item) => item === 5)).toEqual([1, 2, 3, 4]);
  });

  it('swap index test', () => {
    expect(Array.swap([1, 2, 3, 4], 0, 2)).toEqual([3, 2, 1, 4]);
    expect(Array.swap([1, 2, 3, 4], 5, 2)).toEqual([1, 2, 3, 4]);
    expect(Array.swap([1, 2, 3, 4], (item: number) => item === 2, 1 as any)).toEqual([1, 2, 3, 4]);
  });
});
