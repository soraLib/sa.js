
type PickFunctionKey<T extends object, K extends keyof T = keyof T> = K extends any ? T[K] extends Function ? K : never : never;

type ChainFunctionObject<T extends object> = Pick<T, PickFunctionKey<T>>;

export type ChainedObject<T extends ChainFunctionObject<T>> = {
  [key in keyof T]: (...p: Parameters<T[key]>) => T;
};

/**
 * create chain with functions return source.
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
  const chainedSource = {} as ChainedObject<ChainFunctionObject<T>>;

  const proto = Object.getPrototypeOf(source);

  let combinedSource: T = source;

  if(proto) {
    for(let key of Object.getOwnPropertyNames(proto)) {
      Reflect.set(combinedSource, key, proto[key]);
    }
  }

  for(const [key, value] of Object.entries(combinedSource)) {
    if(typeof value === 'function' && source?.constructor !== value) {
      const chainHeler = createChainHelper(combinedSource, value);

      Reflect.set(chainedSource, key, chainHeler);
    }
  }

  return chainedSource;
}

function createChainHelper(source: object, func: (...args: unknown[]) => unknown) {
  return (...args: unknown[]) => {
    func.call(source, ...args);

    return source;
  }
}