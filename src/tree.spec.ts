import { findNode, findTreeNode, removeTreeNode } from './tree';

describe('Tree', () => {
  it('find tree node test', () => {
    const tree = [{
      id: 1,
      children: [{
        id: 2
      }, {
        id: 3
      }]
    }, {
      id: 5,
    }];

    expect(findTreeNode(tree, node => node.id === 3)?.id).toBe(3);
    expect(findTreeNode(tree, node => node.id === 5)?.id).toBe(5);
    expect(findTreeNode(tree, 'id', 3)?.id).toBe(3);
    expect(findTreeNode(tree, 'id', 5)?.id).toBe(5);
    expect(findTreeNode(tree, node => node.id === 4)?.id).toBe(undefined);
    expect(findTreeNode(tree, 'id', 4)?.id).toBe(undefined);
  });

  it('find node test', () => {
    const node = {
      id: 1,
      children: [{
        id: 2
      }, {
        id: 3
      }]
    };

    expect(findNode(node, n => n.id === 3)?.id).toBe(3);
    expect(findNode(node, 'id', 3)?.id).toBe(3);
    expect(findNode(node, n => n.id === 4)?.id).toBe(undefined);
    expect(findNode(node, 'id', 4)?.id).toBe(undefined);
  });

  it('remove tree node test', () => {
    const tree = [{
      id: 1,
      children: [{
        id: 2
      }, {
        id: 3
      }]
    }, {
      id: 5,
    }];

    expect(removeTreeNode(tree, n => n.id === 3)?.id).toBe(3);
    expect(tree).toEqual([{
      id: 1,
      children: [{
        id: 2
      }]
    }, {
      id: 5,
    }]);

    expect(removeTreeNode(tree, 'id', 5)?.id).toBe(5);
    expect(removeTreeNode(tree, 'id', 6)?.id).toBe(undefined);
  });
});
