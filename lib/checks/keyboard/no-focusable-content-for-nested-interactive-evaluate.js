import isFocusable from '../../commons/dom/is-focusable';
import { tokenList } from '../../core/utils';

function getFocusableDescendants(vNode) {
  if (!vNode.children) {
    if (vNode.props.nodeType === 1) {
      throw new Error('Cannot determine children');
    }

    return [];
  }

  let retVal = [];
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
  let tabIndex = parseInt(vNode.attr('tabindex'), 10);
  return !isNaN(tabIndex) && tabIndex < 0 && vNode.attr('aria-hidden') == 'true';
}

function noFocusableContentForNestedInteractiveEvaluate(node, options, virtualNode) {
  if (!virtualNode.children) {
    return undefined;
  }
  try {
    let focusableDescendants = getFocusableDescendants(virtualNode);
    if(focusableDescendants.length > 0) {
      let focusableDescendantsThatUseUnreliableHidingStrategy = focusableDescendants.filter(
        descendant => usesUnreliableHidingStrategy(descendant));
      if(focusableDescendantsThatUseUnreliableHidingStrategy.length > 0) {
        let ids = focusableDescendantsThatUseUnreliableHidingStrategy.map(node => node.attr('id'));
        let n = focusableDescendantsThatUseUnreliableHidingStrategy.length;
        let msg = `Using aria-hidden and negative tabindex is not a reliable way of hiding interactive elements.  `
          +`Element ids: [${ids.map(id => '"'+id+'"')}].`;
        this.data({messageKey: 'info', values: msg});
      }
    }
    return focusableDescendants.length == 0;
  } catch (e) {
    return undefined;
  }
}

export default noFocusableContentForNestedInteractiveEvaluate;
