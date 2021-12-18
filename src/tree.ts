import { PredicateCallback } from "./types";

export type TreeNode = {
  [key: string]: unknown;
  children?: TreeNode[];
}

/** create find tree node predicate callback function */
function createPredicate<T extends TreeNode>(arg1: keyof T | PredicateCallback<T>, arg2?: T[keyof T]) {
  let predicate: PredicateCallback<T>;

  if(typeof arg1 === 'function') {
    predicate = arg1;
  } else {
    predicate = (node: T) => node[arg1] === arg2;
  }

  return predicate;
}

/** find node recursively */
function findNodeHelper<T extends TreeNode>(node: T, predicate: PredicateCallback<T>): T | undefined {
  if(predicate(node)) {
    return node;
  }

  if(node.children?.length) {
    for(const child of node.children) {
      const findChildNode = findNodeHelper(<T>child, predicate);

      if(findChildNode) return findChildNode;
    }
  }
}

/** find node that meet the condition specified in a callback function in tree */
export function findTreeNode<T extends TreeNode>(tree: T[], predicate: PredicateCallback<T>): T | undefined;
/** find node in tree by given key and value */
export function findTreeNode<T extends TreeNode>(tree: T[], key: keyof T, value: T[keyof T]): T | undefined;
/** find node in tree */
export function findTreeNode<T extends TreeNode>(tree: T[], arg1: keyof T | PredicateCallback<T>, arg2?: T[keyof T]): T | undefined {
  const predicate = createPredicate(arg1, arg2);

  for(const node of tree) {
    const findChildNode = findNodeHelper(node, predicate);

    if(findChildNode) return findChildNode;
  }
}

/** find node that meet the condition specified in a callback function in tree node */
export function findNode<T extends TreeNode>(node: T, predicate: PredicateCallback<T>): T | undefined;
/** find node in tree node by given key and value */
export function findNode<T extends TreeNode>(node: T, key: keyof T, value: T[keyof T]): T | undefined;
/** find node in tree node */
export function findNode<T extends TreeNode>(node: T, arg1: keyof T | PredicateCallback<T>, arg2?: T[keyof T]): T | undefined {
  const predicate = createPredicate(arg1, arg2);

  return findNodeHelper(node, predicate);
}
