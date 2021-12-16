import { isUrl } from "./validate";

export interface UrlSplit {
  root: string,
  querys: {
    [index: string]: string
  }
}

export function urlSplit(url: string): UrlSplit {
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

      if(querySplit.length === 2) {
        split.querys[querySplit[0]] = querySplit[1];
      }
    }
  } else {
    split.root = url;
  }

  return split;
}
