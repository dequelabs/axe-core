import { idrefs } from '../../commons/dom';
import { contains, getNodeFromTree, querySelectorAll } from '../../core/utils';

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

  if (tabindexContent.length > 0) {
    this.relatedNodes(tabindexContent);
    return undefined;
  }

  // A focusable element can point aria-activedescendant at content of the
  // region. The script that manages the active descendant is expected to
  // scroll it into view, which cannot be determined automatically
  const activeDescendantOwners = getActiveDescendantOwners(virtualNode);

  if (activeDescendantOwners.length === 0) {
    return false;
  }

  this.relatedNodes(activeDescendantOwners);
  this.data({ messageKey: 'activedescendant' });
  return undefined;
}

export default focusableContentEvaluate;

/**
 * Find focusable elements whose aria-activedescendant references an element
 * inside the given region
 * @param {VirtualNode} vRegion
 * @return {VirtualNode[]}
 */
function getActiveDescendantOwners(vRegion) {
  if (!axe._tree?.[0]) {
    return [];
  }

  return querySelectorAll(axe._tree[0], '[aria-activedescendant]').filter(
    vOwner => {
      if (vOwner === vRegion || !vOwner.isFocusable) {
        return false;
      }

      const [activeDescendant] = idrefs(vOwner, 'aria-activedescendant');
      const vActiveDescendant = getNodeFromTree(activeDescendant);
      return (
        !!vActiveDescendant &&
        vActiveDescendant !== vRegion &&
        contains(vRegion, vActiveDescendant)
      );
    }
  );
}
