export type PredicateCallback<T> = (value: T) => unknown;

export type PickObject<T extends Object, D extends Object> = Pick<T, keyof D extends keyof T ? keyof D : keyof Partial<T>>;

/** deep partial */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;

/** Constructs a type by picking restricted object value */
export type PickRestrictedObject<T extends object, R extends unknown> = Pick<T, {[P in keyof T]: T[P] extends R ? P : never }[keyof T]>;
