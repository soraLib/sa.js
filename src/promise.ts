type FunctionReturnType<T> = T extends () => infer R ? R : never;
type PromiseArrayValues<T extends readonly (() => unknown)[] | []> = T extends readonly (() => unknown)[] ? { -readonly [P in keyof T]: Awaited<FunctionReturnType<T[P]>> } : never;

/**
 * promise all with each task could retry in multiple times.
 * 
 * @example
 * 
 * promiseAll([() => 1, () => new Promise((resolve) => resolve(2))], 2);
 * 
 * // => [1, 2]
 */
export async function promiseAll<T extends ((readonly (() => unknown)[]) | [])>(tasks: T,　retry?: number): Promise<PromiseArrayValues<T>>;
/**
 * promise all with each task could retry in multiple times.
 * 
 * @example
 * 
 * promiseAll([() => 1, () => new Promise((resolve) => resolve(2))], () => true);
 * 
 * // => [1, 2]
 */
export async function promiseAll<T extends ((readonly (() => unknown)[]) | [])>(tasks: T, predicate: () => unknown): Promise<PromiseArrayValues<T>>;
export async function promiseAll<T extends ((readonly (() => unknown)[]) | [])>(tasks: T,　retry?: number | (() => unknown)): Promise<PromiseArrayValues<T>> {
  return new Promise((resolve, reject) => {
    const promiseResults: PromiseArrayValues<T> = <any>[];
    let iteratorIndex = 0;
    let fullCount = 0;

    for (const task of tasks) {
      let resultIndex = iteratorIndex;
      iteratorIndex += 1;
      let retryTimes = 0;

      promiseTask(task);

      function promiseTask<T extends () => unknown>(task: T) {
        Promise.resolve(task())
          .then(res => {
            promiseResults[resultIndex] = res;
            fullCount += 1;

            if (fullCount === iteratorIndex) {
              promiseResults.length = fullCount;
              resolve(promiseResults);
            }
          })
          .catch(err => {
            if(retry) {
              if(typeof retry === 'number') {
                if (retryTimes < retry) {
                  retryTimes += 1;
                  promiseTask(task);
                } else {
                  reject(err);
                }
              } else {
                if(retry()) {
                  promiseTask(task);
                } else {
                  reject(err);
                }
              }
            } else {
              reject(err);
            }
          });
      }
    }

    if(iteratorIndex === 0) resolve(promiseResults);
  });
}