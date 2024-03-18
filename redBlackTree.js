const chalk = require('chalk');

const TreeNode = require('./treeNode');
const { COLOR } = require('./constants');
class RedBlackTree {
  constructor() {
    this.rootNode = null;
  }

  insert(value) {
    this.rootNode = this.#insertRecursive(this.rootNode, value);
    this.rootNode.color = COLOR.BLACK;
  }

  printTree() {
    this.#printTreeRecursive(this.rootNode, "", true);
  }

  #insertRecursive(node, value) {
    if (node === null) {
      return new TreeNode(value, COLOR.RED);
    }
    this.#insertTheNodeInTheProperPosition(node, value);
    return this.#balanceTheTreeAfterInsertingANewNode(node);
  }

  #insertTheNodeInTheProperPosition(node, value) {
    if (value <= node.value) {
      node.leftChild = this.#insertRecursive(node.leftChild, value);
    }
    else {
      node.rightChild = this.#insertRecursive(node.rightChild, value);
    }
  }

  #balanceTheTreeAfterInsertingANewNode(node) {
    if (this.#isRed(node.rightChild) && !this.#isRed(node.leftChild)) {
      node = this.#rotateLeft(node);
    }
    if (this.#isRed(node.leftChild) && this.#isRed(node.leftChild.leftChild)) {
      node = this.#rotateRight(node);
    }
    if (this.#isRed(node.leftChild) && this.#isRed(node.rightChild)) {
      this.#flipColors(node);
    }
    return node;
  }

  #isRed(node) {
    return node !== null && node.color === COLOR.RED;
  }

  #rotateLeft(node) {
    let rightChildNode = node.rightChild;
    node.rightChild = rightChildNode.leftChild;
    rightChildNode.leftChild = node;
    rightChildNode.color = node.color;
    node.color = COLOR.RED;
    return rightChildNode;
  }

  #rotateRight(node) {
    let leftChildNode = node.leftChild;
    node.leftChild = leftChildNode.rightChild;
    leftChildNode.rightChild = node;
    leftChildNode.color = node.color;
    node.color = COLOR.RED;
    return leftChildNode;
  }

  #flipColors(node) {
    node.color = COLOR.RED;
    node.leftChild.color = COLOR.BLACK;
    node.rightChild.color = COLOR.BLACK;
  }

  #printTreeRecursive(node, prefix, isTail) {
    if (node !== null) {
      console.log(`${prefix}${isTail ? '└── ' : '├── '}${this.#nodeToString(node)}`);
      const childPrefix = prefix + (isTail ? '    ' : '│   ');
      this.#printTreeRecursive(node.leftChild, childPrefix, false);
      this.#printTreeRecursive(node.rightChild, childPrefix, true);
    }
  }

  #nodeToString(node) {
    const color = node.color === COLOR.RED ? chalk.red(node.value) : chalk.black(node.value);
    return color;
  }
  inOrderTraversal(node = this.rootNode) {
    if (node === null) {
      return [];
    }
    return [
      ...this.inOrderTraversal(node.leftChild),
      node.value,
      ...this.inOrderTraversal(node.rightChild)
    ];
  }

  delete(value) {
    this.rootNode = this.#deleteRecursive(this.rootNode, value);
  }

  #deleteRecursive(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.leftChild = this.#deleteRecursive(node.leftChild, value);
    } else if (value > node.value) {
      node.rightChild = this.#deleteRecursive(node.rightChild, value);
    } else {
      if (node.leftChild === null) {
        return node.rightChild;
      } else if (node.rightChild === null) {
        return node.leftChild;
      }

      const minNode = this.#findMinNode(node.rightChild);
      node.value = minNode.value;
      node.rightChild = this.#deleteRecursive(node.rightChild, minNode.value);
    }

    return node;
  }
  #findMinNode(node) {
    while (node.leftChild !== null) {
      node = node.leftChild;
    }
    return node;
  }
}

module.exports = RedBlackTree;