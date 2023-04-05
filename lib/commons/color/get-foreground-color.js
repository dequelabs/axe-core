import Color from './color';
import getBackgroundColor from './get-background-color';
import incompleteData from './incomplete-data';
import flattenColors from './flatten-colors';
import getTextShadowColors from './get-text-shadow-colors';
import { getStackingContext, stackingContextToColor } from './stacking-context';

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @method getForegroundColor
 * @memberof axe.commons.color
 * @instance
 * @param {Element} node
 * @param {Boolean} noScroll (default false)
 * @param {Color} bgColor
 * @param {Object} Options
 * @return {Color|null}
 *
 * @deprecated noScroll parameter
 */
export default function getForegroundColor(node, _, bgColor, options = {}) {
  const nodeStyle = window.getComputedStyle(node);

  const colorStack = [
    // Start with -webkit-text-stroke, it is rendered on top
    () => getStrokeColor(nodeStyle, options),
    // Next color / -webkit-text-fill-color
    () => getTextColor(nodeStyle),
    // If text is (semi-)transparent shadows are visible through it
    () => getTextShadowColors(node, { minRatio: 0 })
  ];
  let fgColors = [];

  for (const colorFn of colorStack) {
    const color = colorFn();
    if (!color) {
      continue;
    }

    fgColors = fgColors.concat(color);

    if (color.alpha === 1) {
      break;
    }
  }

  const fgColor = fgColors.reduce((source, backdrop) => {
    return flattenColors(source, backdrop);
  });

  // Lastly blend the background
  bgColor ??= getBackgroundColor(node, []);
  if (bgColor === null) {
    const reason = incompleteData.get('bgColor');
    incompleteData.set('fgColor', reason);
    return null;
  }

  const stackingContexts = getStackingContext(node);
  const context = findNodeInContexts(stackingContexts, node);
  return flattenColors(
    calculateBlendedForegroundColor(fgColor, context, stackingContexts),
    // default page background
    new Color(255, 255, 255, 1)
  );
}

function getTextColor(nodeStyle) {
  return new Color().parseString(
    nodeStyle.getPropertyValue('-webkit-text-fill-color') ||
      nodeStyle.getPropertyValue('color')
  );
}

function getStrokeColor(nodeStyle, { textStrokeEmMin = 0 }) {
  const strokeWidth = parseFloat(
    nodeStyle.getPropertyValue('-webkit-text-stroke-width')
  );
  if (strokeWidth === 0) {
    return null;
  }
  const fontSize = nodeStyle.getPropertyValue('font-size');
  const relativeStrokeWidth = strokeWidth / parseFloat(fontSize);
  if (isNaN(relativeStrokeWidth) || relativeStrokeWidth < textStrokeEmMin) {
    return null;
  }

  const strokeColor = nodeStyle.getPropertyValue('-webkit-text-stroke-color');
  return new Color().parseString(strokeColor);
}

/**
 * Blend a foreground color into the background stacking context, taking into account opacity at each step.
 * @param {Color} fgColor
 * @param {Object} context - The nodes stacking context
 * @param {Object[]} stackingContexts - Array of all stacking contexts
 * @return {Color}
 */
function calculateBlendedForegroundColor(fgColor, context, stackingContexts) {
  while (context) {
    // find the nearest ancestor that has opacity < 1
    if (context.opacity === 1 && context.ancestor) {
      context = context.ancestor;
      continue;
    }

    fgColor.alpha *= context.opacity;

    // when blending the foreground color to a background color with opacity,
    // we ignore the background color of the node itself and instead blend
    // with the stack behind it
    let stack = context.ancestor?.descendants || stackingContexts;
    if (context.opacity !== 1) {
      stack = stack.slice(0, stack.indexOf(context));
    }

    const bgColors = stack.map(stackingContextToColor);

    if (!bgColors.length) {
      context = context.ancestor;
      continue;
    }

    const bgColor = bgColors.reduce(
      (backdrop, source) => {
        return flattenColors(
          source.color,
          backdrop.color instanceof Color ? backdrop.color : backdrop
        );
      },
      {
        color: new Color(0, 0, 0, 0),
        blendMode: 'normal'
      }
    );

    fgColor = flattenColors(fgColor, bgColor);
    context = context.ancestor;
  }

  return fgColor;
}

/**
 * Find the stacking context that belongs to the passed in node
 * @param {Object} contexts - Array of stacking contexts
 * @param {Element} node
 * @returns {Object}
 */
function findNodeInContexts(contexts, node) {
  for (const context of contexts) {
    if (context.vNode?.actualNode === node) {
      return context;
    }

    const found = findNodeInContexts(context.descendants, node);
    if (found) {
      return found;
    }
  }
}
