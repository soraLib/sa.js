import { Array } from '.';

describe('Arrays', () => {
  it('remove predicate test', () => {
    const arr = [1, 2, 3, 4];
    expect(Array.remove(arr, item => item === 2)).toEqual([1, 3, 4]);
  });

  it('remove index test', () => {
    expect(Array.remove([1, 2, 3, 4], 0)).toEqual([2, 3, 4]);
    expect(Array.remove([1, 2, 3, 4], 0, 2)).toEqual([3, 4]);
  });

  it('remove indexs test', () => {
    expect(Array.remove([1, 2, 3, 4], [1, 2])).toEqual([1, 4]);
    expect(Array.remove([1, 2, 3, 4], [2, 1])).toEqual([1, 4]);
  });
});
