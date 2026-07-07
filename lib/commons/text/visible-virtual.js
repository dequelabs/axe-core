import { nodeLookup, performanceTimer } from '../../core/utils';
import isVisibleOnScreen from '../dom/is-visible-on-screen';
import isVisibleToScreenReaders from '../dom/is-visible-to-screenreader';
import isIconLigature from './is-icon-ligature';
import sanitize from './sanitize';

let isVisibleOnScreenStart;
let isIconLigatureStart;
let domWalkStart;

let isVisibleOnScreenTime = 0;
let isIconLigatureTime = 0;
let domWalkTime = 0;

/**
 * Returns the visible text of the virtual node
 * NOTE: when calculating the text or accessible text of a node that includes shadow
 * roots attached to it or its children, the flattened tree must be considered
 * rather than the "light DOM"
 * @method visibleVirtual
 * @memberof axe.commons.text
 * @instance
 * @param  {VirtualNode} element
 * @param  {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param  {Boolean} noRecursing When False, the result will contain text from the element and it's children.
 * When True, the result will only contain text from the element
 * @param  {Object} [options]
 * @param  {Boolean} [options.ignoreIconLigature] When true, icon ligature text nodes are excluded
 * @param  {number} [options.pixelThreshold] Pixel threshold for icon ligature detection
 * @param  {number} [options.occurrenceThreshold] Occurrence threshold for icon ligature detection
 * @return {String}
 */
function visibleVirtual(element, screenReader, noRecursing, options = {}) {
  const { vNode } = nodeLookup(element);
  const visibleMethod = screenReader
    ? isVisibleToScreenReaders
    : isVisibleOnScreen;

  // if the element does not have an actual node treat it as if
  // it is visible
  isVisibleOnScreenStart = window.performance.now();
  const visible =
    !element.actualNode || (element.actualNode && visibleMethod(element));
  if (options.log) {
    isVisibleOnScreenTime += window.performance.now() - isVisibleOnScreenStart;
  }

  const { ignoreIconLigature, pixelThreshold, occurrenceThreshold } = options;

  domWalkStart = window.performance.now();
  const result = vNode.children
    .map(child => {
      const { nodeType, nodeValue, nodeName } = child.props;
      if (nodeType === 3) {
        // filter on text nodes
        if (!nodeValue || !visible) {
          return '';
        }

        isIconLigatureStart = window.performance.now();
        if (
          ignoreIconLigature &&
          isIconLigature(child, pixelThreshold, occurrenceThreshold)
        ) {
          if (options.log) {
            isIconLigatureTime += window.performance.now() - isIconLigatureStart;
          }

          return '';
        }
        return nodeValue;
      }
      if (nodeName === 'br') {
        return ' ';
      }
      if (!noRecursing) {
        return visibleVirtual(child, screenReader, false, options);
      }
    })
    .join('');

  if (options.log) {
    domWalkTime += window.performance.now() - domWalkStart;
  }

  return sanitize(result);
}

export default visibleVirtual;

visibleVirtual._logTime = function() {
  performanceTimer._log('Measure rule_color-contrast#matches_visibleVirtual_isVisibleOnScreen took ' + isVisibleOnScreenTime + 'ms');
  performanceTimer._log('Measure rule_color-contrast#matches_visibleVirtual_isIconLigature took ' + isIconLigatureTime + 'ms');
  performanceTimer._log('Measure rule_color-contrast#matches_visibleVirtual_domWalk took ' + domWalkTime + 'ms');
}