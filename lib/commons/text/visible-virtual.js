import { nodeLookup } from '../../core/utils';
import isVisibleOnScreen from '../dom/is-visible-on-screen';
import isVisibleToScreenReaders from '../dom/is-visible-to-screenreader';
import isIconLigature from './is-icon-ligature';
import sanitize from './sanitize';

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
 * @param  {Boolean} [options.skipSanitize] Internal to the recursion. Set on nested
 * calls so that only the outermost call sanitizes its result
 * @return {String}
 */
function visibleVirtual(element, screenReader, noRecursing, options = {}) {
  const { vNode } = nodeLookup(element);
  const visibleMethod = screenReader
    ? isVisibleToScreenReaders
    : isVisibleOnScreen;

  // if the element does not have an actual node treat it as if
  // it is visible
  const visible =
    !element.actualNode || (element.actualNode && visibleMethod(element));

  const {
    ignoreIconLigature,
    pixelThreshold,
    occurrenceThreshold,
    skipSanitize
  } = options;

  const result = vNode.children
    .map(child => {
      const { nodeType, nodeValue, nodeName } = child.props;
      if (nodeType === 3) {
        // filter on text nodes
        if (!nodeValue || !visible) {
          return '';
        }
        if (
          ignoreIconLigature &&
          isIconLigature(child, pixelThreshold, occurrenceThreshold)
        ) {
          return '';
        }
        return nodeValue;
      }
      if (nodeName === 'br') {
        return ' ';
      }
      if (!noRecursing) {
        // Sanitizing each level trims a whitespace-only child down to an empty
        // string, gluing together the words on either side of it. Let nested
        // calls return their text as-is and sanitize once, at the top.
        return visibleVirtual(child, screenReader, false, {
          ...options,
          skipSanitize: true
        });
      }
    })
    .join('');
  return skipSanitize ? result : sanitize(result);
}

export default visibleVirtual;
