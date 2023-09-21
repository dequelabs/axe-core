import { CssSelectorParser } from 'css-selector-parser';
import doT from '@deque/dot';
import emojiRegexText from 'emoji-regex';
import memoize from 'memoizee';
import Color from 'colorjs.io';

import es6promise from 'es6-promise';
import { Uint32Array } from 'typedarray';
import 'weakmap-polyfill';
import hasOwn from 'core-js-pure/actual/object/has-own';

if (!('hasOwn' in Object)) {
  Object.hasOwn = hasOwn;
}

// prevent striping newline characters from strings (e.g. failure
// summaries). value must be synced with build/configure.js
doT.templateSettings.strip = false;

if (!('Promise' in window)) {
  es6promise.polyfill();
}

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
export { CssSelectorParser, doT, emojiRegexText, memoize, Color as Colorjs };
