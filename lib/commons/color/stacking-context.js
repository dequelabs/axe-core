import { getNodeFromTree } from '../../core/utils';
import getBackgroundStack from './get-background-stack';
import Color from './color';
import flattenColors from './flatten-colors';

/**
 * Create a stacking context object for an element.
 *
 * @example
 * Given the following HTML structure:
 *
 * <div id="parent" style="background-color: red; opacity: 0.8">
 *   <div id="target" style="background-color: rgba(0,255,0,0.5)">Text</div>
 * <div>
 *
 * The code produces the following stacking context object:
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
 * @param {Node} elm
 * @param {Node[]} [elmStack] - Optional element stack array to save on computing it again.
 * @return {Object}
 */
export function getStackingContext(elm, elmStack) {
  const vNode = getNodeFromTree(elm);
  if (vNode._stackingContext) {
    return vNode._stackingContext;
  }

  const stackingContext = [];
  const contextMap = new Map();
  elmStack = elmStack ?? getBackgroundStack(elm);

  elmStack.forEach(bgElm => {
    const bgVNode = getNodeFromTree(bgElm);
    const bgColor = getOwnBackgroundColor(bgVNode);

    /*
      remove the ROOT_ORDER element to treat
      all root stacks and first-order stacks
      at the same level (instead of nesting
      the first-order stack inside the
      root stack)

      e.g. an element that creates a
      non-positioned stacking context at the
      root level should be a sibling to root
      level elements that do not create a
      stacking context
     */
    const stackingOrder = bgVNode._stackingOrder.filter(({ vNode }) => !!vNode);

    // create a stacking context for each
    // node in the stacking order
    stackingOrder.forEach(({ vNode }, index) => {
      const ancestorVNode = stackingOrder[index - 1]?.vNode;
      const context = addToStackingContext(contextMap, vNode, ancestorVNode);

      if (index === 0 && !contextMap.get(vNode)) {
        stackingContext.unshift(context);
      }
      contextMap.set(vNode, context);
    });

    // create a stacking context for the
    // current node
    const ancestorVNode = stackingOrder[stackingOrder.length - 1]?.vNode;
    const context = addToStackingContext(contextMap, bgVNode, ancestorVNode);
    if (!stackingOrder.length) {
      stackingContext.unshift(context);
    }

    // only assign the color to the current
    // node so we don't apply any background
    // colors from ancestor nodes that are
    // not part of the element stack
    context.bgColor = bgColor;
  });

  vNode._stackingContext = stackingContext;
  return stackingContext;
}

/**
 * Transform a stacking context object into a Color.
 * @param {Object} context
 * @return {Object}
 */
export function stackingContextToColor(context) {
  if (!context.descendants?.length) {
    const color = context.bgColor;
    color.alpha *= context.opacity;

    return {
      color,
      blendMode: context.blendMode
    };
  }

  const fgColor = context.descendants.reduce(
    reduceToColor,
    // ensure an array with a single context
    // is reduced to a color by passing in an
    // empty stacking context
    createStackingContext()
  );
  const color = flattenColors(
    fgColor,
    context.bgColor,
    context.descendants[0].blendMode
  );
  color.alpha *= context.opacity;

  // carry forward the mix-blind-mode property
  // so background color algorithm can use it
  // to flatten multiple contexts together
  return {
    color,
    blendMode: context.blendMode
  };
}

/**
 * Reduce two context objects into a Color by blending them together
 * @param {Object} bgContext
 * @param {Object} fgContext
 * @return {Color}
 */
function reduceToColor(bgContext, fgContext) {
  let bgColor;
  if (bgContext instanceof Color) {
    bgColor = bgContext;
  } else {
    bgColor = stackingContextToColor(bgContext).color;
  }

  const fgColor = stackingContextToColor(fgContext).color;
  return flattenColors(fgColor, bgColor, fgContext.blendMode);
}

/**
 * Create a stacking context object for a virtual node.
 * @param {VirtualNode} vNod
 * @return {Object}
 */
function createStackingContext(vNode) {
  return {
    vNode: vNode,
    opacity: parseFloat(vNode?.getComputedStylePropertyValue('opacity') ?? 1),
    bgColor: new Color(0, 0, 0, 0),
    blendMode: normalizeBlendMode(
      vNode?.getComputedStylePropertyValue('mix-blend-mode')
    ),
    descendants: []
  };
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
  const context = contextMap.get(vNode) ?? createStackingContext(vNode);
  const ancestorContext = contextMap.get(ancestorVNode);
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
