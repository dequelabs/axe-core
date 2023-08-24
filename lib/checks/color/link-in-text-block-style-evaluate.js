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

export default function linkInTextBlockStyleEvaluate(node) {
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

  if (elementIsDistinct(node, parentBlock)) {
    return true;
  }
  if (hasPseudoContent(node)) {
    this.data({ messageKey: 'pseudoContent' });
    return undefined;
  }
  return false;
}

function isBlock(elm) {
  var display = window.getComputedStyle(elm).getPropertyValue('display');
  return blockLike.indexOf(display) !== -1 || display.substr(0, 6) === 'table-';
}

function hasPseudoContent(node) {
  for (const pseudo of ['before', 'after']) {
    const style = window.getComputedStyle(node, `:${pseudo}`);
    const content = style.getPropertyValue('content');
    if (content !== 'none') {
      return true;
    }
  }
  return false;
}
