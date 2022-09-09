import { getComposedParent } from '../../commons/dom';
import { elementIsDistinct } from '../../commons/color';

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

function linkInTextBlockStyleEvaluate(node) {
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

  return elementIsDistinct(node, parentBlock);
}

export default linkInTextBlockStyleEvaluate;
