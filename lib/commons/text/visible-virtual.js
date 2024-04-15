import sanitize from './sanitize';
import isIconLigature from './is-icon-ligature';
import isVisibleOnScreen from '../dom/is-visible-on-screen';
import isVisibleToScreenReaders from '../dom/is-visible-to-screenreader';
import { nodeLookup } from '../../core/utils';

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
 * @return {String}
 */
export default function visibleVirtual(
  element,
  screenReader,
  noRecursing,
  options = {}
) {
  const { ignoreIconLigature, pixelThreshold, occurrenceThreshold } = options;
  const { vNode } = nodeLookup(element);
  const visibleMethod = screenReader
    ? isVisibleToScreenReaders
    : isVisibleOnScreen;

  // if the element does not have an actual node treat it as if
  // it is visible
  const visible =
    !element.actualNode || (element.actualNode && visibleMethod(element));

  const result = vNode.children
    .map(child => {
      const { nodeType, nodeValue } = child.props;
      if (nodeType === 3) {
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
      } else if (!noRecursing) {
        return visibleVirtual(child, screenReader, false, options);
      }
    })
    .join('');
  return sanitize(result);
}
