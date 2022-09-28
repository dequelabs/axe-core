import isFocusable from '../../commons/dom/is-focusable';
import { getRoleType } from '../../commons/aria';

export default function noFocusableContentEvaluate(node, options, virtualNode) {
  if (!virtualNode.children) {
    return undefined;
  }

  try {
    const focusableDescendants = getFocusableDescendants(virtualNode);

    if (!focusableDescendants.length) {
      return true;
    }

    const notHiddenElements = focusableDescendants.filter(
      usesUnreliableHidingStrategy
    );

    if (notHiddenElements.length > 0) {
      this.data({ messageKey: 'notHidden' });
      this.relatedNodes(notHiddenElements);
    } else {
      this.relatedNodes(focusableDescendants);
    }

    return false;
  } catch (e) {
    return undefined;
  }
}

function getFocusableDescendants(vNode) {
  if (!vNode.children) {
    if (vNode.props.nodeType === 1) {
      throw new Error('Cannot determine children');
    }

    return [];
  }

  const retVal = [];
  vNode.children.forEach(child => {
    if (getRoleType(child) === 'widget' && isFocusable(child)) {
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
