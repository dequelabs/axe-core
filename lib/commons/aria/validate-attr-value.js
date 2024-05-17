import standards from '../../standards';
import getRootNode from '../dom/get-root-node';
import idrefs from '../dom/idrefs';
import AbstractVirtuaNode from '../../core/base/virtual-node/abstract-virtual-node';
import { tokenList, getNodeFromTree } from '../../core/utils';

/**
 * Validate the value of an ARIA attribute
 * @method validateAttrValue
 * @memberof axe.commons.aria
 * @instance
 * @param  {HTMLElement} node The element to check
 * @param  {String} attr The name of the attribute
 * @return {Boolean}
 */
function validateAttrValue(vNode, attr) {
  vNode = vNode instanceof AbstractVirtuaNode ? vNode : getNodeFromTree(vNode);

  let matches;
  let list;
  const value = vNode.attr(attr);
  const attrInfo = standards.ariaAttrs[attr];

  if (!attrInfo) {
    return true;
  }
  if (attrInfo.allowEmpty && (!value || value.trim() === '')) {
    return true;
  }

  switch (attrInfo.type) {
    case 'boolean':
      return ['true', 'false'].includes(value.toLowerCase());

    case 'nmtoken':
      return (
        typeof value === 'string' &&
        attrInfo.values.includes(value.toLowerCase())
      );

    case 'nmtokens':
      list = tokenList(value);
      // Check if any value isn't in the list of values
      return list.reduce((result, token) => {
        return result && attrInfo.values.includes(token);
        // Initial state, fail if the list is empty
      }, list.length !== 0);

    case 'idref':
      try {
        const doc = getRootNode(vNode.actualNode);
        return !!(value && doc.getElementById(value));
      } catch {
        throw new TypeError('Cannot resolve id references for partial DOM');
      }

    case 'idrefs':
      return idrefs(vNode, attr).some(node => !!node);

    case 'string':
      // Not allowed empty except with allowEmpty: true
      return value.trim() !== '';

    case 'decimal':
      matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
      return !!(matches && (matches[1] || matches[2]));

    case 'int':
      const minValue =
        typeof attrInfo.minValue !== 'undefined'
          ? attrInfo.minValue
          : -Infinity;
      return /^[-+]?[0-9]+$/.test(value) && parseInt(value) >= minValue;
  }
}

export default validateAttrValue;
