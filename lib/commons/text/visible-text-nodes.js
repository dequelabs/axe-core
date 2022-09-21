import isVisibleOnScreen from '../dom/is-visible-on-screen';

/**
 * Returns an array of visible text virtual nodes
 *
 * @method visibleTextNodes
 * @memberof axe.commons.text
 * @instance
 * @param {VirtualNode} vNode
 * @return {VitrualNode[]}
 * @deprecated
 */
function visibleTextNodes(vNode) {
  const parentVisible = isVisibleOnScreen(vNode);
  let nodes = [];
  vNode.children.forEach(child => {
    if (child.actualNode.nodeType === 3) {
      if (parentVisible) {
        nodes.push(child);
      }
    } else {
      nodes = nodes.concat(visibleTextNodes(child));
    }
  });
  return nodes;
}

export default visibleTextNodes;
