import getRootChildren from './get-root-children';
import {
  tokenList,
  nodeLookup,
  querySelectorAll,
  getRootNode
} from '../../core/utils';

/**
 * Get elements referenced via a space-separated token attribute;
 * it will insert `null` for any Element that is not found
 * @method idrefs
 * @memberof axe.commons.dom
 * @instance
 * @param  {HTMLElement} node
 * @param  {String} attr The name of attribute
 * @return {Array|null} Array of elements (or `null` if not found)
 *
 * NOTE: When in a shadow DOM environment: ID refs (even for slotted content)
 * refer to the document in which the element is considered to be in the
 * "light DOM". Therefore, we use getElementById on the root node and not QSA
 * on the flattened tree to dereference idrefs.
 *
 */
function idrefs(node, attr) {
  const { domNode, vNode } = nodeLookup(node);
  const results = [];
  const attrValue = vNode ? vNode.attr(attr) : node.getAttribute(attr);

  if (!attrValue) {
    return results;
  }

  try {
    const root = getRootNode(domNode);
    for (const token of tokenList(attrValue)) {
      results.push(root.getElementById(token));
    }
  } catch {
    const rootVNodes = getRootChildren(vNode);
    if (!rootVNodes) {
      throw new TypeError('Cannot resolve id references for non-DOM nodes');
    }

    for (const token of tokenList(attrValue)) {
      let result = null;

      for (const root of rootVNodes) {
        const foundNode = querySelectorAll(root, `#${token}`)[0];
        if (foundNode) {
          result = foundNode;
          break;
        }
      }

      results.push(result);
    }
  }

  return results;
}

export default idrefs;
