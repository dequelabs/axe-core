/**
 * Appends a child node to a parent node in a serial virtual tree.
 * If the child is not an instance of `axe.SerialVirtualNode`, it will be converted to one.
 * @param {axe.SerialVirtualNode} parent - The parent node to append the child to.
 * @param {axe.SerialVirtualNode|any} child - The child node to append.
 * @returns {axe.SerialVirtualNode} The appended child node.
 */
const appendSerialChild = function appendSerialChild(parent, child) {
  if (child instanceof axe.SerialVirtualNode === false) {
    child = new axe.SerialVirtualNode(child);
  }
  child.parent = parent;
  parent.children ??= [];
  parent.children.push(child);
  return child;
};

module.exports = { appendSerialChild };
