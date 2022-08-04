import { PickRestrictedObject } from "./types";

export type ChainedObject<T extends PickRestrictedObject<T, Function>> = {
  [key in keyof T]: (...p: Parameters<T[key]>) => ChainedObject<T>;
};

/**
 * Creates a chain with functions.
 * 
 * @example
 * 
 * const chained = chain({ 
 *   count: 1, 
 *   increase(count: number) { this.count += count }, 
 *   decrease(count: number) { this.count -= count }
 * });
 * chained.increase(2).decrease(1);
 * 
 * // => 2
 */
export function chain<T extends object>(source: T) {
  const chainedSource = {} as ChainedObject<PickRestrictedObject<T, Function>>;

  const proto = Object.getPrototypeOf(source);

  let combinedSource: T = source;

  if(proto) {
    for(let key of Object.getOwnPropertyNames(proto)) {
      Reflect.set(combinedSource, key, proto[key]);
    }
  }

  for(const [key, value] of Object.entries(combinedSource)) {
    if(typeof value === 'function' && source?.constructor !== value) {
      const chainHeler = createChainHelper(source, chainedSource, value);

      Reflect.set(chainedSource, key, chainHeler);
    }
  }

  return chainedSource;
}

function createChainHelper(source: object, chain: object, func: (...args: unknown[]) => unknown) {
  return (...args: unknown[]) => {
    func.call(source, ...args);

    return chain;
  }
}