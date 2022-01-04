import { chain } from './chain';

describe('Chain', () => {
  it('chain test', () => {
    const source = {
      count: 1,
      increase(count?: number) {
        return this.count += (count ?? 1);
      },
      decrease(count?: number) {
        this.count -= (count ?? 1);
      },
    }

    const chainedSource = chain(source);
    chainedSource.increase();
    expect(source.count).toBe(2);

    chainedSource.decrease(2);
    expect(source.count).toBe(0);

    chainedSource.increase(4).decrease(1);
    expect(source.count).toBe(3);
  });

  it('chain class test', () => {
    class Count {
      count: number;
      constructor(count: number) { 
        this.count = count;
      }
      increase(count?: number) {
        this.count += (count ?? 1);
      }
      decrease(count?: number) {
        this.count -= (count ?? 1);
      }
    }

    const source = new Count(1);

    const chainedSouce = chain(source);
    chainedSouce.decrease(1).increase(1).increase(2).decrease(2).increase(1);

    expect(source.count).toBe(2);
  })
});
