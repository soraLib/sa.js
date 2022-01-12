import { PickObject } from "./types";

import { cloneDeep, isEqual } from "lodash-es";

type ObjectLike = {
  [key: string]: unknown;
}

/** get diff */
export function diff<T extends ObjectLike, D extends ObjectLike>(source: T, other: D): PickObject<T, D> {
  const patch = <PickObject<T, D>>{};

  for(const key in other) {
    if(!isEqual(Reflect.get(other, key), Reflect.get(source, key))) {
      Reflect.set(patch, key, other[key]);
    }
  }

  return patch;
}

/** From source, pick whose keys are existed in props' keys */
export function pickDiffPatch<T extends ObjectLike, D extends ObjectLike>(source: T, props: D): PickObject<T, D> {
  const patchProps = <PickObject<T, D>>{};

  for(const key in props) {
    if(Reflect.has(source, key)) {
      Reflect.set(patchProps, key, source[key]);
    }
  }

  return patchProps;
}

/** create diff patch */
export function createDiffPatch<T extends ObjectLike, D extends ObjectLike>(source: T, other: D) {
  const diffProps = diff(source, other);

  return pickDiffPatch(other, diffProps);
}

/**
 * Get diff patch between source and snapshot.
 * 
 * @example
 * 
 * const source = { a: 1, b: 2 };
 * const snapshot = new Snapshot(source);
 * source.a = 3;
 * snapshot.getDiffPatch();
 * // => { a: 3 }
 */
export class Snapshot<T extends ObjectLike> {
  private _source: T;
  private _snapshots: T[];
  private _index: number;

  constructor(source: T) {
    this._source = source;
    this._snapshots = [];
    this._index = -1;
    this.takeSnapshot();
  }

  /** push new snaphsot */
  takeSnapshot() {
    this._snapshots.push(cloneDeep(this._source));
    this._index += 1;

    return this;
  }

  /** get diff patch between latest source and snapshot */
  getDiffPatch(source = this._snapshots[this._index], other = this._source) {
    return createDiffPatch(source, other);
  }
}
