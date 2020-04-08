// TODO: es-module-commons. convert to:
// export { default as isAriaCombobox } from 'path'
import findElmsInContext from './find-elms-in-context';
import findUpVirtual from './find-up-virtual';
import findUp from './find-up';
import getComposedParent from './get-composed-parent';
import getElementByReference from './get-element-by-reference';
import getElementCoordinates from './get-element-coordinates';
import getElementStack from './get-element-stack';
import getRootNode from './get-root-node';
import getScrollOffset from './get-scroll-offset';
import getTabbableElements from './get-tabbable-elements';
import getTextElementStack from './get-text-element-stack';
import getViewportSize from './get-viewport-size';
import hasContentVirtual from './has-content-virtual';
import hasContent from './has-content';
import idrefs from './idrefs';
import insertedIntoFocusOrder from './inserted-into-focus-order';
import isFocusable from './is-focusable';
import isHiddenWithCSS from './is-hidden-with-css';
import isHTML5 from './is-html5';
import isInTextBlock from './is-in-text-block';
import isModalOpen from './is-modal-open';
import isNativelyFocusable from './is-natively-focusable';
import isNode from './is-node';
import isOffscreen from './is-offscreen';
import isOpaque from './is-opaque';
import isSkipLink from './is-skip-link';
import isVisible from './is-visible';
import isVisualContent from './is-visual-content';
import reduceToElementsBelowFloating from './reduce-to-elements-below-floating';
import shadowElementsFromPoint from './shadow-elements-from-point';
import urlPropsFromAttribute from './url-props-from-attribute';
import visuallyContains from './visually-contains';
import visuallyOverlaps from './visually-overlaps';

/**
 * Namespace for dom-related utilities.
 * @namespace dom
 * @memberof axe.commons
 */
const dom = {
	findElmsInContext,
	findUpVirtual,
	findUp,
	getComposedParent,
	getElementByReference,
	getElementCoordinates,
	getElementStack,
	getRootNode,
	getScrollOffset,
	getTabbableElements,
	getTextElementStack,
	getViewportSize,
	hasContentVirtual,
	hasContent,
	idrefs,
	insertedIntoFocusOrder,
	isFocusable,
	isHiddenWithCSS,
	isHTML5,
	isInTextBlock,
	isModalOpen,
	isNativelyFocusable,
	isNode,
	isOffscreen,
	isOpaque,
	isSkipLink,
	isVisible,
	isVisualContent,
	reduceToElementsBelowFloating,
	shadowElementsFromPoint,
	urlPropsFromAttribute,
	visuallyContains,
	visuallyOverlaps
};
commons.dom = dom;
