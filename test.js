const { expect } = require('chai');
const RedBlackTree = require('./redBlackTree');

describe('RedBlackTree', () => {
  let redBlackTree;

  beforeEach(() => {
    redBlackTree = new RedBlackTree();
  });

  it('should insert values into the tree and maintain red-black properties', () => {
    redBlackTree.insert(10);
    redBlackTree.insert(20);
    redBlackTree.insert(30);
    redBlackTree.insert(15);
    redBlackTree.insert(25);

    // Assert tree structure
    const expectedInOrderTraversal = [10, 15, 20, 25, 30];
    expect(redBlackTree.inOrderTraversal()).to.deep.equal(expectedInOrderTraversal);
  });

  it('should maintain red-black properties after multiple insertions and deletions', () => {
    redBlackTree.insert(10);
    redBlackTree.insert(20);
    redBlackTree.insert(30);
    redBlackTree.insert(15);
    redBlackTree.insert(25);

    redBlackTree.delete(20); // Delete a node

    // Assert tree structure
    const expectedInOrderTraversal = [10, 15, 25, 30];
    expect(redBlackTree.inOrderTraversal()).to.deep.equal(expectedInOrderTraversal);
  });

  it('should return correct in-order traversal of the tree', () => {
    redBlackTree.insert(10);
    redBlackTree.insert(20);
    redBlackTree.insert(30);
    redBlackTree.insert(15);
    redBlackTree.insert(25);

    const expectedInOrderTraversal = [10, 15, 20, 25, 30];
    expect(redBlackTree.inOrderTraversal()).to.deep.equal(expectedInOrderTraversal);
  });

  it('should handle empty tree gracefully', () => {
    expect(redBlackTree.inOrderTraversal()).to.deep.equal([]);
  });

  it('should handle insertion of duplicate values', () => {
    redBlackTree.insert(10);
    redBlackTree.insert(10);

    const expectedInOrderTraversal = [10, 10];
    expect(redBlackTree.inOrderTraversal()).to.deep.equal(expectedInOrderTraversal);
  });

});
