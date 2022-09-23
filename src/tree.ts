import { PredicateCallback } from "./types";

export type TreeNode = {
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

/** find remove node recursively */
function removeNodeHelper<T extends TreeNode>(node: T, predicate: PredicateCallback<T>, tree: T[], index: number): T | undefined {
  if(predicate(node)) {
    return tree.splice(index, 1)[0];
  }

  if(node.children?.length) {
    for(let i = 0; i < node.children.length; i++) {
      const removeChildNode = removeNodeHelper(<T>node.children[i], predicate, <T[]>node.children, i);

      if(removeChildNode) return removeChildNode;
    }
  }
}

/** remove fisrt node that meet the condition specified in a callback function in tree */
export function removeTreeNode<T extends TreeNode>(tree: T[], predicate: PredicateCallback<T>): T | undefined
/** remove first node in tree by given key and value */
export function removeTreeNode<T extends TreeNode>(tree: T[], key: keyof T, value: T[keyof T]): T | undefined
/** remove first node in tree */
export function removeTreeNode<T extends TreeNode>(tree: T[], arg1: keyof T | PredicateCallback<T>, arg2?: T[keyof T]): T | undefined {
  const predicate = createPredicate(arg1, arg2);

  for(let i = 0; i < tree.length; i++) {
    const removeNode = removeNodeHelper(tree[i], predicate, tree, i);

    if(removeNode) return removeNode;
  }
}

/* DFS use effect with tree node */
export function useTreeNode<T extends TreeNode>(node: T, effect: (node: T) => void): void {
  effect(node);

  if(node.children?.length) {
    for(const child of node.children) {
      useTreeNode(child as T, effect);
    }
  }
}