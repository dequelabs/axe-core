import isFocusable from '../../commons/dom/is-focusable';

function getFocusableDescendants(vNode) {
  if (!vNode.children) {
    if (vNode.props.nodeType === 1) {
      throw new Error('Cannot determine children');
    }

    return [];
  }

  const retVal = [];
  vNode.children.forEach(child => {
    if(isFocusable(child)) {
      retVal.push(child);
    } else {
      getFocusableDescendants(child).forEach(descendantOfChild => retVal.push(descendantOfChild));
    }
  });
  return retVal;
}

function usesUnreliableHidingStrategy(vNode) {
  const tabIndex = parseInt(vNode.attr('tabindex'), 10);
  return !isNaN(tabIndex) && tabIndex < 0;
}

function noFocusableContentEvaluate(node, options, virtualNode) {
  if (!virtualNode.children) {
    return undefined;
  }
  try {
    const focusableDescendants = getFocusableDescendants(virtualNode);
    if(focusableDescendants.length > 0) {
      const notHiddenElements = focusableDescendants.filter(descendant => usesUnreliableHidingStrategy(descendant));
      if(notHiddenElements.length > 0) {
        this.data({ messageKey: 'notHidden' });
        this.relatedNodes(notHiddenElements);
      }
    }
    return focusableDescendants.length === 0;
  } catch (e) {
    return undefined;
  }
}

export default noFocusableContentEvaluate;
