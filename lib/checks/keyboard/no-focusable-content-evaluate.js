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
  return !isNaN(tabIndex) && tabIndex < 0 && vNode.attr('aria-hidden') === 'true';
}

function noFocusableContentEvaluate(node, options, virtualNode) {
  if (!virtualNode.children) {
    return undefined;
  }
  try {
    const focusableDescendants = getFocusableDescendants(virtualNode);
    if(focusableDescendants.length > 0) {
      const focusableDescendantsThatUseUnreliableHidingStrategy = focusableDescendants.filter(
        descendant => usesUnreliableHidingStrategy(descendant));
      if(focusableDescendantsThatUseUnreliableHidingStrategy.length > 0) {
        const ids = focusableDescendantsThatUseUnreliableHidingStrategy.map(node => node.attr('id'));
        const msg = `Using aria-hidden and negative tabindex is not a reliable way of hiding interactive elements.  `
          +`Element id(s): [${ids.map(id => '"'+id+'"')}].`;
        this.data({messageKey: 'info', values: msg});
      }
    }
    return focusableDescendants.length === 0;
  } catch (e) {
    return undefined;
  }
}

export default noFocusableContentEvaluate;
