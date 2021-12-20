import { deepClone, shallowClone } from '.';

describe('Clone', () => {
  it('object shallow clone test', () => {
    const object = { a: 1, b: { c: 3 } };
    const clone = shallowClone(object);
    expect(clone).toEqual(object);
    object.a = 2;
    expect(clone.a).toBe(1);
    object.b.c = 4;
    expect(clone.b.c).toBe(4);
  });

  it('array shallow clone test', () => {
    const array: [number, { a: number }] = [1, { a: 1 }];
    const clone = shallowClone(array);
    expect(clone).toEqual(array);
    array[0] = 2;
    expect(clone[0]).toBe(1);
    array[1].a = 4;
    expect(clone[1].a).toBe(4);
  });

  it('normal shallow clone test', () => {
    let num = 1;
    const clone = shallowClone(num);
    expect(clone).toBe(num);
    num = 2;
    expect(clone).toBe(1);
  });

  it('object deep clone test', () => {
    const object = { a: 1, b: { c: 3 } };
    const clone = deepClone(object);
    expect(clone).toEqual(object);
    object.a = 2;
    expect(clone.a).toEqual(1);
    object.b.c = 4;
    expect(clone.b.c).toEqual(3);
  });

  it('array deep clone test', () => {
    const array: [number, { a: number }] = [1, { a: 1 }];
    const clone = deepClone(array);
    expect(clone).toEqual(array);
    array[0] = 2;
    expect(clone[0]).toEqual(1);
    array[1].a = 4;
    expect(clone[1].a).toEqual(1);
  });

  it('complex deep clone test', () => {
    const object = {
      a: 1,
      b: null,
      c: [1],
      d: document.createElement('div'),
      e: () => {},
      f: new Number(),
      g: new Date(),
      h: { prototype: Object }
    };

    const clone = deepClone(object);

    expect(clone).toEqual(object);
  });
});
