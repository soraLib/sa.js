/**
 * set object values, shallow copy
 * 
 * @example
 * 
 * setObjectValues({ a: 1, b: '2' }, { a: 2 });
 * 
 * // => { a: 2, b: '2' }
 */
export function setObjectValues<T extends object>(target: T, values: Partial<T>): T {
  for(const [key, value] of Object.entries(values)) {
    Reflect.set(target, key, value);
  }

  return target;
}
