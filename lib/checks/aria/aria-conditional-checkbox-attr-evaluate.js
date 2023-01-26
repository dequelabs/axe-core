export default function ariaConditionalCheckboxAttr(
  node,
  options,
  virtualNode
) {
  const { nodeName, type } = virtualNode.props;
  const ariaChecked = virtualNode.attr('aria-checked')?.toLowerCase();
  if (nodeName !== 'input' || type !== 'checkbox' || ariaChecked === null) {
    return true;
  }

  // Mixed is never allowed on native checkboxes:
  if (ariaChecked === 'mixed') {
    this.data({ messageKey: 'checkboxMixed' });
    return false;
  }

  // aria-checked has to be consistent with native checked:
  if (xor(ariaChecked === 'true', isChecked(virtualNode))) {
    this.data({ messageKey: 'checkbox' });
    return false;
  }

  return true;
}

const xor = (a, b) => (a || b) && !(a && b);

const isChecked = vNode =>
  vNode.actualNode ? !!vNode.actualNode.checked : vNode.hasAttr('checked');
