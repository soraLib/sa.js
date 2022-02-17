export type PredicateCallback<T> = (value: T) => unknown;

export type PickObject<T extends Object, D extends Object> = Pick<T, keyof D extends keyof T ? keyof D : keyof Partial<T>>;

/** deep partial */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;

/** Constructs a type by picking restricted object value */
export type PickRestrictedObject<T extends object, R extends unknown> = Pick<T, {[P in keyof T]: T[P] extends R ? P : never }[keyof T]>;



/**
 * pick union type
 * 
 * @example
 * 
 * PickUnion<{ a: number, b: string }, 'a' | 'b'>
 * 
 * // => { a: number } | { b: string }
 */
export type PickUnion<T, K extends keyof T> = K extends K ? { [P in K]: T[P] } : never;


export type AddStringPrefix<T, P extends string> = `${P}${Capitalize<T extends string ? T : never>}`;

/**
 * add prefix
 * 
 * @example
 * 
 * AddPrefix<{ ob: string, cb: number }, 'My'>
 * 
 * // => { MyOb: string, MyCb: number }
 * 
 * AddPrefix<'func', 'My'>
 * 
 * // => 'MyFunc'
 */
export type AddPrefix<T, D extends string> = T extends object
  ? {
      [P in keyof T as AddStringPrefix<P, D>]: T[P];
    }
  : AddStringPrefix<T, D>;
