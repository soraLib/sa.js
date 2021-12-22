/** reverse number */
export function revNum(num: number): number;
/** 
 * reverse number 
 * 
 * @example
 * 
 * revNum(1230)
 * // => 321
 */
export function revNum(num: number) {
  let result = 0;
  while(num) {
    result = result * 10 + num % 10;
    num = Math.floor(num / 10);
  }

  return result;
}

/** safe division */
export function safeDiv(a: number, b: number): number;

/** 
 * safe division
 * 
 * @example
 * 
 * safeDiv(100, 0)
 * // => 0
 */
export function safeDiv(a: number, b: number) {
  if(b === 0) return 0;

  return a / b;
};

