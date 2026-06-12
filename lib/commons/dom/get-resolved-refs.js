import getRootNode from './get-root-node';
import { tokenList, nodeLookup, getNodeFromTree } from '../../core/utils';
import standards from '../../standards';

/**
 * Get elements referenced via a space-separated token attribute or AOM property;
 * it will insert `null` for any Element that is not found
 * @method getResolvedRefs
 * @memberof axe.commons.dom
 * @instance
 * @param  {HTMLElement|Node|VirtualNode} node
 * @param  {String} attr The attribute name to get the value of. Use the ARIA attr name even if getting values from AOM properties.
 * @param {Object} [options]
 * @param {Boolean} [options.self=true] If the resolved refs should include the passed in node if the attr references its own id
 * @return {Array<VirtualNodes|null>} Array of mixed values: Virtual Nodes or `null` if not found
 *
 * NOTE: When in a shadow DOM environment: ID refs (even for slotted content)
 * refer to the document in which the element is considered to be in the
 * "light DOM". Therefore, we use getElementById on the root node and not QSA
 * on the flattened tree to dereference idrefs.
 *
 */
export default function getResolvedRefs(node, attr, options = {}) {
  const { self = true } = options;
  const { vNode, domNode } = nodeLookup(node);

  try {
    const attrValue = getIdrefsValue(vNode, attr);
    if (!attrValue) {
      return [];
    }

    let refs;

    if (typeof attrValue === 'string') {
      const doc = getRootNode(domNode);
      refs = tokenList(attrValue).map(value => doc.getElementById(value));
    } else {
      // already resolved node refs
      refs = Array.from(attrValue);
    }

    if (!self) {
      refs = refs.filter(n => n !== domNode);
    }
    return refs.map(n => {
      const virtualNode = getNodeFromTree(n);
      return virtualNode ? virtualNode : null;
    });
  } catch (cause) {
    throw new TypeError('Cannot resolve id references for non-DOM nodes', {
      cause
    });
  }
}

function getIdrefsValue(vNode, attr) {
  const { prop } = standards.ariaAttrs[attr] ?? {};

  // get prop value first as setting idrefs can result in empty attribute values
  // e.g. el.ariaLabelledByElements = [label]; el.getAttribute('aria-labelledby') === ''
  if (prop && vNode.actualNode) {
    const propValue = vNode.actualNode[prop];
    // the prop could be undefined in IE11
    if (propValue !== null && propValue !== undefined) {
      return propValue;
    }
  }

  const attrValue = vNode.attr(attr);
  if (attrValue !== null) {
    return attrValue;
  }

  if (prop && vNode.elementInternals) {
    const internalsValue = vNode.elementInternals[prop];
    if (internalsValue !== null && internalsValue !== undefined) {
      return internalsValue;
    }
  }

  return null;
}
