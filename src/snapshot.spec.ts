import { Snapshot } from './snapshot';

describe('Snapshot', () => {
  it('snapshot diff test', () => {
    const source: {[key: string]: any} = { a: 1, b: { d: 4 } };

    const snapshot = new Snapshot(source);
    source.a = 2;
    source.c = 3;
  
    expect(snapshot.getDiffPatch()).toEqual({ a: 2, c: 3 });

    snapshot.takeSnapshot();
    expect(snapshot.getDiffPatch()).toEqual({});

    source.a = 4;
    source.b = { d: 5, e: 6 };
    expect(snapshot.getDiffPatch()).toEqual({ a: 4, b: { d: 5, e: 6 }});
  });
});
