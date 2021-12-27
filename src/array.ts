import { isArray } from "./validate";
import { PredicateCallback } from "./types";

export namespace Array {
  /** remove the elements that meet the condition specified in a callback function */
  export function remove<T>(array: T[], predicate: PredicateCallback<T>): T[];
  /** remove the elements from given start location */
  export function remove<T>(array: T[], index: number, length?: number): T[];
  /** remove the elements of given index array */
  export function remove<T>(array: T[], indexs: number[]): T[];
  /** remove elements in array */
  export function remove<T>(arr: T[], arg1: PredicateCallback<T> | number | number[], arg2 = 1): T[] {
    if (typeof arg1 === 'function') {
      return arr.filter(item => !arg1(item));
    } 

    if (isArray(arg1)) {
      const indexs = [...arg1].sort((a, b) => a - b);
      while(indexs.length) {
        const index = indexs.pop()!;
        arr.splice(index, 1);
      }

      return arr;
    }

    arr.splice(arg1, arg2);

    return arr;
  }

  function swapHelper<T>(array: T[], idx1: number, idx2: number): T[] {
    if(idx1 < 0 || idx1 >= array.length || idx2 < 0 || idx2 >= array.length) return array;

    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;

    return array;
  }

  /** swap two element in array by given index */
  export function swap<T>(array: T[], idx1: number, idx2: number): T[];
  /** swap two element that meet the condition specified in a callback function in array */
  export function swap<T, P extends PredicateCallback<T>>(array: T[], pred1: P, pred2: P): T[];
  /** swap two element in array */
  export function swap<T, P extends number | PredicateCallback<T>>(array: T[], arg1: P, arg2: P): T[] {
    if(typeof arg1 === 'number' && typeof arg2 === 'number') {
      return swapHelper(array, arg1, arg2)
    }

    if(typeof arg1 === 'function' && typeof arg2 === 'function') {
      const idx1 = array.findIndex(item => arg1(item));
      const idx2 = array.findIndex(item => arg2(item));

      return swapHelper(array, idx1, idx2)
    }

    return array;
  }
}
