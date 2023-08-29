import getRole from './get-role';
import ariaAttrs from '../../standards/aria-attrs';
import { getRootNode } from '../../core/utils';

/**
 * Whether an element is the popup for a combobox
 * @method isComboboxPopup
 * @memberof axe.commons.aria
 * @instance
 * @param {VirtualNode} virtualNode
 * @param {Object} options
 * @property {String[]} popupRoles Overrides which roles can be popup. Defaults to aria-haspopup values
 * @returns {boolean}
 */
export default function isComboboxPopup(virtualNode, { popupRoles } = {}) {
  const role = getRole(virtualNode);
  popupRoles ??= ariaAttrs['aria-haspopup'].values;
  if (!popupRoles.includes(role)) {
    return false;
  }

  // in ARIA 1.1 the container has role=combobox
  const vParent = nearestParentWithRole(virtualNode);
  if (isCombobox(vParent)) {
    return true;
  }

  const { id } = virtualNode.props;
  if (!id) {
    return false;
  }

  if (!virtualNode.actualNode) {
    throw new Error('Unable to determine combobox popup without an actualNode');
  }
  const root = getRootNode(virtualNode.actualNode);
  const ownedCombobox = root.querySelectorAll(
    // aria-owns was from ARIA 1.0, aria-controls was from ARIA 1.2
    `[aria-owns~="${id}"][role~="combobox"]:not(select),
     [aria-controls~="${id}"][role~="combobox"]:not(select)`
  );

  return Array.from(ownedCombobox).some(isCombobox);
}

const isCombobox = node => node && getRole(node) === 'combobox';

function nearestParentWithRole(vNode) {
  while ((vNode = vNode.parent)) {
    if (getRole(vNode, { noPresentational: true }) !== null) {
      return vNode;
    }
  }
  return null;
}
