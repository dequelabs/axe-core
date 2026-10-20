import isVisibleOnScreen from './is-visible-on-screen';
import { getBoundingRect } from '../math/get-bounding-rect';
import { isPointInRect } from '../math/is-point-in-rect';
import VirtualNode from '../../core/base/virtual-node/virtual-node';
import { getNodeFromTree, getScroll, isShadowRoot } from '../../core/utils';
import constants from '../../core/constants';
import cache from '../../core/base/cache';
import assert from '../../core/utils/assert';
import getOverflowHiddenAncestors from './get-overflow-hidden-ancestors';
import memoize from '../../core/utils/memoize';
import { getIntersectionRect } from '../math';

const ROOT_LEVEL = 0;
const FLOAT_LEVEL = 0.1;
const DEFAULT_LEVEL = 0.2;
const CONTAINING_BLOCK_PROPERTIES = [
  'transform',
  'translate',
  'rotate',
  'scale',
  'perspective',
  'filter',
  'backdrop-filter'
];
const CONTAINING_BLOCK_CONTAIN_VALUES = [
  'layout',
  'paint',
  'strict',
  'content'
];
const CONTAINING_BLOCK_WILL_CHANGE_PROPERTIES = [
  ...CONTAINING_BLOCK_PROPERTIES,
  'transform-style',
  'contain'
];
let nodeIndex = 0;

/**
 * Setup the 2d grid and add every element to it, even elements not
 * included in the flat tree
 * @returns gridSize
 */
export default function createGrid(
  root = document.body,
  rootGrid,
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

    nodeIndex = 0;
    vNode._stackingOrder = [
      createStackingContext(ROOT_LEVEL, true, nodeIndex++, null)
    ];
    rootGrid ??= new Grid();
    addNodeToGrid(rootGrid, vNode);

    if (getScroll(vNode.actualNode)) {
      const subGrid = new Grid(vNode);
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

    if (vNode && vNode.parent) {
      parentVNode = vNode.parent;
    }
    // Elements with an assigned slot need to be a child of the slot element
    else if (node.assignedSlot) {
      parentVNode = getNodeFromTree(node.assignedSlot);
    }
    // An SVG in IE11 does not have a parentElement but instead has a
    // parentNode. but parentNode could be a shadow root so we need to
    // verify it's in the tree first
    else if (node.parentElement) {
      parentVNode = getNodeFromTree(node.parentElement);
    } else if (node.parentNode && getNodeFromTree(node.parentNode)) {
      parentVNode = getNodeFromTree(node.parentNode);
    }

    if (!vNode) {
      vNode = new axe.VirtualNode(node, parentVNode);
    }

    vNode._stackingOrder = createStackingOrder(vNode, parentVNode, nodeIndex++);

    const grid = getGrid(vNode) ?? rootGrid;

    if (getScroll(vNode.actualNode)) {
      const subGrid = new Grid(vNode);
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
  if (zIndex !== 'auto' && isFlexOrGridContainer(parentVNode)) {
    return true;
  }

  return false;
}

/**
 * Determine if element is a flex or grid container.
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isFlexOrGridContainer(vNode) {
  if (!vNode) {
    return false;
  }

  const display = vNode.getComputedStylePropertyValue('display');
  return ['flex', 'inline-flex', 'grid', 'inline-grid'].includes(display);
}

/**
 * Determine the stacking order of an element. The stacking order is an array of
 * stacking contexts in ancestor order.
 * @param {VirtualNode} vNode
 * @param {VirtualNode} parentVNode
 * @param {Number} treeOrder
 * @return {Number[]}
 */
function createStackingOrder(vNode, parentVNode, treeOrder) {
  const stackingOrder = parentVNode._stackingOrder.slice();

  // if an element is positioned or creates a stacking context, find the first
  // true stack (not a pseudo stack created from positioned or floated elements
  // without a z-index) and create a new stack at that point (step #5 and step #8)
  // @see https://www.w3.org/TR/CSS2/zindex.html
  const isRealStack = isStackingContext(vNode, parentVNode);
  const isPositioned =
    vNode.getComputedStylePropertyValue('position') !== 'static';

  if (isRealStack || isPositioned) {
    const firstPseudo = stackingOrder.findIndex(({ pseudo }) => !!pseudo);
    if (firstPseudo !== -1) {
      stackingOrder.splice(firstPseudo);
    }
  }

  const stackLevel = getStackLevel(vNode, parentVNode);
  if (stackLevel !== null) {
    // pseudo only if this element does not create a real stacking context
    stackingOrder.push(
      createStackingContext(stackLevel, !isRealStack, treeOrder, vNode)
    );
  }
  return stackingOrder;
}

/**
 * Create a stacking context, keeping track of the stack level, tree order, and virtual
 * node container.
 * @see https://www.w3.org/TR/CSS2/zindex.html
 * @see https://www.w3.org/TR/CSS2/visuren.html#layers
 * @param {Number} stackLevel - The stack level of the stacking context
 * @param {Boolean} pseudo - If the stack is a pseudo stack or a true stack
 * @param {Number} treeOrder - The elements depth-first traversal order
 * @param {VirtualNode} vNode - The virtual node that is the container for the stacking context
 */
function createStackingContext(stackLevel, pseudo, treeOrder, vNode) {
  return {
    stackLevel,
    pseudo,
    treeOrder,
    vNode
  };
}

/**
 * Calculate the level of the stacking context.
 * @param {VirtualNode} vNode - The virtual node container of the stacking context
 * @param {VirtualNode} parentVNode - The parent virtual node of the vNode
 * @return {Number|null}
 */
function getStackLevel(vNode, parentVNode) {
  const zIndex = getRealZIndex(vNode, parentVNode);
  if (!['auto', '0'].includes(zIndex)) {
    return parseInt(zIndex);
  }

  // step #5 floating elements are sorted below step #8, even if the floating
  // element is itself a stacking context (real or pseudo)
  if (vNode.getComputedStylePropertyValue('float') !== 'none') {
    return FLOAT_LEVEL;
  }

  // step #8 both real and pseudo stacks get sorted at the same layer
  const isRealStack = isStackingContext(vNode, parentVNode);
  const isPseudoStack =
    vNode.getComputedStylePropertyValue('position') !== 'static';

  if (isRealStack || isPseudoStack) {
    return DEFAULT_LEVEL;
  }

  return null;
}

/**
 * Calculate the z-index value of a node taking into account when doesn't apply.
 * @param {VirtualNode} vNode - The virtual node to get z-index of
 * @param {VirtualNode} parentVNode - The parent virtual node of the vNode
 * @return {Number|'auto'}
 */
function getRealZIndex(vNode, parentVNode) {
  const position = vNode.getComputedStylePropertyValue('position');
  if (position === 'static' && !isFlexOrGridContainer(parentVNode)) {
    // z-index is ignored on position:static, except if on a flex or grid
    // @see https://www.w3.org/TR/css-flexbox-1/#painting
    // @see https://www.w3.org/TR/css-grid-1/#z-order
    return 'auto';
  }
  return vNode.getComputedStylePropertyValue('z-index');
}

/**
 * Return the grid a node belongs in: the scroll region grid of its parent (or
 * of its containing block, if the node is absolutely positioned), else the
 * grid that parent or containing block belongs in. Falls back to the
 * ancestors when the parent has no _grid, which is only set on nodes added to
 * the grid, so descendants of zero-size, display: contents or hidden nodes
 * still find the right grid. Returns null for the root grid.
 * @param {VirtualNode} vNode
 * @return {Grid|null}
 */
const getGrid = memoize(
  function getGridMemoized(vNode) {
    let anchor = getParent(vNode);
    if (!anchor) {
      return null;
    }
    if (vNode.getComputedStylePropertyValue('position') === 'absolute') {
      anchor = getContainingBlock(anchor);
    }
    return anchor._subGrid ?? anchor._grid ?? getGrid(anchor);
  },
  { primitive: true }
);

/**
 * Return the containing block that an absolutely positioned child of vNode is
 * positioned against: vNode if it establishes one, otherwise its nearest
 * ancestor that does, or its topmost ancestor if none do.
 * @see https://www.w3.org/TR/css-position-3/#absolute-cb
 * @param {VirtualNode} vNode
 * @return {VirtualNode}
 */
const getContainingBlock = memoize(
  function getContainingBlockMemoized(vNode) {
    const parent = getParent(vNode);
    if (!parent || isAbsolutePositioningContainingBox(vNode)) {
      return vNode;
    }
    return getContainingBlock(parent);
  },
  { primitive: true }
);

/**
 * Return the parent of a node in the tree, or its DOM parent if the tree is
 * rooted below it. An SVG in IE11 has no parentElement, only a parentNode.
 * @param {VirtualNode} vNode
 * @return {VirtualNode|undefined}
 */
function getParent(vNode) {
  if (vNode.parent) {
    return vNode.parent;
  }

  return getNodeFromTree(
    vNode.actualNode.parentElement || vNode.actualNode.parentNode
  );
}

/**
 * Determine if an element establishes an absolute positioning containing
 * block for its position: absolute descendants.
 * @see https://www.w3.org/TR/css-position-3/#absolute-cb
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isAbsolutePositioningContainingBox(vNode) {
  // positioned elements (relative, absolute, fixed or sticky)
  if (vNode.getComputedStylePropertyValue('position') !== 'static') {
    return true;
  }

  // position in will-change, which hints at a non-static position
  if (getWillChange(vNode).includes('position')) {
    return true;
  }

  // anything that contains fixed descendants also contains absolute ones
  return isFixedPositioningContainingBox(vNode);
}

/**
 * Determine if an element establishes a fixed positioning containing block,
 * so its position: fixed descendants are positioned against it rather than
 * the viewport. These elements also contain position: absolute descendants.
 * @see https://www.w3.org/TR/css-position-3/#fixed-cb
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Containing_block
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isFixedPositioningContainingBox(vNode) {
  // elements with a transform, translate, rotate, scale, perspective, filter
  // or backdrop-filter value other than "none"
  const hasContainingBlockProperty = CONTAINING_BLOCK_PROPERTIES.some(
    property => {
      const value = vNode.getComputedStylePropertyValue(property);
      return value && value !== 'none';
    }
  );
  if (hasContainingBlockProperty) {
    return true;
  }

  // elements with transform-style set to "preserve-3d"
  if (
    vNode.getComputedStylePropertyValue('transform-style') === 'preserve-3d'
  ) {
    return true;
  }

  // elements with layout or paint containment, either directly (layout, paint,
  // strict, content) or from a content-visibility value other than "visible"
  const contain = vNode.getComputedStylePropertyValue('contain').split(' ');
  if (contain.some(value => CONTAINING_BLOCK_CONTAIN_VALUES.includes(value))) {
    return true;
  }

  const contentVisibility =
    vNode.getComputedStylePropertyValue('content-visibility');
  if (contentVisibility && contentVisibility !== 'visible') {
    return true;
  }

  // any of the above properties in will-change, even if not set
  return getWillChange(vNode).some(property =>
    CONTAINING_BLOCK_WILL_CHANGE_PROPERTIES.includes(property)
  );
}

/**
 * Return the properties listed in an element's will-change value.
 * @param {VirtualNode} vNode
 * @return {String[]}
 */
function getWillChange(vNode) {
  return vNode
    .getComputedStylePropertyValue('will-change')
    .split(',')
    .map(property => property.trim());
}

/**
 * Add a node to every cell of the grid it intersects with.
 * @param {Grid}
 * @param {VirtualNode}
 */
function addNodeToGrid(grid, vNode) {
  const overflowHiddenNodes = getOverflowHiddenAncestors(vNode);

  vNode.clientRects.forEach(clientRect => {
    // ignore any rects that are outside the bounds of overflow hidden ancestors
    const visibleRect = overflowHiddenNodes.reduce((rect, overflowNode) => {
      return rect && getIntersectionRect(rect, overflowNode.boundingClientRect);
    }, clientRect);

    if (!visibleRect) {
      return;
    }

    // save a reference to where this element is in the grid so we
    // can find it even if it's in a subgrid
    vNode._grid ??= grid;
    const gridRect = grid.getGridPositionOfRect(visibleRect);
    grid.loopGridPosition(gridRect, gridCell => {
      if (!gridCell.includes(vNode)) {
        gridCell.push(vNode);
      }
    });
  });
}

class Grid {
  constructor(container = null) {
    this.container = container;
    this.cells = [];
  }

  /**
   * Convert x or y coordinate from rect, to a position in the grid
   * @param {number}
   * @returns {number}
   */
  toGridIndex(num) {
    return Math.floor(num / constants.gridSize);
  }

  /**
   * Return an an array of nodes available at a particular grid coordinate
   * @param {DOMPoint} gridPosition
   * @returns {Array<AbstractVirtualNode>}
   */
  getCellFromPoint({ x, y }) {
    assert(this.boundaries, 'Grid does not have cells added');
    const rowIndex = this.toGridIndex(y);
    const colIndex = this.toGridIndex(x);
    assert(
      isPointInRect({ y: rowIndex, x: colIndex }, this.boundaries),
      'Element midpoint exceeds the grid bounds'
    );
    const row = this.cells[rowIndex - this.cells._negativeIndex] ?? [];
    return row[colIndex - row._negativeIndex] ?? [];
  }

  /**
   * Loop over all cells within the gridPosition rect
   * @param {DOMRect} gridPosition
   * @param {Function} callback
   */
  loopGridPosition(gridPosition, callback) {
    const { left, right, top, bottom } = gridPosition;
    if (this.boundaries) {
      gridPosition = getBoundingRect(this.boundaries, gridPosition);
    }
    this.boundaries = gridPosition;

    loopNegativeIndexMatrix(this.cells, top, bottom, (gridRow, row) => {
      loopNegativeIndexMatrix(gridRow, left, right, (gridCell, col) => {
        callback(gridCell, { row, col });
      });
    });
  }

  /**
   * Scale the rect to the position within the grid
   * @param {DOMRect} clientOrBoundingRect
   * @param {number} margin Offset outside the rect, default 0
   * @returns {DOMRect} gridPosition
   */
  getGridPositionOfRect({ top, right, bottom, left }, margin = 0) {
    top = this.toGridIndex(top - margin);
    right = this.toGridIndex(right + margin - 1);
    bottom = this.toGridIndex(bottom + margin - 1);
    left = this.toGridIndex(left - margin);
    return new window.DOMRect(left, top, right - left, bottom - top);
  }
}

// handle negative row/col values
function loopNegativeIndexMatrix(matrix, start, end, callback) {
  matrix._negativeIndex ??= 0;
  // Shift the array when start is negative
  if (start < matrix._negativeIndex) {
    for (let i = 0; i < matrix._negativeIndex - start; i++) {
      matrix.splice(0, 0, []);
    }
    matrix._negativeIndex = start;
  }

  const startOffset = start - matrix._negativeIndex;
  const endOffset = end - matrix._negativeIndex;
  for (let index = startOffset; index <= endOffset; index++) {
    matrix[index] ??= [];
    callback(matrix[index], index + matrix._negativeIndex);
  }
}
