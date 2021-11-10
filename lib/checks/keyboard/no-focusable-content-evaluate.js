import isFocusable from '../../commons/dom/is-focusable';
import { getRole, getRoleType } from '../../commons/aria';
 
function getFocusableDescendants(vNode) {
  if (!vNode.children) {
    if (vNode.props.nodeType === 1) {
      throw new Error('Cannot determine children');
    }

    return [];
  }

  const retVal = [];
  vNode.children.forEach(child => {
    const role = getRole(child);

    if(getRoleType(role) === 'widget' && isFocusable(child)) {
      retVal.push(child);
    } else {
      retVal.push(...getFocusableDescendants(child));
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
      const notHiddenElements = focusableDescendants.filter(usesUnreliableHidingStrategy);
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
