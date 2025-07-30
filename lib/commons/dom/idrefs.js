import getRootNode from './get-root-node';
import {
  tokenList,
  nodeLookup,
  closest,
  querySelectorAll
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
  const { vNode, domNode } = nodeLookup(node);
  const result = [];
  let doc;
  const attrValue = vNode?.attr(attr) ?? node.getAttribute(attr);

  if (attrValue) {
    for (const token of tokenList(attrValue)) {
      try {
        doc ??= getRootNode(domNode);
        result.push(doc.getElementById(token));
      } catch {
        // don't run QSA on detached nodes or partial trees
        const root = closest(vNode, 'html');
        if (!root) {
          throw new TypeError('Cannot resolve id references for non-DOM nodes');
        }

        result.push(querySelectorAll(root, `#${token}`, vNode.shadowId)?.[0]);
      }
    }
  }

  return result;
}

export default idrefs;
