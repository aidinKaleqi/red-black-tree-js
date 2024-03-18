class TreeNode {
  constructor(value, color) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
    this.color = color;
  }

  toString() {
    return this.color === 'R' ? `\x1b[31m${this.value}\x1b[0m` : this.value;
  }
}

module.exports = TreeNode;