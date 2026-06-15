export default function ariaConditionalRadioAttr(node, options, virtualNode) {
  const { nodeName, type } = virtualNode.props;
  const ariaChecked = normalizeAriaChecked(virtualNode.attr('aria-checked'));
  if (nodeName !== 'input' || type !== 'radio' || !ariaChecked) {
    return true;
  }

  const checkState = getCheckState(virtualNode);
  if (ariaChecked === checkState) {
    return true;
  }
  this.data({
    messageKey: 'radio',
    checkState
  });
  return false;
}

function getCheckState(vNode) {
  return vNode.props.checked ? 'true' : 'false';
}

function normalizeAriaChecked(ariaCheckedVal) {
  if (!ariaCheckedVal) {
    return '';
  }
  ariaCheckedVal = ariaCheckedVal.toLowerCase();
  if (ariaCheckedVal === 'true') {
    return ariaCheckedVal;
  }
  return 'false';
}
