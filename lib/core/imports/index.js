import axios from 'axios';
import { CssSelectorParser } from 'css-selector-parser';
import doT from '@deque/dot';
import emojiRegexText from 'emoji-regex';
import memoize from 'memoizee';

import Promise from 'core-js-pure/features/promise';
import Uint32Array from 'core-js-pure/features/typed-array/uint32-array';
import WeakMap from 'core-js-pure/es/weak-map';

/**
 * Polyfill `WeakMap`
 * Reference https://github.com/zloirock/core-js/
 */
if (!('WeakMap' in window)) {
	window.WeakMap = WeakMap;
}

/**
 * Polyfill `Promise`
 * Reference https://github.com/zloirock/core-js/
 */
if (!('Promise' in window)) {
	window.Promise = Promise;
}

/**
 * Polyfill required TypedArray and functions
 * Reference https://github.com/zloirock/core-js/
 */
if (!('Uint32Array' in window)) {
	window.Uint32Array = Uint32Array;
}
if (window.Uint32Array) {
	// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/some
	if (!('some' in window.Uint32Array.prototype)) {
		Object.defineProperty(window.Uint32Array.prototype, 'some', {
			value: Array.prototype.some
		});
	}

	if (!('reduce' in window.Uint32Array.prototype)) {
		// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce
		Object.defineProperty(window.Uint32Array.prototype, 'reduce', {
			value: Array.prototype.reduce
		});
	}
}

/**
 * Namespace `axe.imports` which holds required external dependencies
 *
 * @namespace imports
 * @memberof axe
 */
export { axios, CssSelectorParser, doT, emojiRegexText, memoize };
