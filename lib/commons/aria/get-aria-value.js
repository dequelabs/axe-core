import {
  nodeLookup,
  getNodeFromTree,
  getRootNode,
  tokenList
} from '../../core/utils';
import standards from '../../standards';
import idrefs from '../dom/idrefs';

export default function getAriaValue(node, attrName) {
  const { vNode, domNode } = nodeLookup(node);
  const propName = standards.ariaAttrs[attrName].prop;

  // resolve ARIA prop value first as setting idref(s) properties can result in empty attribute values
  // e.g. el.ariaLabelledByElements = [label]; el.getAttribute('aria-labelledby') === ''
  if (propName) {
    const propValue = domNode[propName];
    if (propValue !== null) {
      return {
        value: normalizeAriaValue(vNode, propValue, attrName),
        source: 'property'
      };
    }
  }

  if (vNode.hasAttr(attrName)) {
    const attrValue = vNode.attr(attrName);
    return {
      value: normalizeAriaValue(vNode, attrValue, attrName),
      source: 'attribute'
    };
  }

  if (propName) {
    const internalValue = vNode.elementInternals[propName];
    if (internalValue !== null) {
      return {
        value: normalizeAriaValue(vNode, internalValue, attrName),
        source: 'internals'
      };
    }
  }

  return null;
}

function normalizeAriaValue(vNode, value, attrName) {
  const { type } = standards.ariaAttrs[attrName];

  switch (type) {
    case 'string':
      return value;

    case 'int':
      return parseInt(value, 10);

    case 'decimal':
      return parseFloat(value);

    case 'boolean':
      return value.trim().toLowerCase() === 'true';

    case 'nmtoken':
      return value.trim().toLowerCase();

    case 'nmtokens':
      return tokenList(value.trim().toLowerCase());

    case 'idref':
      // ref already resolved
      if (typeof value !== 'string') {
        return getNodeFromTree(value);
      }

      try {
        const doc = getRootNode(vNode.actualNode);
        const node = doc.getElementById(value);
        return node ? getNodeFromTree(node) : null;
      } catch {
        throw new TypeError('Cannot resolve id references for partial DOM');
      }

    case 'idrefs':
      // refs already resolved
      if (Array.isArray(value)) {
        return value
          .filter(node => node.isConnected)
          .map(node => getNodeFromTree(node));
      }

      return idrefs(vNode, attrName)
        .filter(node => !!node)
        .map(node => getNodeFromTree(node));
  }
}
