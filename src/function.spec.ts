import { createDelayFunction } from './function';

describe('Function', () => {
  it('delay test', () => {
    const delay = createDelayFunction((a: number, b: number) => a + b, 1, 2);

    expect(delay()).toBe(3);
  });

  it('delay class function test', () => {
    class Math {
      number = 0;

      sum(a: number, b: number) {
        this.number = a + b;

        return this.number;
      }
    }

    const delay = createDelayFunction(new Math().sum, 1, 2);

    expect(delay()).toBe(3);
  });
});
