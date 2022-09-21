/* eslint no-bitwise: 0 */
import isVisibleOnScreen from './is-visible-on-screen';
import VirtualNode from '../../core/base/virtual-node/virtual-node';
import { getNodeFromTree, getScroll, isShadowRoot } from '../../core/utils';
import constants from '../../core/constants';
import cache from '../../core/base/cache';

/**
 * Setup the 2d grid and add every element to it, even elements not
 * included in the flat tree
 * @returns gridSize
 */
export default function createGrid(
  root = document.body,
  rootGrid = {
    container: null,
    cells: []
  },
  parentVNode = null
) {
  // Prevent multiple calls per run
  if (cache.get('gridCreated') && !parentVNode) {
    return constants.gridSize;
  }
  cache.set('gridCreated', true);

  // by not starting at the htmlElement we don't have to pass a custom
  // filter function into the treeWalker to filter out head elements,
  // which would be called for every node
  if (!parentVNode) {
    let vNode = getNodeFromTree(document.documentElement);
    if (!vNode) {
      vNode = new VirtualNode(document.documentElement);
    }

    vNode._stackingOrder = [0];
    addNodeToGrid(rootGrid, vNode);

    if (getScroll(vNode.actualNode)) {
      const subGrid = {
        container: vNode,
        cells: []
      };
      vNode._subGrid = subGrid;
    }
  }

  // IE11 requires the first 3 parameters
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const treeWalker = document.createTreeWalker(
    root,
    window.NodeFilter.SHOW_ELEMENT,
    null,
    false
  );
  let node = parentVNode ? treeWalker.nextNode() : treeWalker.currentNode;
  while (node) {
    let vNode = getNodeFromTree(node);

    // an svg in IE11 does not have a parentElement but instead has a
    // parentNode. but parentNode could be a shadow root so we need to
    // verify it's in the tree first
    if (node.parentElement) {
      parentVNode = getNodeFromTree(node.parentElement);
    } else if (node.parentNode && getNodeFromTree(node.parentNode)) {
      parentVNode = getNodeFromTree(node.parentNode);
    }

    if (!vNode) {
      vNode = new axe.VirtualNode(node, parentVNode);
    }

    vNode._stackingOrder = getStackingOrder(vNode, parentVNode);

    const scrollRegionParent = findScrollRegionParent(vNode, parentVNode);
    const grid = scrollRegionParent ? scrollRegionParent._subGrid : rootGrid;

    if (getScroll(vNode.actualNode)) {
      const subGrid = {
        container: vNode,
        cells: []
      };
      vNode._subGrid = subGrid;
    }

    // filter out any elements with 0 width or height
    // (we don't do this before so we can calculate stacking context
    // of parents with 0 width/height)
    const rect = vNode.boundingClientRect;
    if (rect.width !== 0 && rect.height !== 0 && isVisibleOnScreen(node)) {
      addNodeToGrid(grid, vNode);
    }

    // add shadow root elements to the grid
    if (isShadowRoot(node)) {
      createGrid(node.shadowRoot, grid, vNode);
    }

    node = treeWalker.nextNode();
  }
  return constants.gridSize;
}

/**
 * Determine if node produces a stacking context.
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 * https://github.com/gwwar/z-context/blob/master/devtools/index.js
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isStackingContext(vNode, parentVNode) {
  const position = vNode.getComputedStylePropertyValue('position');
  const zIndex = vNode.getComputedStylePropertyValue('z-index');

  // the root element (HTML) is skipped since we always start with a
  // stacking order of [0]

  // position: fixed or sticky
  if (position === 'fixed' || position === 'sticky') {
    return true;
  }

  // positioned (absolutely or relatively) with a z-index value other than "auto",
  if (zIndex !== 'auto' && position !== 'static') {
    return true;
  }

  // elements with an opacity value less than 1.
  if (vNode.getComputedStylePropertyValue('opacity') !== '1') {
    return true;
  }

  // elements with a transform value other than "none"
  const transform =
    vNode.getComputedStylePropertyValue('-webkit-transform') ||
    vNode.getComputedStylePropertyValue('-ms-transform') ||
    vNode.getComputedStylePropertyValue('transform') ||
    'none';

  if (transform !== 'none') {
    return true;
  }

  // elements with a mix-blend-mode value other than "normal"
  const mixBlendMode = vNode.getComputedStylePropertyValue('mix-blend-mode');
  if (mixBlendMode && mixBlendMode !== 'normal') {
    return true;
  }

  // elements with a filter value other than "none"
  const filter = vNode.getComputedStylePropertyValue('filter');
  if (filter && filter !== 'none') {
    return true;
  }

  // elements with a perspective value other than "none"
  const perspective = vNode.getComputedStylePropertyValue('perspective');
  if (perspective && perspective !== 'none') {
    return true;
  }

  // element with a clip-path value other than "none"
  const clipPath = vNode.getComputedStylePropertyValue('clip-path');
  if (clipPath && clipPath !== 'none') {
    return true;
  }

  // element with a mask value other than "none"
  const mask =
    vNode.getComputedStylePropertyValue('-webkit-mask') ||
    vNode.getComputedStylePropertyValue('mask') ||
    'none';
  if (mask !== 'none') {
    return true;
  }

  // element with a mask-image value other than "none"
  const maskImage =
    vNode.getComputedStylePropertyValue('-webkit-mask-image') ||
    vNode.getComputedStylePropertyValue('mask-image') ||
    'none';
  if (maskImage !== 'none') {
    return true;
  }

  // element with a mask-border value other than "none"
  const maskBorder =
    vNode.getComputedStylePropertyValue('-webkit-mask-border') ||
    vNode.getComputedStylePropertyValue('mask-border') ||
    'none';
  if (maskBorder !== 'none') {
    return true;
  }

  // elements with isolation set to "isolate"
  if (vNode.getComputedStylePropertyValue('isolation') === 'isolate') {
    return true;
  }

  // transform or opacity in will-change even if you don't specify values for these attributes directly
  const willChange = vNode.getComputedStylePropertyValue('will-change');
  if (willChange === 'transform' || willChange === 'opacity') {
    return true;
  }

  // elements with -webkit-overflow-scrolling set to "touch"
  if (
    vNode.getComputedStylePropertyValue('-webkit-overflow-scrolling') ===
    'touch'
  ) {
    return true;
  }

  // element with a contain value of "layout" or "paint" or a composite value
  // that includes either of them (i.e. contain: strict, contain: content).
  const contain = vNode.getComputedStylePropertyValue('contain');
  if (['layout', 'paint', 'strict', 'content'].includes(contain)) {
    return true;
  }

  // a flex item or gird item with a z-index value other than "auto", that is the parent element display: flex|inline-flex|grid|inline-grid,
  if (zIndex !== 'auto' && parentVNode) {
    const parentDsiplay = parentVNode.getComputedStylePropertyValue('display');
    if (
      [
        'flex',
        'inline-flex',
        'inline flex',
        'grid',
        'inline-grid',
        'inline grid'
      ].includes(parentDsiplay)
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Determine the stacking order of an element. The stacking order is an array of
 * zIndex values for each stacking context parent.
 * @param {VirtualNode}
 * @return {Number[]}
 */
function getStackingOrder(vNode, parentVNode) {
  const stackingOrder = parentVNode._stackingOrder.slice();
  const zIndex = vNode.getComputedStylePropertyValue('z-index');
  const positioned =
    vNode.getComputedStylePropertyValue('position') !== 'static';
  const floated = vNode.getComputedStylePropertyValue('float') !== 'none';

  if (positioned && !['auto', '0'].includes(zIndex)) {
    // if a positioned element has a z-index > 0, find the first
    // true stack (not a "fake" stack created from positioned or
    // floated elements without a z-index) and create a new stack at
    // that point (step #5 and step #8)
    // @see https://www.w3.org/Style/css2-updates/css2/zindex.html
    while (stackingOrder.find(value => value % 1 !== 0)) {
      const index = stackingOrder.findIndex(value => value % 1 !== 0);
      stackingOrder.splice(index, 1);
    }
    stackingOrder[stackingOrder.length - 1] = parseInt(zIndex);
  }
  if (isStackingContext(vNode, parentVNode)) {
    stackingOrder.push(0);
  }
  // if a positioned element has z-index: auto or 0 (step #8), or if
  // a non-positioned floating element (step #5), treat it as its
  // own stacking context
  // @see https://www.w3.org/Style/css2-updates/css2/zindex.html
  else if (positioned) {
    // Put positioned elements above floated elements
    stackingOrder.push(0.5);
  } else if (floated) {
    // Put floated elements above z-index: 0
    // (step #5 floating get sorted below step #8 positioned)
    stackingOrder.push(0.25);
  }

  return stackingOrder;
}

/**
 * Return the parent node that is a scroll region.
 * @param {VirtualNode}
 * @return {VirtualNode|null}
 */
function findScrollRegionParent(vNode, parentVNode) {
  let scrollRegionParent = null;
  const checkedNodes = [vNode];

  while (parentVNode) {
    if (getScroll(parentVNode.actualNode)) {
      scrollRegionParent = parentVNode;
      break;
    }

    if (parentVNode._scrollRegionParent) {
      scrollRegionParent = parentVNode._scrollRegionParent;
      break;
    }

    checkedNodes.push(parentVNode);
    parentVNode = getNodeFromTree(
      parentVNode.actualNode.parentElement || parentVNode.actualNode.parentNode
    );
  }

  // cache result of parent scroll region so we don't have to look up the entire
  // tree again for a child node
  checkedNodes.forEach(
    vNode => (vNode._scrollRegionParent = scrollRegionParent)
  );
  return scrollRegionParent;
}

/**
 * Add a node to every cell of the grid it intersects with.
 * @param {Grid}
 * @param {VirtualNode}
 */
function addNodeToGrid(grid, vNode) {
  const gridSize = constants.gridSize;
  vNode.clientRects.forEach(rect => {
    if (rect.right <= 0 || rect.bottom <= 0) {
      return;
    }
    // save a reference to where this element is in the grid so we
    // can find it even if it's in a subgrid
    vNode._grid ??= grid;
    const x = rect.left;
    const y = rect.top;

    // "| 0" is a faster way to do Math.floor
    // @see https://jsperf.com/math-floor-vs-math-round-vs-parseint/152
    const startRow = (y / gridSize) | 0;
    const startCol = (x / gridSize) | 0;
    const endRow = ((y + rect.height) / gridSize) | 0;
    const endCol = ((x + rect.width) / gridSize) | 0;

    grid.numCols = Math.max(grid.numCols ?? 0, endCol);

    for (let row = startRow; row <= endRow; row++) {
      grid.cells[row] = grid.cells[row] || [];

      for (let col = startCol; col <= endCol; col++) {
        grid.cells[row][col] = grid.cells[row][col] || [];

        if (!grid.cells[row][col].includes(vNode)) {
          grid.cells[row][col].push(vNode);
        }
      }
    }
  });
}
