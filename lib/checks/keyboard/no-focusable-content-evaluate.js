import isFocusable from '../../commons/dom/is-focusable';

function focusableDescendants(vNode) {
  if (isFocusable(vNode)) {
    return true;
  }

  return vNode.children
    .filter(child => child.props.nodeType === 1)
    .some(child => {
      return focusableDescendants(child);
    });
}

function noFocusbleContentEvaluate(node, options, virtualNode) {
  return !virtualNode.children
    .filter(child => child.props.nodeType === 1)
    .some(child => {
      return focusableDescendants(child);
    });
}

export default noFocusbleContentEvaluate;
