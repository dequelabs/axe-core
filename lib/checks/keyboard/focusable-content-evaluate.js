import { querySelectorAll } from '../../core/utils';

function focusableContentEvaluate(node, options, virtualNode) {
  /**
   * Note:
   * Check if given node contains focusable elements (excluding thyself)
   */
  const tabbableContentElements = (virtualNode.tabbableElements ?? []).filter(
    el => el !== virtualNode
  );

  if (tabbableContentElements.length > 0) {
    return true;
  }

  // Elements with a tabindex can be given focus by script, which cannot be
  // determined automatically
  const tabindexContent = querySelectorAll(virtualNode, '[tabindex]').filter(
    vNode => vNode !== virtualNode && vNode.isFocusable
  );

  if (tabindexContent.length === 0) {
    return false;
  }

  this.relatedNodes(tabindexContent);
  return undefined;
}

export default focusableContentEvaluate;
