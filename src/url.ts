export interface UrlSplit {
  root: string;
  querys: {
    [index: string]: string;
  };
}

export namespace Url {
  /** split url's root path and querys */
  export function split(url: string): UrlSplit {
    const split: UrlSplit = {
      root: '',
      querys: {}
    };

    if (url.includes('?')) {
      const match = url.match(/(.+?)\?(.+)/)!;
      split.root = match[1];
      const queryPath = match[2];

      for (const query of queryPath.split('&')) {
        const querySplit = query.split('=');

        if (querySplit.length === 2) {
          split.querys[querySplit[0]] = querySplit[1];
        }
      }
    } else {
      split.root = url;
    }

    return split;
  }

  /** compose root into url */
  export function compose(split: Pick<UrlSplit, 'root'>): string;
  /** compose querys into url */
  export function compose(split: Pick<UrlSplit, 'querys'>): string;
  /** compose root path and querys into url */
  export function compose(split: UrlSplit): string;
  /** compose root path and querys into url */
  export function compose(split: Partial<UrlSplit>) {
    const root = split.root ?? '';
    const querys = split.querys ? Object.entries(split.querys).map(([key, value]) => `${key}=${value}`).join('') : '';

    return `${root}${(!split.querys || !split.root) ? '' : '?'}${querys}`
  }
}
