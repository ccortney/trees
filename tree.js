/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let toVisitQueue = [this.root];
    let sum = 0;
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      if (current != null) {
        sum += current.val;
        for (let child of current.children) {
          toVisitQueue.push(child)
        }
      }
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let toVisitQueue = [this.root];
    let evenCount = 0;
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      if (current != null) {
        for (let child of current.children) {
          toVisitQueue.push(child)
        }
        if (current.val % 2 == 0) {
          evenCount ++;
        }
      }
    }
    return evenCount;
  }

  // countEvens() {
  //   let toVisitStack = [this.root];
  //   let evenCount = 0;
  //   while (toVisitStack.length) {
  //     let current = toVisitStack.pop();
  //     if (current != null) {
  //       if (current.val % 2 === 0) {
  //         evenCount ++;
  //       }
  //       for (let child of current.children) {
  //         toVisitStack.push(child)
  //       }
  //     }
  //   }
  //   return evenCount;
  // }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let toVisitStack = [this.root];
    let count = 0;
    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      if (current != null) {
        if (current.val > lowerBound) {
          count ++;
        }
        for (let child of current.children) {
          toVisitStack.push(child)
        }
      }
    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
