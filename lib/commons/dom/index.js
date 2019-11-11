/**
 * Namespace for dom-related utilities.
 * @namespace dom
 * @memberof axe.commons
 */
export { default as findElmsInContext } from './find-elms-in-context.js';
export { findUp, findUpVirtual } from './find-up-virtual.js';
export { default as getComposedParent } from './get-composed-parent.js';
export {
	default as getElementByReference
} from './get-element-by-reference.js';
export { default as getElementCoordinates } from './get-element-coordinates.js';
export { default as getRootNode } from './get-root-node.js';
export { default as getScrollOffset } from './get-scroll-offset.js';
export { default as getTabbableElements } from './get-tabbable-elements.js';
export { default as getViewportSize } from './get-viewport-size.js';
export { hasContent, hasContentVirtual } from './has-content-virtual.js';
export { default as idrefs } from './idrefs.js';
export {
	default as insertedIntoFocusOrder
} from './inserted-into-focus-order.js';
export { default as isFocusable } from './is-focusable.js';
export { default as isHiddenWithCSS } from './is-hidden-with-css.js';
export { default as isHTML5 } from './is-html5.js';
export { default as isInTextBlock } from './is-in-text-block.js';
export { default as isNativelyFocusable } from './is-natively-focusable.js';
export { default as isNode } from './is-node.js';
export { default as isOffscreen } from './is-offscreen.js';
export { default as isOpaque } from './is-opaque.js';
export { default as isSkipLink } from './is-skip-link.js';
export { default as isVisible } from './is-visible.js';
export { default as isVisualContent } from './is-visual-content.js';
export {
	default as reduceToElementsBelowFloating
} from './reduce-to-elements-below-floating.js';
export {
	default as shadowElementsFromPoint
} from './shadow-elements-from-point.js';
export { default as visuallyContains } from './visually-contains.js';
export { default as visuallyOverlaps } from './visually-overlaps.js';
