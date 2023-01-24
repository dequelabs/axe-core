import getExplicitRole from './get-explicit-role';
import ariaAttrs from '../../standards/aria-attrs';
import { closest, getRootNode, tokenList } from '../../core/utils';

export default function isComboboxPopup(virtualNode) {
  const popupRoles = ariaAttrs['aria-haspopup'].values;
  const node = virtualNode.actualNode;

  const role = getExplicitRole(virtualNode);
  if (!popupRoles.includes(role)) {
    return false;
  }

  // in ARIA 1.1 the container has role=combobox
  if (closest(virtualNode, '[role~="combobox"]')) {
    return true;
  }

  // in ARIA 1.0 and 1.2 the combobox owns (1.0) or controls (1.2) the listbox
  const id = virtualNode.attr('id');
  if (!id) {
    return false;
  }

  const doc = getRootNode(node);
  const owned = Array.from(
    doc.querySelectorAll(`[aria-owns~="${id}"], [aria-controls~="${id}"]`)
  );
  const comboboxOwned = owned.some(el => {
    const roles = tokenList(el.getAttribute('role'));
    return roles.includes('combobox');
  });
  if (!comboboxOwned) {
    return false;
  }

  return true;
}
