import { getNodeFromTree } from '../../core/utils';
import getBackgroundStack from './get-background-stack';
import Color from './color';
import flattenColors from './flatten-colors';

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
    const stackingOrder = bgVNode._stackingOrder.filter(({ vNode }) => !!vNode);

    stackingOrder.forEach(({ vNode }, index) => {
      const ancestorVNode = stackingOrder[index - 1]?.vNode;
      const context = addToStackingContext(contextMap, vNode, ancestorVNode);

      if (index === 0 && !contextMap.get(vNode)) {
        stackingContext.unshift(context);
      }
      contextMap.set(vNode, context);
    });

    const ancestorVNode = stackingOrder[stackingOrder.length - 1]?.vNode;
    const context = addToStackingContext(contextMap, bgVNode, ancestorVNode);
    if (!stackingOrder.length) {
      stackingContext.unshift(context);
    }
    context.bgColor = bgColor;
  });

  vNode._stackingContext = stackingContext;
  return stackingContext;
}

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
    createStackingContext()
  );
  const color = flattenColors(fgColor, context.bgColor);
  color.alpha *= context.opacity;
  return {
    color,
    blendMode: context.blendMode
  };
}

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

function normalizeBlendMode(blendmode) {
  return !!blendmode ? blendmode : undefined;
}

function addToStackingContext(contextMap, vNode, ancestor) {
  const context = contextMap.get(vNode) ?? createStackingContext(vNode);
  const ancestorContext = contextMap.get(ancestor);
  if (
    ancestorContext &&
    ancestor !== vNode &&
    !ancestorContext.descendants.includes(context)
  ) {
    ancestorContext.descendants.unshift(context);
  }

  return context;
}

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

function getOwnBackgroundColor(vNode) {
  const bgColor = new Color();
  bgColor.parseString(vNode.getComputedStylePropertyValue('background-color'));

  return bgColor;
}
