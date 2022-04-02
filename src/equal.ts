import { PredicateCallback } from "./types";

type NotFunction<T> = T extends Function ? never : T;
type MOET<T> = PredicateCallback<T> | T;
/**
 * return whether or not source is equal to target values or fit those predicates.
 * 
 * @example
 * 
 * multiOrEqual(10, num => num > 5, 0);
 * 
 * // => true
 */
export function multiOrEqual<T>(source: NotFunction<T>, ...targets: MOET<T>[]): boolean;
export function multiOrEqual<T>(source: NotFunction<T>, ...targets: MOET<T>[]): boolean {
  const isPredicateCallback = (value: unknown) : value is PredicateCallback<T> => typeof value === 'function';

  return targets.some(v => isPredicateCallback(v) ? v(source) : source === v);
}
