import { urlSplit } from './url';

describe('url split', () => {
  it('split full url', () => {
    const split = urlSplit('/root?name=sora&age=18');

    expect(split).toEqual({ root: '/root', querys: { name: 'sora', age: '18' }});
  });

  it('split url without querys', () => {
    const split = urlSplit('/root');

    expect(split).toEqual({ root: '/root', querys: {}});
  });

  it('split url with illegal query', () => {
    const split = urlSplit('/root?name=sora&age12318');

    expect(split).toEqual({ root: '/root', querys: { name: 'sora' }});
  });
});
