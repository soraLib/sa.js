

/** 
 * create function that excute in delay 
 *
 * @example
 * 
 * const delay = createDelayFunction((a: number, b: number) => a + b, 1, 2);
 * delay();
 * 
 * // => 3
 */
export function createDelayFunction<T extends (...args: any[]) => any>(callback: T, ...params: Parameters<T>): () => ReturnType<T> {
  const _parameters = params;

  return () => {
    return callback.call(callback, ..._parameters);
  }
}