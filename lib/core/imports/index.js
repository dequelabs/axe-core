import './polyfills';

// some of these imports require polyfills to be loaded first
import { createParser } from 'css-selector-parser';
import doT from '@deque/dot';
import emojiRegexText from 'emoji-regex';
import memoize from 'memoizee';
import Color from 'colorjs.io';
import ArrayFrom from 'core-js-pure/actual/array/from';

// prevent striping newline characters from strings (e.g. failure
// summaries). value must be synced with build/configure.mjs
doT.templateSettings.strip = false;

// the selector syntax axe needs parsed: tag/id/class/attribute selectors,
// `is` and `not` pseudo-classes, and the `>` combinator on top of the
// descendant combinator
const cssSelectorParserSyntax = {
  tag: { wildcard: true },
  ids: true,
  classNames: true,
  combinators: ['>'],
  attributes: {
    operators: ['=', '^=', '$=', '*=', '~=', '|='],
    caseSensitivityModifiers: ['i', 'I', 's', 'S'],
    unknownCaseSensitivityModifiers: 'reject'
  },
  pseudoClasses: {
    unknown: 'accept',
    definitions: { Selector: ['is', 'not'] }
  },
  pseudoElements: {
    unknown: 'accept',
    notation: 'both',
    definitions: []
  }
};

/**
 * Thin wrapper around `createParser` from css-selector-parser, so that
 * `axe.imports.CssSelectorParser` keeps its constructor and `parse` method.
 * The returned AST changed shape in css-selector-parser v3.
 * @deprecated
 */
class CssSelectorParser {
  constructor() {
    this.parser = createParser({ syntax: cssSelectorParserSyntax });
  }

  /**
   * Parse a CSS selector string into an ASTSelector object.
   * @param {String} selector CSS selector string to parse
   * @returns {Object} AstSelector
   */
  parse(selector) {
    return this.parser(selector);
  }
}

/**
 * Namespace `axe.imports` which holds required external dependencies
 *
 * @namespace imports
 * @memberof axe
 */
export {
  CssSelectorParser,
  doT,
  emojiRegexText,
  memoize,
  Color as Colorjs,
  ArrayFrom
};
