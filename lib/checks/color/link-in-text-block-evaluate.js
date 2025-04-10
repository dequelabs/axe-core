import { getComposedParent } from '../../commons/dom';
import {
  getForegroundColor,
  getBackgroundColor,
  incompleteData
} from '../../commons/color';

function getContrast(color1, color2) {
  const c1lum = color1.getRelativeLuminance();
  const c2lum = color2.getRelativeLuminance();
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
  const display = window.getComputedStyle(elm).getPropertyValue('display');
  return blockLike.indexOf(display) !== -1 || display.substr(0, 6) === 'table-';
}

function linkInTextBlockEvaluate(node, options) {
  const { requiredContrastRatio, allowSameColor } = options;

  if (isBlock(node)) {
    return false;
  }

  let parentBlock = getComposedParent(node);
  while (parentBlock && parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
    parentBlock = getComposedParent(parentBlock);
  }

  if (!parentBlock) {
    return undefined;
  }

  this.relatedNodes([parentBlock]);

  // Capture colors
  const nodeColor = getForegroundColor(node);
  const parentColor = getForegroundColor(parentBlock);
  const nodeBackgroundColor = getBackgroundColor(node);
  const parentBackgroundColor = getBackgroundColor(parentBlock);

  // Compute contrasts, giving preference to foreground color and doing as little work as possible
  let textContrast =
    nodeColor && parentColor ? getContrast(nodeColor, parentColor) : undefined;
  if (textContrast) {
    textContrast = Math.floor(textContrast * 100) / 100;
  }

  if (textContrast && textContrast >= requiredContrastRatio) {
    return true;
  }

  let backgroundContrast =
    nodeBackgroundColor && parentBackgroundColor
      ? getContrast(nodeBackgroundColor, parentBackgroundColor)
      : undefined;

  if (backgroundContrast) {
    backgroundContrast = Math.floor(backgroundContrast * 100) / 100;
  }

  if (backgroundContrast && backgroundContrast >= requiredContrastRatio) {
    return true;
  }

  // Report incomplete instead of failure if we're not sure
  if (!backgroundContrast) {
    const reason = incompleteData.get('bgColor') ?? 'bgContrast';
    this.data({
      messageKey: reason
    });
    incompleteData.clear();
    return undefined;
  }

  if (!textContrast) {
    return undefined;
  }

  if (allowSameColor && textContrast === 1 && backgroundContrast === 1) {
    return true;
  }

  // Report bgContrast only if the background changes but text color stays the same
  if (textContrast === 1 && backgroundContrast > 1) {
    this.data({
      messageKey: 'bgContrast',
      contrastRatio: backgroundContrast,
      requiredContrastRatio,
      nodeBackgroundColor: nodeBackgroundColor
        ? nodeBackgroundColor.toHexString()
        : undefined,
      parentBackgroundColor: parentBackgroundColor
        ? parentBackgroundColor.toHexString()
        : undefined
    });
    return false;
  }

  this.data({
    messageKey: 'fgContrast',
    contrastRatio: textContrast,
    requiredContrastRatio,
    nodeColor: nodeColor ? nodeColor.toHexString() : undefined,
    parentColor: parentColor ? parentColor.toHexString() : undefined
  });
  return false;
}

export default linkInTextBlockEvaluate;
