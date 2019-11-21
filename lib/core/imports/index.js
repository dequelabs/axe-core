/**
 * Namespace `axe.imports` which holds required external dependencies
 *
 * @namespace imports
 * @memberof axe
 */
export { default as axios } from 'axios';
export { CssSelectorParser } from 'css-selector-parser';
export { default as doT } from '@deque/dot';
export { default as emojiRegexText } from 'emoji-regex';
export { default as memoizee } from 'memoizee';

/**
 * Polyfill required TypedArray and functions (only polyfills if native
 * functions are not supported)
 * Reference https://github.com/zloirock/core-js/
 */
import es6Promise from 'es6-promise';
import Uint32Array from 'core-js/features/typed-array/uint32-array';
import some from 'core-js/features/typed-array/some';
import reduce from 'core-js/features/typed-array/reduce';

/**
 * Polyfill `WeakMap` (only polyfills if native WeakMap is not supported)
 * Reference: https://github.com/polygonplanet/weakmap-polyfill
 */
import WeakMap from 'weakmap-polyfill';

/**
 * Polyfill `Promise` (doesn't look at window.Promise before applying polyfill)
 * Reference: https://www.npmjs.com/package/es6-promise
 */
if (!('Promise' in window)) {
	es6Promise.polyfill();
}
