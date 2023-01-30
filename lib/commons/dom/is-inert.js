import memoize from '../../core/utils/memoize';
import { querySelectorAllFilter, contains } from '../../core/utils';
import isVisibleOnScreen from './is-visible-on-screen';
import createGrid from './create-grid';

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
 * Check the element for inert
 */
const isInertSelf = memoize(function isInertSelfMemoized(vNode, isAncestor) {
  if (vNode.hasAttr('inert')) {
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
const isInertAncestors = memoize(function isInertAncestorsMemoized(
  vNode,
  isAncestor
) {
  if (isInertSelf(vNode, isAncestor)) {
    return true;
  }

  if (!vNode.parent) {
    return false;
  }

  return isInertAncestors(vNode.parent, true);
});

/**
 * Determine if a dialog element is opened as a modal. Currently there are no APIs to determine this so we'll use a bit of a hacky solution that has known issues.
 * This can tell us that a dialog element is open but it cannot tell us which one is the top layer, nor which one is visually on top. Nested dialogs that are opened using both `.show` and`.showModal` can cause issues as well.
 * @see https://github.com/dequelabs/axe-core/issues/3463
 * @return {VirtualNode|Null} The modal dialog virtual node or null if none are found
 */
const getModalDialog = memoize(function getModalDialogMemoized() {
  // this is here for tests so we don't have
  // to set up the virtual tree when code
  // isn't testing this bit
  if (!axe._tree) {
    return;
  }

  const dialogs = querySelectorAllFilter(
    // TODO: es-module-_tree
    axe._tree[0],
    'dialog[open]',
    isVisibleOnScreen
  );

  if (!dialogs.length || !dialogs[0].actualNode) {
    return;
  }

  // for Chrome and Firefox, look to see if
  // elementsFromPoint returns the dialog
  // when checking outside its bounds
  let modalDialog = dialogs.find(dialog => {
    const rect = dialog.boundingClientRect;
    const stack = document.elementsFromPoint(rect.left - 10, rect.top - 10);

    return stack.includes(dialog.actualNode);
  });

  // fallback for Safari, look at the grid to
  // find a node to check as elementsFromPoint
  // does not return inert nodes
  if (!modalDialog) {
    modalDialog = dialogs.find(dialog => {
      const vNode = getNodeFromGrid(dialog);
      if (!vNode) {
        return false;
      }

      const rect = vNode.boundingClientRect;
      const stack = document.elementsFromPoint(rect.left + 1, rect.top + 1);

      return !stack.includes(vNode.actualNode);
    });
  }

  return modalDialog;
});

/**
 * Find the first non-html from the grid to use as a test for elementsFromPoint
 * @return {VirtualNode|Null}
 */
function getNodeFromGrid(dialog) {
  createGrid();
  // TODO: es-module-_tree
  const grid = axe._tree[0]._grid;

  for (let row = 0; row < grid.cells.length; row++) {
    const cols = grid.cells[row];
    if (!cols) {
      continue;
    }

    for (let col = 0; col < cols.length; col++) {
      const cells = cols[col];
      if (!cells) {
        continue;
      }

      const vNode = cells.find(virtualNode => {
        return (
          // html is always returned from elementsFromPoint
          virtualNode.props.nodeName !== 'html' &&
          virtualNode !== dialog &&
          virtualNode.getComputedStylePropertyValue('pointer-events') !== 'none'
        );
      });
      // vNodes = grid.cells[row].find(col => {
      //   // grid cells always contain html
      //   return col.length > 1 && !col.includes(dialog)
      // });
      if (vNode) {
        return vNode;
      }
    }
  }
}
