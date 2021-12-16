export namespace Arrays {
  export function remove<T>(array: T[], predicate: (value: T) => unknown): T[];
  export function remove<T>(array: T[], index: number, length?: number): T[];
  export function remove<T>(arr: T[], arg1: ((value: T) => unknown) | number, arg2 = 1): T[] {
    if (typeof arg1 === 'function') {
      return arr.filter(item => !arg1(item));
    }

    arr.splice(arg1, arg2);

    return arr;
  }
}
