/** is web url */
export function isUrl(url: string) {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;

  return reg.test(url);
}

/** is in lower case */
export function isLowerCase(value: string) {
  const reg = /^[a-z]+$/;

  return reg.test(value);
}

/** is in upper case */
export function isUpperCase(value: string) {
  const reg = /^[A-Z]+$/;

  return reg.test(value);
}

/** is start with upper case */
export function startWidthUpperCase(value: string) {
  const reg = /^[A-Za-z]+$/;

  return reg.test(value);
}


/** is array */
export function isArray<T>(value: T) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  return Array.isArray(value);
}

/** is phone number */
export function isPhone(value: string): boolean;
/** is phone number */
export function isPhone(value: number): boolean;
/** is phone number */
export function isPhone(value: string | number): boolean;
/** is phone number */
export function isPhone(value: string | number) {
  const reg = /^1\d{10}$/;

  return reg.test(String(value));
}

/** is ID card number*/
export function isIdCard(value: number): boolean;
/** is ID card number*/
export function isIdCard(value: string): boolean;
/** is ID card number*/
export function isIdCard(value: number | string): boolean;
/** is ID card number*/
export function isIdCard(value: number | string) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

  return reg.test(String(value));
}

/**
 * is email
 */
export function isEmail(value: string) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  return reg.test(value);
}

/** is blank */
export function isBlank(value: string) {
  return (
    value == null ||
    false ||
    value === '' ||
    value.trim() === '' ||
    value.toLocaleLowerCase().trim() === 'null'
  );
}

/** is json */
export function isJson(value: string): boolean {
  if (typeof value == 'string') {
    try {
      const obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  return false;
}
