import { Arrays } from '.';

describe('Arrays', () => {
  it('remove predicate test', () => {
    const arr = [1, 2, 3, 4];
    expect(Arrays.remove(arr, item => item === 2)).toEqual([1, 3, 4]);
  });

  it('remove index test', () => {
    const arr = [1, 2, 3, 4];
    expect(Arrays.remove(arr, 0)).toEqual([2, 3, 4]);
    expect(Arrays.remove(arr, 0, 2)).toEqual([4]);
  });
});
