import { getNodeFromTree } from '../../core/utils';
import getBackgroundStack from './get-background-stack';
import Color from './color';
import flattenColors from './flatten-colors';

/**
 * Create a stacking context hierarchy tree for an element. This structure closely mimics the painting order of a page.
 * @see https://www.w3.org/TR/CSS22/zindex.html#painting-order
 *
 * @example
 * Given the following HTML structure:
 *
 * <div id="parent" style="background-color: red; opacity: 0.8">
 *   <div id="target" style="background-color: rgba(0,255,0,0.5)">Text</div>
 * <div>
 *
 * Produces the following stacking context tree. Since the #parent element creates a stacking context due to `opacity`, the #target element's stacking context belongs under the #parent's context.
 *
 * [
 *   {
 *     vNode: #parent,
 *     opacity: 0.8,
 *     blendMode: 'normal',
 *     bgColor: Color(255,0,0,1),
 *     descendants: [
 *       {
 *         vNode: #target,
 *         opacity: 1,
 *         blendMode: 'normal',
 *         bgColor: Color(0,255,0,0.5),
 *         descendants: []
 *       }
 *     ]
 *   }
 * ]
 *
 * The stacking context hierarchy tree does not mimic the HTML structure. That is, elements that are on the same context level are siblings in the stacking context tree even if they have a parent/child HTML relationship.
 *
 * For example, given the following HTML structure:
 *
 * <main>
 *  <header style="position: relative; z-index: 1;">
 *    <h1><span>Hello World</span></h1>
 *  </header>
 * </main>
 * <p>Lorium ipsum <a href="#">dolores</a>...</p>
 *
 * Produces the following tree structure:
 *
 * body
 * - main
 * - header
 *   - h1
 *   - span
 * - p
 * - a
 *
 * @param {Node} elm
 * @param {Node[]} [elmStack] - Optional element stack array to save on computing it again.
 * @return {Object}
 */
export function getStackingContext(elm, elmStack) {
  const virtualNode = getNodeFromTree(elm);
  if (virtualNode._stackingContext) {
    return virtualNode._stackingContext;
  }

  const stackingContext = [];
  const contextMap = new Map();
  elmStack = elmStack ?? getBackgroundStack(elm);

  elmStack.forEach(bgElm => {
    const bgVNode = getNodeFromTree(bgElm);
    const bgColor = getOwnBackgroundColor(bgVNode);

    /*
      remove the ROOT_ORDER element to treat all root stacks and first-order
      stacks at the same level (instead of nesting the first-order stack inside
      the root stack)

      e.g. an element that creates a non-positioned stacking context at the
      root level should be a sibling to root level elements that do not create
      a stacking context
     */
    const stackingOrder = bgVNode._stackingOrder.filter(({ vNode }) => !!vNode);

    // create a stacking context for each node in the stacking order
    stackingOrder.forEach(({ vNode }, index) => {
      const ancestorVNode = stackingOrder[index - 1]?.vNode;
      const context = addToStackingContext(contextMap, vNode, ancestorVNode);

      if (index === 0 && !contextMap.get(vNode)) {
        stackingContext.unshift(context);
      }
      contextMap.set(vNode, context);
    });

    // create a stacking context for the current node
    const ancestorVNode = stackingOrder[stackingOrder.length - 1]?.vNode;
    const context = addToStackingContext(contextMap, bgVNode, ancestorVNode);
    if (!stackingOrder.length) {
      stackingContext.unshift(context);
    }

    // only assign the color to the current node so we don't apply any
    // background colors from ancestor nodes that are not part of the element
    // stack
    context.bgColor = bgColor;
  });

  virtualNode._stackingContext = stackingContext;
  return stackingContext;
}

/**
 * Transform a stacking context object into a Color.
 * @param {Object} context
 * @return {Object}
 */
export function stackingContextToColor(context) {
  if (!context.descendants?.length) {
    const color = applyBrightness(context.bgColor, context.brightness);
    color.alpha *= context.opacity;

    return {
      color,
      blendMode: context.blendMode
    };
  }

  const sourceColor = context.descendants.reduce(
    reduceToColor,
    // ensure an array with a single context is reduced to a color by passing
    // in an empty stacking context
    createStackingContext()
  );
  const color = applyBrightness(
    flattenColors(
      sourceColor,
      context.bgColor,
      context.descendants[0].blendMode
    ),
    context.brightness
  );
  color.alpha *= context.opacity;

  // carry forward the mix-blind-mode property so background color algorithm
  // can use it to flatten multiple contexts together
  return {
    color,
    blendMode: context.blendMode
  };
}

/**
 * Reduce two context objects into a Color by blending them together
 * @param {Object} backdropContext
 * @param {Object} sourceContext
 * @return {Color}
 */
function reduceToColor(backdropContext, sourceContext) {
  let backdrop;
  if (backdropContext instanceof Color) {
    backdrop = backdropContext;
  } else {
    backdrop = stackingContextToColor(backdropContext).color;
  }

  const sourceColor = stackingContextToColor(sourceContext).color;
  return flattenColors(sourceColor, backdrop, sourceContext.blendMode);
}

/**
 * Create a stacking context object for a virtual node.
 * @param {VirtualNode} vNode
 * @param {Object} ancestorContext
 * @return {Object}
 */
function createStackingContext(vNode, ancestorContext) {
  return {
    vNode: vNode,
    ancestor: ancestorContext,
    opacity: parseFloat(vNode?.getComputedStylePropertyValue('opacity') ?? 1),
    brightness: getFilterBrightness(vNode),
    bgColor: new Color(0, 0, 0, 0),
    blendMode: normalizeBlendMode(
      vNode?.getComputedStylePropertyValue('mix-blend-mode')
    ),
    descendants: []
  };
}

/**
 * Multiply the red, green and blue channels of a color by a `brightness()`
 * filter amount. Returns the same color if the amount is 1.
 * @see https://drafts.fxtf.org/filter-effects/#brightnessEquivalent
 * @param {Color} color
 * @param {Number} brightness
 * @return {Color}
 */
export function applyBrightness(color, brightness = 1) {
  if (brightness === 1) {
    return color;
  }

  const brightColor = new Color(color);
  brightColor.r = Math.min(color.r * brightness, 1);
  brightColor.g = Math.min(color.g * brightness, 1);
  brightColor.b = Math.min(color.b * brightness, 1);
  return brightColor;
}

/**
 * Get the combined amount of the `brightness()` functions of a node's
 * `filter`. Returns 1 if the filter uses any other function, or is set on
 * html; those are not supported.
 * @see https://github.com/dequelabs/axe-core/issues/4610
 * @param {VirtualNode} vNode
 * @return {Number}
 */
function getFilterBrightness(vNode) {
  // html is not an ancestor of the other stacking contexts, so its filter
  // could only be applied to its own background
  if (vNode?.actualNode === document.documentElement) {
    return 1;
  }

  const filter = vNode?.getComputedStylePropertyValue('filter');
  if (!filter || filter === 'none') {
    return 1;
  }

  let brightness = 1;
  const functions = filter.trim().split(/\s+(?![^(]*\))/);
  for (const filterFunction of functions) {
    const match = filterFunction.match(/^brightness\(\s*([^)]*?)\s*\)$/);
    if (!match) {
      return 1;
    }
    brightness *= parseFilterAmount(match[1]);
  }
  return isNaN(brightness) ? 1 : brightness;
}

/**
 * Parse the amount of a filter function, a number or a percentage.
 * An omitted amount defaults to 1.
 * @param {String} amount
 * @return {Number}
 */
function parseFilterAmount(amount) {
  if (amount === '') {
    return 1;
  }
  const value = parseFloat(amount);
  return amount.endsWith('%') ? value / 100 : value;
}

/**
 * Normalize a mix-blend-mode CSS value
 * @param {String} blendmode
 * @return {String|undefined}
 */
function normalizeBlendMode(blendmode) {
  return !!blendmode ? blendmode : undefined;
}

/**
 * Create a stacking context for a virtual node and add it as a descendant of an ancestor's context.
 * @param {Map} contextMap
 * @param {VirtualNode} vNode
 * @param {VirtualNode} ancestorVNode
 * @return {Object}
 */
function addToStackingContext(contextMap, vNode, ancestorVNode) {
  const ancestorContext = contextMap.get(ancestorVNode);
  const context =
    contextMap.get(vNode) ?? createStackingContext(vNode, ancestorContext);
  if (
    ancestorContext &&
    ancestorVNode !== vNode &&
    !ancestorContext.descendants.includes(context)
  ) {
    ancestorContext.descendants.unshift(context);
  }

  return context;
}

/**
 * Get the background color for a virtual node
 * @param {VirtualNode} vNode
 * @return {Color}
 */
function getOwnBackgroundColor(vNode) {
  const bgColor = new Color();
  bgColor.parseString(vNode.getComputedStylePropertyValue('background-color'));

  return bgColor;
}
