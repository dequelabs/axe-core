import { nodeLookup } from '../../core/utils';

/**
 * Return the document or document fragment (shadow DOM)
 * @method getRootVNodes
 * @memberof axe.commons.dom
 * @instance
 * @param {Element|VirtualNode} node
 * @returns {VirtualNode[]}
 */
export default function getRootVNodes(node) {
  const { vNode } = nodeLookup(node);

  if (vNode._rootNodes) {
    return vNode._rootNodes;
  }

  // top of tree
  if (vNode.parent === null) {
    return [vNode];
  }

  // disconnected tree
  if (!vNode.parent) {
    return undefined;
  }

  // since the virtual tree does not have a #shadowRoot element the root virtual
  // node is the shadow host element. however the shadow host element is not inside
  // the shadow DOM tree so we return the children of the shadow host element in
  // order to not cross shadow DOM boundaries
  if (vNode.shadowId !== vNode.parent.shadowId) {
    return [...vNode.parent.children];
  }

  vNode._rootNodes = getRootVNodes(vNode.parent);
  return vNode._rootNodes;
}
