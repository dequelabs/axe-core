import memoize from '../../core/utils/memoize';
import getModalDialog from './get-modal-dialog';
import { contains } from '../../core/utils';

/**
 * Determines if an element is inside an inert subtree.
 * @param {VirtualNode} vNode
 * @param {Boolean} [options.skipAncestors] If the ancestor tree should not be used
 * @return {Boolean} The element's inert state
 */
export default function isInert(vNode, { skipAncestors, isAncestor } = {}) {
  if (skipAncestors) {
    return isInertSelf(vNode, isAncestor);
  }

  return isInertAncestors(vNode, isAncestor);
}

/**
 * Determine if a node is a select element's button or selectedcontent.
 * These are inert per the HTML spec, regardless of the select's rendered
 * appearance (e.g. `appearance: base-select`).
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element
 */
function isInertSelectContent(vNode) {
  const { nodeName } = vNode.props;
  if (nodeName === 'selectedcontent') {
    return true;
  }

  return nodeName === 'button' && vNode.parent?.props.nodeName === 'select';
}

/**
 * Check the element for inert
 */
const isInertSelf = memoize(function isInertSelfMemoized(vNode, isAncestor) {
  if (vNode.hasAttr('inert') || isInertSelectContent(vNode)) {
    return true;
  }

  if (!isAncestor && vNode.actualNode) {
    // elements outside of an opened modal
    // dialog are treated as inert by the
    // browser
    const modalDialog = getModalDialog();
    if (modalDialog && !contains(modalDialog, vNode)) {
      return true;
    }
  }

  return false;
});

/**
 * Check the element and ancestors for inert
 */
const isInertAncestors = memoize(
  function isInertAncestorsMemoized(vNode, isAncestor) {
    if (isInertSelf(vNode, isAncestor)) {
      return true;
    }

    if (!vNode.parent) {
      return false;
    }

    return isInertAncestors(vNode.parent, true);
  }
);
