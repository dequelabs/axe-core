import Color from './color';
import getBackgroundColor from './get-background-color';
import incompleteData from './incomplete-data';
import flattenColors from './flatten-colors';
import getTextShadowColors from './get-text-shadow-colors';
import { getNodeFromTree } from '../../core/utils';
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
  // const opacity = getOpacity(node, nodeStyle);

  const colorStack = [
    // Start with -webkit-text-stroke, it is rendered on top
    () => getStrokeColor(nodeStyle, options),
    // Next color / -webkit-text-fill-color
    () => getTextColor(nodeStyle),
    // If text is (semi-)transparent shadows are visible through it
    () => getTextShadowColors(node, { minRatio: 0 }),
    () => bgColor ?? getBackgroundColor(node, [])
  ];
  let fgColors = [];

  for (let i = 0; i < colorStack.length; i++) {
    const color = colorStack[i]();
    if (!color) {
      continue;
    }

    fgColors = fgColors.concat(color);

    if (color.alpha === 1) {
      break;
    }
  }

  const fgColor = fgColors.reduce((source, backdrop) => {
    return flattenColors(source, backdrop)
  }, new Color(0,0,0,0));


  // // Start with -webkit-text-stroke, it is rendered on top
  // const strokeColor = getStrokeColor(nodeStyle, options);
  // if (strokeColor && strokeColor.alpha === 1 && opacity === 1) {
  //   strokeColor.alpha = 1;
  //   return strokeColor;
  // }

  // // Next color / -webkit-text-fill-color
  // const textColor = getTextColor(nodeStyle);
  // let fgColor = strokeColor ? flattenColors(strokeColor, textColor) : textColor;
  // if (opacity === 1 && fgColor.alpha === 1) {
  //   fgColor.alpha = 1;
  //   return fgColor;
  // }

  // // If text is (semi-)transparent shadows are visible through it.
  // const textShadowColors = getTextShadowColors(node, { minRatio: 0 });
  // fgColor = textShadowColors.reduce((colorA, colorB) => {
  //   return flattenColors(colorA, colorB);
  // }, fgColor);
  // if (opacity === 1 && fgColor.alpha === 1) {
  //   fgColor.alpha = 1;
  //   return fgColor;
  // }

  // Lastly, if text opacity still isn't at 1, blend the background
  bgColor ??= getBackgroundColor(node, []);
  if (bgColor === null) {
    const reason = incompleteData.get('bgColor');
    incompleteData.set('fgColor', reason);
    return null;
  }
  // fgColor.alpha = fgColor.alpha;
  // return flattenColors(fgColor, bgColor);
  const stackingContexts = axe.commons.color.getStackingContext(node);
  stackingContexts.forEach(context => addAncestor(context));

  const context = findContext(stackingContexts, node);
  return flattenColors(
    getFgColor(fgColor, context, stackingContexts),
    // TODO: page bg
    new Color(255,255,255,1)
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

function getOpacity(node, nodeStyle) {
  if (!node) {
    return 1;
  }

  const vNode = getNodeFromTree(node);
  if (vNode && vNode._opacity !== undefined && vNode._opacity !== null) {
    return vNode._opacity;
  }

  nodeStyle ??= window.getComputedStyle(node);
  const opacity = nodeStyle.getPropertyValue('opacity');
  const finalOpacity = opacity * getOpacity(node.parentElement);

  // cache the results of the getOpacity check on the parent tree
  // so we don't have to look at the parent tree again for all its
  // descendants
  if (vNode) {
    vNode._opacity = finalOpacity;
  }

  return finalOpacity;
}




    function getFgColor(fgColor, context, stackingContexts) {
      while (context) {
        if (context.opacity === 1 && context.ancestor) {
          context = context.ancestor;
          continue;
        }

        let stack = context.ancestor?.descendants || stackingContexts;
        if (context.opacity !== 1) {
          stack = stack
          .slice(0, stack.indexOf(context))
        }

        let bgColors = stack
          .map(axe.commons.color.stackingContextToColor);

        if (!bgColors.length) {
          fgColor.alpha *= context.opacity;
          if (!context.ancestor) {
            break;
          }

          context = context.ancestor;
          continue;
        }

        const bgColor = bgColors.reduce((backdrop, source) => {
          return flattenColors(
            source.color,
            backdrop.color instanceof Color ? backdrop.color : backdrop
          );
        }, {
          color: new Color(0,0,0,0),
          blendMode: 'normal'
        });

        fgColor.alpha *= context.opacity;
        fgColor = flattenColors(
          fgColor,
          bgColor
        );

        if (!context.ancestor) {
          break;
        }

        context = context.ancestor;
      }

      return fgColor;
    }

    function addAncestor(child, parent) {
      child.ancestor = parent;
      child.descendants.forEach(node => addAncestor(node, child));
    }

    function findContext(contexts, node) {
      for (let i = 0; i < contexts.length; i++) {
        const context = contexts[i];
        if (context.vNode?.actualNode === node) return context;

        const found = findContext(context.descendants, node);
        if (found) return found;
      }
    }

    function findAncestor(context, predicate) {
      let c = context;
      while (c && !Array.isArray(c)) {
        if (predicate(c)) return c;
        c = c.ancestor;
      }
    }