import createGrid from './create-grid';
/**
 * Visually sort nodes based on their stack order
 * References:
 * https://www.w3.org/Style/css2-updates/css2/zindex.html
 * @param {VirtualNode}
 * @param {VirtualNode}
 */
export default function visuallySort(a, b) {
  /*eslint no-bitwise: 0 */
  createGrid(); // Because we need ._stackingOrder
  const length = Math.max(a._stackingOrder.length, b._stackingOrder.length);

  for (let i = 0; i < length; i++) {
    if (typeof b._stackingOrder[i] === 'undefined') {
      return -1;
    } else if (typeof a._stackingOrder[i] === 'undefined') {
      return 1;
    }

    // 7. the child stacking contexts with positive stack levels (least positive first).
    if (b._stackingOrder[i] > a._stackingOrder[i]) {
      return 1;
    }

    // 2. the child stacking contexts with negative stack levels (most negative first).
    if (b._stackingOrder[i] < a._stackingOrder[i]) {
      return -1;
    }
  }

  // nodes are the same stacking order
  let aNode = a.actualNode;
  let bNode = b.actualNode;

  // elements don't correctly calculate document position when comparing
  // across shadow boundaries, so we need to compare the position of a
  // shared host instead

  // elements have different hosts
  if (aNode.getRootNode && aNode.getRootNode() !== bNode.getRootNode()) {
    // keep track of all parent hosts and find the one both nodes share
    const boundaries = [];
    while (aNode) {
      boundaries.push({
        root: aNode.getRootNode(),
        node: aNode
      });
      aNode = aNode.getRootNode().host;
    }

    while (
      bNode &&
      !boundaries.find(boundary => boundary.root === bNode.getRootNode())
    ) {
      bNode = bNode.getRootNode().host;
    }

    // bNode is a node that shares a host with some part of the a parent
    // shadow tree, find the aNode that shares the same host as bNode
    aNode = boundaries.find(
      boundary => boundary.root === bNode.getRootNode()
    ).node;

    // sort child of shadow to it's host node by finding which element is
    // the child of the host and sorting it before the host
    if (aNode === bNode) {
      return a.actualNode.getRootNode() !== aNode.getRootNode() ? -1 : 1;
    }
  }

  const {
    DOCUMENT_POSITION_FOLLOWING,
    DOCUMENT_POSITION_CONTAINS,
    DOCUMENT_POSITION_CONTAINED_BY
  } = window.Node;

  const docPosition = aNode.compareDocumentPosition(bNode);
  const DOMOrder = docPosition & DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
  const isDescendant =
    docPosition & DOCUMENT_POSITION_CONTAINS ||
    docPosition & DOCUMENT_POSITION_CONTAINED_BY;
  const aPosition = getPositionOrder(a);
  const bPosition = getPositionOrder(b);

  // a child of a positioned element should also be on top of the parent
  if (aPosition === bPosition || isDescendant) {
    return DOMOrder;
  }
  return bPosition - aPosition;
}

/**
 * Return the index order of how to position this element. return nodes in non-positioned, floating, positioned order
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_and_float
 * https://www.w3.org/Style/css2-updates/css2/zindex.html
 * @param {VirtualNode} vNode
 * @return {Number}
 */
function getPositionOrder(vNode) {
  // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
  if (vNode.getComputedStylePropertyValue('display').indexOf('inline') !== -1) {
    return 2;
  }
  // 4. the non-positioned floats.
  if (isFloated(vNode)) {
    return 1;
  }
  // 3. the in-flow, non-inline-level, non-positioned descendants.
  return 0;
}

/**
 * Check if a node or one of it's parents is floated.
 * Floating position should be inherited from the parent tree
 * @see https://github.com/dequelabs/axe-core/issues/2222
 */
function isFloated(vNode) {
  if (!vNode) {
    return false;
  }

  if (vNode._isFloated !== undefined) {
    return vNode._isFloated;
  }

  const floatStyle = vNode.getComputedStylePropertyValue('float');

  if (floatStyle !== 'none') {
    vNode._isFloated = true;
    return true;
  }

  const floated = isFloated(vNode.parent);
  vNode._isFloated = floated;
  return floated;
}
