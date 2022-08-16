import { DeepAssign } from './types';
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

/**
 * determines whether target object contain the sub object.
 * 
 * @example
 * 
 * hasSubset({ a: 1, b: 2 }, { a: 1 })
 * 
 * // => true
 */
export function hasSubset<T extends object>(target: T, sub: object): boolean {
  return Object.entries(sub).every(([key, value]) => target[key as keyof T] === value);
}

/**
 * assign recursively, shallow copy
 * 
 * @example
 * 
 * deepAssign({ a: { c: 2 }, b: 1 }, { a: { c: 3 } })
 * 
 * // => { a: { c: 3 }, b: 1 }
 */
export function deepAssign<A extends object, B extends object>(source: A, target: B): DeepAssign<A, B> {
  for(const [key, value] of Object.entries(target)) {
    const sourceValue = (source as any)[key]
    if(typeof value === 'object' && typeof sourceValue === 'object') {
      deepAssign(sourceValue, value)

      continue
    }

    (source as any)[key] = value
  }

  return source as any
}