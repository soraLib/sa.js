import { UrlSplit } from './url';
import { Url } from './url';

describe('url split', () => {
  it('split full url', () => {
    const split = Url.split('/root?name=sora&age=18');

    expect(split).toEqual({ root: '/root', querys: { name: 'sora', age: '18' }});
  });

  it('split url without querys', () => {
    const split = Url.split('/root');

    expect(split).toEqual({ root: '/root', querys: {}});
  });

  it('split url with illegal query', () => {
    const split = Url.split('/root?name=sora&age12318');

    expect(split).toEqual({ root: '/root', querys: { name: 'sora' }});
  });

  it('compose root', () => {
    const split = { root: '/root' };

    expect(Url.compose(split)).toBe('/root');
  });

  it('compose querys', () => {
    const split = { querys: { name: 'sora' } };

    expect(Url.compose(split)).toBe('name=sora');
  });

  it('compose root and querys', () => {
    const split = { root: '/root', querys: { name: 'sora', age: 18 } };

    expect(Url.compose(split)).toBe('/root?name=sora&age=18');
    expect(Url.compose(split, '#')).toBe('/root?name=sora#age=18');
  });

  it('compose width empty split', () => {
    const split = {} as unknown as UrlSplit;

    expect(Url.compose(split)).toBe('');
  });
});
