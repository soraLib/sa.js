import { isArray } from '.';

/** shallow clone */
export function shallowClone<T extends Array<any>>(v: T): T;
/** shallow clone */
export function shallowClone<T extends Object>(v: T): T;
/** shallow clone */
export function shallowClone<T extends any>(v: T): T;
/** shallow clone */
export function shallowClone<T extends any>(v: T): T {
  if (isArray(v)) {
    return <T>[...v];
  }

  if (typeof v === 'object') {
    return Object.assign({}, v);
  }

  return v;
}

/** deep clone recursively */
function deepCloneHelper(v: any): typeof v {
  if (!v) {
    return v; // null, undefined
  }

  for(const type of [Number, String, Boolean]) {
    if (v instanceof type) {
      return new type(v);
    }
  }

  let result: any;

  if (isArray(v)) {
    result = v.map(child => deepCloneHelper(child));
  } else if (typeof v === 'object') {
    // clone DOM
    if (v.nodeType && typeof v.cloneNode == 'function') {
      result = v.cloneNode(true);
    } else if (!v.prototype) {
      if (v instanceof Date) {
        result = new Date(v);
      } else {
        result = {};
        for (const [key, value] of Object.entries(v)) {
          result[key] = deepCloneHelper(value);
        }
      }
    } else {
      result = v;
    }
  } else {
    result = v;
  }

  return result;
}

/** deep clone */
export function deepClone<T extends Array<any>>(v: T): T;
/** deep clone */
export function deepClone<T extends Object>(v: T): T;
/** deep clone */
export function deepClone<T extends any>(v: T): T;
/** deep clone */
export function deepClone<T extends any>(v: T): T {
  return deepCloneHelper(v);
}
