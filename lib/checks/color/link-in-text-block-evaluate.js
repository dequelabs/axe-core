import { getComposedParent } from '../../commons/dom';
import {
  getForegroundColor,
  getBackgroundColor,
  incompleteData
} from '../../commons/color';

function getContrast(color1, color2) {
  var c1lum = color1.getRelativeLuminance();
  var c2lum = color2.getRelativeLuminance();
  return (Math.max(c1lum, c2lum) + 0.05) / (Math.min(c1lum, c2lum) + 0.05);
}

const blockLike = [
  'block',
  'list-item',
  'table',
  'flex',
  'grid',
  'inline-block'
];
function isBlock(elm) {
  var display = window.getComputedStyle(elm).getPropertyValue('display');
  return blockLike.indexOf(display) !== -1 || display.substr(0, 6) === 'table-';
}

function linkInTextBlockEvaluate(node, options) {
  const { requiredContrastRatio } = options;

  if (isBlock(node)) {
    return false;
  }

  var parentBlock = getComposedParent(node);
  while (parentBlock && parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
    parentBlock = getComposedParent(parentBlock);
  }

  if (!parentBlock) {
    return undefined;
  }

  this.relatedNodes([parentBlock]);

  // Capture colors
  var nodeColor = getForegroundColor(node);
  var parentColor = getForegroundColor(parentBlock);
  var nodeBackgroundColor = getBackgroundColor(node);
  var parentBackgroundColor = getBackgroundColor(parentBlock);

  // Compute contrasts, giving preference to foreground color and doing as little work as possible
  var textContrast =
    nodeColor && parentColor ? getContrast(nodeColor, parentColor) : undefined;

  if (textContrast && textContrast >= requiredContrastRatio) {
    return true;
  }

  var backgroundContrast =
    nodeBackgroundColor && parentBackgroundColor
      ? getContrast(nodeBackgroundColor, parentBackgroundColor)
      : undefined;

  if (backgroundContrast && backgroundContrast >= requiredContrastRatio) {
    return true;
  }

  // Report incomplete instead of failure if we're not sure
  if (!backgroundContrast) {
    var reason = incompleteData.get('bgColor') ?? 'bgContrast';
    this.data({
      messageKey: reason
    });
    incompleteData.clear();
    return undefined;
  }

  if (!textContrast) {
    return undefined;
  }

  // Report bgContrast only if the background changes but text color stays the same
  if (textContrast === 1.0 && backgroundContrast > 1.0) {
    this.data({
      messageKey: 'bgContrast',
      contrastRatio: backgroundContrast,
      requiredContrastRatio,
      nodeBackgroundColor,
      parentBackgroundColor
    });
    return false;
  }

  this.data({
    messageKey: 'fgContrast',
    contrastRatio: textContrast,
    requiredContrastRatio,
    nodeColor,
    parentColor
  });
  return false;
}

export default linkInTextBlockEvaluate;
