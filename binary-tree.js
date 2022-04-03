/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(root = this.root) {
    if (root === null) return 0;

    let depth = 1;

    if (root.left && !root.right) {
      depth += this.minDepth(root.left);
    }
    else if (!root.left && root.right) {
      depth += this.minDepth(root.right);
    }
    else if (root.left && root.right) {
      if (this.minDepth(root.left) < this.minDepth(root.right)) {
        depth += this.minDepth(root.left)
      }
      else depth += this.minDepth(root.right)
    }
    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(root = this.root) {
    if (root === null) return 0;

    let depth = 1;

    if (root.left && !root.right) {
      depth += this.maxDepth(root.left);
    }
    else if (!root.left && root.right) {
      depth += this.maxDepth(root.right);
    }
    else if (root.left && root.right) {
      if (this.maxDepth(root.left) > this.maxDepth(root.right)) {
        depth += this.maxDepth(root.left)
      }
      else depth += this.maxDepth(root.right)
    }
    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }
    
    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root == null) return null;
    let result = null;

    let toVisitQueue = [this.root];
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      if (current != null) {
          toVisitQueue.push(current.left);
          toVisitQueue.push(current.right);

        if (current.val > lowerBound) {
            if (result == null) {
                result = current.val;
            }
            else if (current.val < result) {
                result = current.val
            }
          }
      }
    }
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(nodeToFind,currentNode,level = 0, data = { level: 0, parent: null }) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel = node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents = node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode = this.root) {
    if (currentNode === null) return null;
    if (node1 === currentNode || node2 === currentNode) return currentNode;

    const left = this.lowestCommonAncestor(node1, node2, currentNode.left)
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right)

    if (left == null && right == null) return null;
    if (left != null && right != null) return currentNode;
    if (left != null || right != null) return left || right;
  }
}


module.exports = { BinaryTree, BinaryTreeNode };
