import sanitize from './sanitize.js';
import isVisible from '../dom/is-visible.js';
import { getNodeFromTree } from '../../core/utils/index.js';

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
export function visibleVirtual(element, screenReader, noRecursing) {
	const result = element.children
		.map(child => {
			if (child.actualNode.nodeType === 3) {
				// filter on text nodes
				const nodeValue = child.actualNode.nodeValue;
				if (nodeValue && isVisible(element.actualNode, screenReader)) {
					return nodeValue;
				}
			} else if (!noRecursing) {
				return visibleVirtual(child, screenReader);
			}
		})
		.join('');
	return sanitize(result);
}

/**
 * Finds virtual node and calls visibleVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @param  {Element} element
 * @param  {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param  {Boolean} noRecursing When False, the result will contain text from the element and it's children.
 * When True, the result will only contain text from the element
 * @return {String}
 */
export function visible(element, screenReader, noRecursing) {
	element = getNodeFromTree(element);
	return visibleVirtual(element, screenReader, noRecursing);
}
