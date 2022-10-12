import sanitize from './sanitize';
import isVisibleOnScreen from '../dom/is-visible-on-screen';
import isVisibleToScreenReaders from '../dom/is-visible-for-screenreader';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';

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
function visibleVirtual(element, screenReader, noRecursing) {
  const vNode =
    element instanceof AbstractVirtualNode ? element : getNodeFromTree(element);
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
        // filter on text nodes
        if (nodeValue && visible) {
          return nodeValue;
        }
      } else if (!noRecursing) {
        return visibleVirtual(child, screenReader);
      }
    })
    .join('');
  return sanitize(result);
}

export default visibleVirtual;
