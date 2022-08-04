import { Wrapper } from './wrapper';

describe('wrapper driver test', () => {
  it('constructor', () => {
    const wrapper = new Wrapper('wrappered content');

    expect(wrapper.value()).toBe('wrappered content');
  });

  it('special value', () => {
    const wrapper = new Wrapper(0).wrap('ctrl');
    const wrapperUndefined = new Wrapper().wrap('ctrl');

    expect(wrapper.value()).toBe('<ctrl>0</ctrl>');
    expect(wrapperUndefined.valueOf()).toBe('<ctrl></ctrl>');

  });

  it('wrap', () => {
    const wrapper = new Wrapper('wrappered content');
    const wapperedXml = wrapper.wrap('p', { id: 1, name: undefined });

    expect(wapperedXml.toString()).toBe('<p id="1" name="">wrappered content</p>');
  });

  it('wrap with null', () => {
    const wrapper = new Wrapper('wrappered content');
    const wapperedXml = wrapper.wrap('temp', { '#header': null });

    expect(wapperedXml.value()).toBe('<temp #header>wrappered content</temp>');
  })

  it('append', () => {
    const wrapper = new Wrapper();
    wrapper.append('p', { id: 1, name: 'sora' }, null!);
    wrapper.append('p');

    expect(wrapper.value()).toBe('<p id="1" name="sora"></p><p></p>');
  });
});
