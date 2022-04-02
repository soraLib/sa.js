import { PredicateCallback } from "./types";

type NotFunction<T> = T extends Function ? never : T;
type MOET<T> = PredicateCallback<T> | T;

const isPredicateCallback = <T>(value: unknown) : value is PredicateCallback<T> => typeof value === 'function';


/**
 * return whether or not source is fit for any element of targets.
 * 
 * @example
 * 
 * multiOrEqual(10, num => num > 5, 0);
 * 
 * // => true
 */
export function multiOrEqual<T>(source: NotFunction<T>, ...targets: MOET<T>[]): boolean;
export function multiOrEqual<T>(source: NotFunction<T>, ...targets: MOET<T>[]): boolean {
  return targets.some(v => isPredicateCallback<T>(v) ? v(source) : source === v);
}


/**
 * return whether or not source is fit for every element of targets.
 * 
 * @example
 * 
 * multiAndEqual(10, num => num > 5, 0);
 * 
 * // => false
 */
 export function multiAndEqual<T>(source: NotFunction<T>, ...targets: MOET<T>[]): boolean;
 export function multiAndEqual<T>(source: NotFunction<T>, ...targets: MOET<T>[]): boolean {
   return targets.every(v => isPredicateCallback<T>(v) ? v(source) : source === v);
 }