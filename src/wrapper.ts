/**
 * splice xml helper
 * @example 
 * 
 * new Wrapper("inner content").wrap('ctrl', { id: 20, name: "sora"}) 
 * 
 * // => `<ctrl id="20" name="sora">inner content</ctrl>`
 */
export class Wrapper {
  private _xml: string;

  constructor(xml?: string | number) {
    this._xml = String(xml ?? '');
  }

  wrap(xml: string | number, attrs = {}) {
    const _str = generateAttributesString(attrs);
    this._xml = `<${xml}${_str}>${this._xml}</${xml}>`;

    return this;
  }

  append(xml: string | number, attrs = {}, content = '') {
    const _str = generateAttributesString(attrs);
    this._xml += `<${xml}${_str}>${content ?? ''}</${xml}>`;

    return this;
  }

  value() {
    return this._xml;
  }

  valueOf() {
    return this._xml;
  }

  toString() {
    return this._xml;
  }
}

function generateAttributesString(attrs: {}) {
  let str = '';

  for (const [key, value] of Object.entries(attrs)) {
    // Adds attr directly when value is null.
    str += value === null ? ` ${key}` : ` ${key}="${value ?? ''}"`;
  }

  return str;
}
