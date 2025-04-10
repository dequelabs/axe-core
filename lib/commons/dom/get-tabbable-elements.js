import { querySelectorAll } from '../../core/utils';
import { parseTabindex } from '../../core/utils';

/**
 * Get all elements (including given node) that are part of the tab order
 * @method getTabbableElements
 * @memberof axe.commons.dom
 * @instance
 * @param  {Object} virtualNode The virtualNode to assess
 * @return {Boolean}
 */
function getTabbableElements(virtualNode) {
  const nodeAndDescendents = querySelectorAll(virtualNode, '*');

  const tabbableElements = nodeAndDescendents.filter(vNode => {
    const isFocusable = vNode.isFocusable;
    const tabIndex = parseTabindex(vNode.actualNode.getAttribute('tabindex'));

    return tabIndex !== null ? isFocusable && tabIndex >= 0 : isFocusable;
  });

  return tabbableElements;
}

export default getTabbableElements;
