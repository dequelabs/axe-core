import { nodeLookup } from '../../core/utils';
import standards from '../../standards';

const idrefTypes = ['idref', 'idrefs'];
const sources = [
  // resolve attr first in order to capture the string value of idref(s) attributes if present
  {
    source: 'attribute',
    getValue: getAttributeValue
  },
  {
    source: 'property',
    getValue: getPropertyValue
  },
  {
    source: 'internals',
    getValue: getInternalValue
  }
];

/**
 * Get the value of an ARIA attribute, property, or ElementInternal
 * @method getAriaValue
 * @memberof axe.commons.aria
 * @instance
 * @param {Node|Element|VirtualNode} node
 * @param {String} attrName The ARIA attribute name to get the value of. Use the ARIA attr name even if getting values from properties.
 * @param {Object} [options]
 * @param {Boolean} [options.lowercase=false] toLowerCase the value
 * @return {{value: String, source: String}|null} value
 */
export default function getAriaValue(node, attrName, options = {}) {
  const attrStandard = standards.ariaAttrs[attrName];
  if (!attrStandard) {
    return null;
  }

  const { type } = attrStandard;
  const { vNode } = nodeLookup(node);
  const { lowercase } = options;

  for (const { source, getValue } of sources) {
    let value = getValue(vNode, attrStandard, attrName);
    if (value === null) {
      continue;
    }

    if (value instanceof window.Node) {
      value = value.nodeName;
    } else if (Array.isArray(value) || value instanceof window.NodeList) {
      value =
        '[' +
        Array.from(value)
          .map(n => n.nodeName)
          .join(',') +
        ']';
    }

    // string types (like aria-label) should not be trimmed
    if (type !== 'string') {
      value = value.trim();
    }

    return {
      value: lowercase ? value.toLowerCase() : value,
      source
    };
  }

  return null;
}

function getAttributeValue(vNode, attrStandard, attrName) {
  const { type } = attrStandard;
  const value = vNode.attr(attrName);

  // setting an ARIA idref(s) prop value can result in empty attribute values, so we'll need extra processing for idref(s)
  // e.g. el.ariaLabelledByElements = [label]; el.getAttribute('aria-labelledby') === ''
  if (!idrefTypes.includes(type)) {
    return value;
  }

  // return the idref(s) attribute if it is not empty
  if (!!value) {
    return value;
  }

  // return null for the attribute if the value is empty but the idref(s) prop is not
  const propValue = getPropertyValue(vNode, attrStandard);
  const propEmpty = Array.isArray(propValue) ? propValue.length : !!propValue;
  return propEmpty ? null : value;
}

function getPropertyValue(vNode, attrStandard) {
  const { prop } = attrStandard;
  return prop && vNode.actualNode ? vNode.actualNode[prop] : null;
}

function getInternalValue(vNode, attrStandard) {
  const { prop } = attrStandard;
  return prop && vNode.elementInternals ? vNode.elementInternals[prop] : null;
}
