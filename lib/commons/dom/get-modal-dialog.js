import memoize from '../../core/utils/memoize';
import cache from '../../core/base/cache';
import {
  getNodeFromTree,
  getRootNode,
  querySelectorAllFilter
} from '../../core/utils';
import isVisibleOnScreen from './is-visible-on-screen';
import createGrid from './create-grid';
import getIntersectionRect from '../math/get-intersection-rect';

/**
 * Determine if a dialog element is opened as a modal. Currently there are no APIs to determine this so we'll use a bit of a hacky solution that has known issues.
 * This can tell us that a dialog element is open but it cannot tell us which one is the top layer, nor which one is visually on top. Nested dialogs that are opened using both `.show` and`.showModal` can cause issues as well.
 * @see https://github.com/dequelabs/axe-core/issues/3463
 * @return {VirtualNode|Null} The modal dialog virtual node or null if none are found
 */
export default function getModalDialog() {
  // Context creates its tree before assigning axe._tree.
  // Only flattened roots have a null parent; the grid can create other nodes.
  const documentRoot = getNodeFromTree(document?.documentElement);
  const root = documentRoot?.parent === null ? documentRoot : axe._tree?.[0];
  if (!root) {
    return null;
  }

  return getModalDialogFromTree(root);
}

const getModalDialogFromTree = memoize(function getModalDialogMemoized(root) {
  // environments without elementFromPoint, such as jsdom, cannot determine
  // if a dialog is modal. treat all dialogs as non-modal rather than
  // throwing an error which would cause rules to be skipped
  // (elementsFromPoint may exist as our polyfill, which relies on
  // elementFromPoint)
  // @see https://github.com/dequelabs/axe-core/issues/4997
  if (
    typeof document.elementsFromPoint !== 'function' ||
    typeof document.elementFromPoint !== 'function'
  ) {
    return null;
  }

  const dialogs = querySelectorAllFilter(root, 'dialog[open]', vNode => {
    if (!isVisibleOnScreen(vNode)) {
      return false;
    }

    const rect = vNode.boundingClientRect;
    const stack = getRootNode(vNode.actualNode).elementsFromPoint(
      rect.left + 1,
      rect.top + 1
    );
    return stack.includes(vNode.actualNode);
  });

  if (!dialogs.length) {
    return null;
  }

  // for Chrome and Firefox, look to see if
  // elementsFromPoint returns the dialog
  // when checking outside its bounds
  const modalDialog = dialogs.find(dialog => {
    const rect = dialog.boundingClientRect;
    const stack = getRootNode(dialog.actualNode).elementsFromPoint(
      rect.left - 10,
      rect.top - 10
    );

    return stack.includes(dialog.actualNode);
  });

  if (modalDialog) {
    return modalDialog;
  }

  // fallback for Safari, look at the grid to
  // find a node to check as elementsFromPoint
  // does not return inert nodes
  return (
    dialogs.find(dialog => {
      const { vNode, rect } = getNodeFromGrid(dialog, root) ?? {};
      if (!vNode) {
        return false;
      }

      const stack = getRootNode(vNode.actualNode).elementsFromPoint(
        rect.left + 1,
        rect.top + 1
      );
      return !stack.includes(vNode.actualNode);
    }) ?? null
  );
});

/**
 * Find the first non-html from the grid to use as a test for elementsFromPoint
 * @return {Object}
 */
function getNodeFromGrid(dialog, root) {
  // Context can rebuild the tree without clearing the grid cache.
  if (!root._grid) {
    cache.set('gridCreated', false);
  }
  createGrid();
  const grid = root._grid;
  const viewRect = new window.DOMRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  if (!grid) {
    return;
  }

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

      for (let i = 0; i < cells.length; i++) {
        const vNode = cells[i];
        const rect = vNode.boundingClientRect;
        const intersection = getIntersectionRect(rect, viewRect);

        if (
          // html is always returned from
          // elementsFromPoint
          vNode.props.nodeName !== 'html' &&
          vNode !== dialog &&
          vNode.getComputedStylePropertyValue('pointer-events') !== 'none' &&
          // ensure the element is visible in
          // the current viewport for
          // elementsFromPoint so we don't have
          // to scroll
          intersection
        ) {
          return { vNode, rect: intersection };
        }
      }
    }
  }
}
