import Color from './color';
import getBackgroundColor from './get-background-color';
import incompleteData from './incomplete-data';
import flattenColors from './flatten-colors';
import getTextShadowColors from './get-text-shadow-colors';
import { getNodeFromTree } from '../../core/utils';

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @method getForegroundColor
 * @memberof axe.commons.color
 * @instance
 * @param {Element} node
 * @param {Boolean} noScroll (default false)
 * @param {Color} bgColor
 * @param {Oj} Options
 * @return {Color|null}
 *
 * @deprecated noScroll parameter
 */
export default function getForegroundColor(node, _, bgColor, options = {}) {
  const nodeStyle = window.getComputedStyle(node);
  const opacity = getOpacity(node, nodeStyle);

  // Start with -webkit-text-stroke, it is rendered on top
  const strokeColor = getStrokeColor(nodeStyle, options);
  if (strokeColor && strokeColor.alpha * opacity === 1) {
    strokeColor.alpha = 1;
    return strokeColor;
  }

  // Next color / -text-stroke-color
  const textColor = getTextColor(nodeStyle);
  let fgColor = strokeColor ? flattenColors(strokeColor, textColor) : textColor;
  if (fgColor.alpha * opacity === 1) {
    fgColor.alpha = 1;
    return fgColor;
  }

  // If text is (semi-transparent) shadows are visible through it.
  const textShadowColors = getTextShadowColors(node, { minRatio: 0 });
  fgColor = textShadowColors.reduce((colorA, colorB) => {
    return flattenColors(colorA, colorB);
  }, fgColor);
  if (fgColor.alpha * opacity === 1) {
    fgColor.alpha = 1;
    return fgColor;
  }

  // Lastly, if text opacity still isn't at 1, blend the background
  bgColor ??= getBackgroundColor(node, []);
  if (bgColor === null) {
    const reason = incompleteData.get('bgColor');
    incompleteData.set('fgColor', reason);
    return null;
  }
  fgColor.alpha = fgColor.alpha * opacity;
  return flattenColors(fgColor, bgColor);
}

function getTextColor(nodeStyle) {
  return new Color().parseString(
    nodeStyle.getPropertyValue('-webkit-text-fill-color') ||
      nodeStyle.getPropertyValue('color')
  );
}

function getStrokeColor(nodeStyle, { minTextStroke = 0 }) {
  const strokeWidth = parseFloat(
    nodeStyle.getPropertyValue('-webkit-text-stroke-width')
  );
  if (strokeWidth === 0) {
    return null;
  }
  const relativeStrokeWidth =
    strokeWidth / parseFloat(nodeStyle.getPropertyValue('font-size'));
  if (isNaN(relativeStrokeWidth) || relativeStrokeWidth <= minTextStroke) {
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
