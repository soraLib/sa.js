import { isArray, isEmail, isIdCard, isJson, isLowerCase, isPhone, isStartWithUpperCase, isUpperCase, isUrl } from '.';

describe('validate', () => {
  it('is url test', () => {
    expect(isUrl('strange url')).toBe(false);
    expect(isUrl('http://www.test.com')).toBe(true);
  });

  it('is lower case test', () => {
    expect(isLowerCase('Hfutsora')).toBe(false);
    expect(isLowerCase('hfutsora')).toBe(true);
  });

  it('is upper case test', () => {
    expect(isUpperCase('Hfutsora')).toBe(false);
    expect(isUpperCase('HFUTSORA')).toBe(true);
  });

  it('is start width upper case test', () => {
    expect(isStartWithUpperCase('hfutsora')).toBe(false);
    expect(isStartWithUpperCase('')).toBe(false);
    expect(isStartWithUpperCase('Hfutsora')).toBe(true);
  });

  it('is array test', () => {
    expect(isArray('Hfutsora')).toBe(false);
    expect(isArray(123)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(['Hfutsora'])).toBe(true);
    Array.isArray = undefined as any;
    expect(isArray(['Hfutsora'])).toBe(true);
  });

  it('is phone test', () => {
    expect(isPhone('hfutsora')).toBe(false);
    expect(isPhone('15155118910')).toBe(true);
    expect(isPhone(15155118910)).toBe(true);
  });

  it('is ID card test', () => {
    expect(isIdCard('hfutsora')).toBe(false);
    expect(isIdCard('342319199611100031')).toBe(true);
    expect(isIdCard(342319199611100031)).toBe(true);
  });

  it('is email test', () => {
    expect(isEmail('hfutsora')).toBe(false);
    expect(isEmail('346762712@qq.com')).toBe(true);
  });

  it('is json test', () => {
    expect(isJson('hfutsora')).toBe(false);
    expect(isJson(123)).toBe(false);
    expect(isJson('null')).toBe(false);
    expect(isJson('{"name":1}')).toBe(true);
  });
});
