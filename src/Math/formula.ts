/** 
 * factorial `n!`
 * 
 * @example
 * 
 * factorial(3)
 * // => 3 * 2 * 1 = 6
 */
export function factorial(n: number): number;
export function factorial(n: number) {
  if(n <= 0) return 1;

  return n * factorial(n - 1);
};

/**
 * count permutations `P(n,k) n <= k`
 * 
 * @example
 * 
 * permutations(3, 2)
 * // => 3! / (3 - 2)! = 6
 */
export function permutations(n: number, k: number): number;
export function permutations(n: number, k: number) {
  if(k > n) k = n;
  return factorial(n) / factorial(n - k);
}

/**
 * count combinations `C(n,k) n <= k`
 * 
 * @example
 * 
 * combinations(3, 2)
 * // => 3! / (2! * (3 - 2)!) = 3
 */
export function combinations(n: number, k: number): number;
export function combinations(n: number, k: number) {
  if(k > n) k = n;
  return factorial(n) / (factorial(k) * factorial(n - k));
};