import Color from './color';
import getBackgroundColor from './get-background-color';
import incompleteData from './incomplete-data';
import flattenColors from './flatten-colors';
import getTextShadowColors from './get-text-shadow-colors';
import getOpacity from './get-opacity';

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
  const opacity = getOpacity(node, nodeStyle);

  // Start with -webkit-text-stroke, it is rendered on top
  const strokeColor = getStrokeColor(nodeStyle, options);
  if (strokeColor && strokeColor.alpha * opacity === 1) {
    strokeColor.alpha = 1;
    return strokeColor;
  }

  // Next color / -webkit-text-fill-color
  const textColor = getTextColor(nodeStyle);
  let fgColor = strokeColor ? flattenColors(strokeColor, textColor) : textColor;
  if (fgColor.alpha * opacity === 1) {
    fgColor.alpha = 1;
    return fgColor;
  }

  // If text is (semi-)transparent shadows are visible through it.
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
