import { getComposedParent } from '../../commons/dom';
import {
  elementIsDistinct,
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

function linkInTextBlockEvaluate(node) {
  if (isBlock(node)) {
    return false;
  }

  var parentBlock = getComposedParent(node);
  while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
    parentBlock = getComposedParent(parentBlock);
  }

  this.relatedNodes([parentBlock]);

  if (elementIsDistinct(node, parentBlock)) {
    return true;
  }

  // Capture colors, exiting early in case of error
  var nodeColor = getForegroundColor(node);
  var parentColor = getForegroundColor(parentBlock);

  if (!nodeColor || !parentColor) {
    return undefined;
  }

  var nodeBackgroundColor = getBackgroundColor(node);
  var parentBackgroundColor = getBackgroundColor(parentBlock);

  if (!nodeBackgroundColor || !parentBackgroundColor) {
    var reason = incompleteData.get('bgColor') ?? 'bgContrast';
    this.data({
      messageKey: reason
    });
    incompleteData.clear();
    return undefined;
  }

  // Compute ratios and return pass or fail, as appropriate
  var textContrast = getContrast(nodeColor, parentColor);
  var backgroundContrast = getContrast(
    nodeBackgroundColor,
    parentBackgroundColor
  );

  if (textContrast >= 3.0 || backgroundContrast >= 3.0) {
    return true;
  }

  // Message reflects the highest contrast ratio since it's the smallest fix
  if (textContrast >= backgroundContrast) {
    this.data({
      messageKey: 'fgContrast',
      contrastRatio: textContrast,
      nodeColor,
      parentColor
    });
  } else {
    this.data({
      messageKey: 'bgContrast',
      contrastRatio: backgroundContrast,
      nodeBackgroundColor,
      parentBackgroundColor
    });
  }

  return false;
}

export default linkInTextBlockEvaluate;
