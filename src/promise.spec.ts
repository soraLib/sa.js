import { promiseAll } from './promise';

describe('Promise', () => {
  it('promise empty test', async () => {
    const results = await promiseAll([]);

    expect(results).toEqual([]);
  });

  it('promise all test', async () => {
    const tasks = [
      () => 1,
      () => new Promise<number>((resolve) => setTimeout(() => resolve(2), 1000))
    ];

    const results = await promiseAll(tasks);

    expect(results).toEqual([1, 2]);
  });

  it('promise all with retry test', async () => {
    let times = 0;

    const results = await promiseAll([ 
      () => 1,
      () => new Promise<number>((resolve) => setTimeout(() => resolve(2), 1000)),
      () => new Promise<string>((resolve, reject) => { setTimeout(() => {
        if(times < 2) {
          times += 1;
          reject(times);
        }

        resolve('3');
      }, 1000) })
    ], 3);


    expect(results).toEqual([1, 2, '3']);
  });

  it('promise all over retry times test', async () => {
    let times = 0;

    try {
      await promiseAll([
        () => 1,
        () => new Promise<number>((resolve) => setTimeout(() => resolve(2), 1000)),
        () => new Promise<number>((resolve, reject) => setTimeout(() => {
          if(times < 2) {
            times++;
            reject(times);
          }
  
          resolve(3);
        }, 1000))
      ], 1);
    } catch(err) {
      expect(err).toEqual(times);
    }
  });
});
