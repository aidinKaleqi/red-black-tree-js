const RedBlackTree = require('./redBlackTree');

// Create a new Red-Black Tree instance
const redBlackTree = new RedBlackTree();

// Insert some values into the tree
redBlackTree.insert(10);
redBlackTree.insert(20);
redBlackTree.insert(30);
redBlackTree.insert(15);
redBlackTree.insert(25);

// Print the tree structure
console.log("Red-Black Tree Structure:");
redBlackTree.printTree();
