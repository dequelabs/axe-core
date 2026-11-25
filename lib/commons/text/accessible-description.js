import getResolvedRefs from '../dom/get-resolved-refs';
import getAriaValue from '../aria/get-aria-value';
import accessibleTextVirtual from './accessible-text-virtual';
import titleText from './title-text';
import sanitize from './sanitize';
import { nodeLookup } from '../../core/utils';

/**
 * Get the accessible description of an element, following the accname
 * description computation: `aria-describedby`, then `aria-description`,
 * then `title` if it is not used as the accessible name.
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @see https://www.w3.org/TR/accname-1.2/#mapping_additional_nd_description
 * @method accessibleDescription
 * @memberof axe.commons.text
 * @instance
 * @param {VirtualNode|Element} node
 * @return {String} The sanitized accessible description, or an empty string
 */
export default function accessibleDescription(node) {
  const { vNode } = nodeLookup(node);
  if (vNode?.props.nodeType !== 1) {
    return '';
  }

  const describedby = getResolvedRefs(vNode, 'aria-describedby')
    .filter(Boolean)
    .map(ref =>
      // inLabelledByContext includes hidden refs and stops following further idrefs, as aria-labelledby does
      accessibleTextVirtual(ref, {
        inLabelledByContext: true,
        startNode: vNode
      })
    )
    .join(' ');
  if (sanitize(describedby)) {
    return sanitize(describedby);
  }

  const description = sanitize(
    getAriaValue(vNode, 'aria-description').value ?? ''
  );
  if (description) {
    return description;
  }

  const title = sanitize(titleText(vNode));
  if (title === sanitize(accessibleTextVirtual(vNode))) {
    return '';
  }
  return title;
}
