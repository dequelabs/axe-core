import axios from 'axios';
import { CssSelectorParser } from 'css-selector-parser';
import doT from '@deque/dot';
import emojiRegexText from 'emoji-regex';
import memoize from 'memoizee';

import Promise from 'core-js-pure/features/promise';
import Uint32Array from 'core-js-pure/features/typed-array/uint32-array';
import some from 'core-js-pure/features/typed-array/some';
import reduce from 'core-js-pure/features/typed-array/reduce';
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
	if (!('some' in window.Uint32Array.prototype)) {
		window.Uint32Array.prototype.some = some;
	}
	if (!('reduce' in window.Uint32Array.prototype)) {
		window.Uint32Array.prototype.reduce = reduce;
	}
}

/**
 * Namespace `axe.imports` which holds required external dependencies
 *
 * @namespace imports
 * @memberof axe
 */
export { axios, CssSelectorParser, doT, emojiRegexText, memoize };
