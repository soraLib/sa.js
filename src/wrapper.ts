/**
 * @description create a Wrapper class to help you splice xml.
 * @param attrs attributes on xml root
 * @param content wrapped inner content
 * @example const xml = new Wrapper("some content").wrap('ctrl', { id: 20, name: "hfutsora"}) then you can get the xml `<ctrl id="20" name="hfutsora">some content</ctrl>`
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
    str += ` ${key}="${value ?? ''}"`;
  }

  return str;
}
