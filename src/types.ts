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


/**
 * partial with optional
 * 
 * @example
 * 
 * PartialOptional<{ a: string; b: number }, 'a'>
 * 
 * // => { a?: string; b: number }
 */
export type PartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ObjectLike = { [key: string]: unknown }
export type Values<T> = T[keyof T]
type UnionToFn<T> = (
  T extends unknown ? (k: () => T) => void : never
  ) extends((k: infer R) => void) ? R : never

export type UnionToTuple<T, P extends any[] = []> = UnionToFn<T> extends () => infer R ? Exclude<T, R> extends never ? [...P, R] : UnionToTuple<Exclude<T, R>, [...P, R]> : never;

/**
 * @internal
 */
type ObjectTuple<T extends ObjectLike, K extends (keyof T)[]> =
  K extends [infer First, ...infer Rest] ?
    First extends keyof T ?
      K['length'] extends 1 ? [{ [key in First]: T[First] }] :
        Rest extends (keyof T)[] ? [...ObjectTuple<T, Rest>, { [key in First]: T[First] }] : never
    : never
  : never


/**
 * split a `ObjectLike` into array.
 * 
 * @example
 */
export type SplitObject<T extends ObjectLike> =
  UnionToTuple<keyof T> extends (keyof T)[] ?
    ObjectTuple<T, UnionToTuple<keyof T>>
    : never


type Copy<T> = { [P in keyof T]: T[P] }

export type DeepAssignWith<T, U extends unknown[]> = T extends ObjectLike
  ? U extends [infer First, ...infer Rest]
    ? Values<First> extends ObjectLike
      ? keyof First extends keyof T 
        ? Copy<
            DeepAssignWith<Omit<T, keyof First> &
              {
                [key in keyof First]: DeepAssign<Values<Pick<T, keyof First>>, Values<First>>
              }
            , Rest>
          >
        : never
      : Copy<DeepAssignWith<Omit<T, keyof First> & First, Rest>>
    : T
  : never

export type DeepAssign<A, B> = A extends ObjectLike ? B extends ObjectLike ? DeepAssignWith<A, SplitObject<B>> : A : never


type User = {
  name: string
  age: number
}

declare function fn(u: User | SplitObject<User>[number])


fn({ age: 1 })
fn({ name: 'sora' })
fn({ age: 1, name: 'sora' })