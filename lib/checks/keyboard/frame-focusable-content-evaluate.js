import { isInTabOrder } from '../../commons/dom';

export default function frameFocusableContentEvaluate(
  node,
  options,
  virtualNode
) {
  if (!virtualNode.children) {
    return undefined;
  }

  try {
    return !virtualNode.children.some(child => {
      return focusableDescendants(child);
    });
  } catch (e) {
    return undefined;
  }
}

function focusableDescendants(vNode) {
  if (isInTabOrder(vNode)) {
    return true;
  }

  if (!vNode.children) {
    if (vNode.props.nodeType === 1) {
      throw new Error('Cannot determine children');
    }

    return false;
  }

  return vNode.children.some(child => {
    return focusableDescendants(child);
  });
}
