import { nodeLookup } from '../../core/utils';
import cache from '../../core/base/cache';

/**
 * Return the child virtual nodes of the root node
 * @method getRootChildren
 * @memberof axe.commons.dom
 * @instance
 * @param {Element|VirtualNode} node
 * @returns {VirtualNode[]|undefined}
 */
export default function getRootChildren(node) {
  const { vNode } = nodeLookup(node);
  const { shadowId } = vNode;

  const childrenMap = cache.get('getRootChildrenMap', () => ({}));
  if (childrenMap[shadowId]) {
    return childrenMap[shadowId];
  }

  // top of tree
  if (vNode.parent === null) {
    childrenMap[shadowId] = [...vNode.children];
    return childrenMap[shadowId];
  }

  // disconnected tree
  if (!vNode.parent) {
    childrenMap[shadowId] = undefined;
    return childrenMap[shadowId];
  }

  // since the virtual tree does not have a #shadowRoot element the root virtual
  // node is the shadow host element. however the shadow host element is not inside
  // the shadow DOM tree so we return the children of the shadow host element in
  // order to not cross shadow DOM boundaries.
  //
  // TODO: slotted elements share the shadowId of the shadow tree it is attached to
  // but should not be used to find id's inside the shadow tree. throw an error
  // until we resolve this
  if (vNode.shadowId !== vNode.parent.shadowId) {
    throw new Error(
      'Getting root children of shadow DOM elements is not supported'
    );
  }

  return getRootChildren(vNode.parent);
}
