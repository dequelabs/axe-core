import { getRectStack } from './get-rect-stack';
import getNodeGrid from './get-node-grid';
import getVisibleChildTextRects from './get-visible-child-text-rects';
import { performanceTimer } from '../../core/utils';

let getNodeGridStart;
let getVisibleChildTextRectsStart;
let getRectStackStart;

let getNodeGridTime = 0;
let getVisibleChildTextRectsTime = 0;
let getRectStackTime = 0;

/**
 * Return all elements that are at the center of each text client rect of the passed in node.
 * @method getTextElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Array<Node[]>}
 */
function getTextElementStack(node) {
  getNodeGridStart = window.performance.now();
  const grid = getNodeGrid(node);
  getNodeGridTime += window.performance.now() - getNodeGridStart;
  if (!grid) {
    return [];
  }

  getVisibleChildTextRectsStart = window.performance.now();
  const clientRects = getVisibleChildTextRects(node);
  getVisibleChildTextRectsTime += window.performance.now() - getVisibleChildTextRectsStart;

  return clientRects.map(rect => {
    getRectStackStart = window.performance.now();
    const stacks = getRectStack(grid, rect)
    getRectStackTime += window.performance.now() - getRectStackStart;
    return stacks;
  });
}
getTextElementStack._logTime = function() {
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor_getBackgroundStack_getTextElementStack_getNodeGrid took ' + getNodeGridTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor_getBackgroundStack_getTextElementStack_getVisibleChildTextRects took ' + getVisibleChildTextRectsTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor_getBackgroundStack_getTextElementStack_getRectStack took ' + getRectStackTime + 'ms');
}

export default getTextElementStack;
