import attrNonSpaceContentEvaluate from '../generic/attr-non-space-content-evaluate';
import { getElementSpec } from '../../commons/standards';

/**
 * Check that the element has a non-empty placeholder, and that the element
 * uses the placeholder for its accessible name. html-aam only does that for
 * textarea and for inputs of type text, password, number, search, tel, email
 * and url.
 * @param {HTMLElement} node
 * @param {Object} options
 * @param {VirtualNode} virtualNode
 * @return {Boolean}
 */
export default function nonEmptyPlaceholderEvaluate(
  node,
  options,
  virtualNode
) {
  if (!attrNonSpaceContentEvaluate.call(this, node, options, virtualNode)) {
    return false;
  }

  const { namingMethods = [] } = getElementSpec(virtualNode);
  if (namingMethods.includes('placeholderText')) {
    return true;
  }

  this.data({ messageKey: 'unsupportedType' });
  return false;
}
