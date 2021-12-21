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
  export function remove<T>(arr: T[], arg1: ((value: T) => unknown) | number | number[], arg2 = 1): T[] {
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
}
