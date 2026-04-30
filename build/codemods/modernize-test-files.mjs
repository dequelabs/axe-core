#!/usr/bin/env node
/* eslint-disable no-restricted-imports -- Node.js CLI; imports Babel and glob */
/**
 * Modernize axe-core Karma/Mocha test files under `test/` (default glob). Intended for
 * that tree only — do not point at `lib/` or published bundles.
 *
 * - Remove redundant `'use strict'` (including Babel's BlockStatement.directives form,
 *   which appears when var declarations are hoisted above the string literal in the AST)
 * - Convert anonymous `function () {}` to `() => {}` when safe (no dynamic `this`,
 *   no `arguments`, not a generator, not a named function expression, not a `new` callee)
 * - Convert `var` to `const` or `let` when the declaration is in a function/class method
 *   body (not nested `if`/`for`/`try`/etc., not `for (var ...)`, not top-level `var`)
 *   and using binding reassignment analysis. Repeated `var name = …` in the same block
 *   becomes one `let`/`const` then `name = …` assignments (or drops a redundant no-init
 *   `var name` after an earlier declaration of `name`).
 * - Turn `+` chains used for multi-line HTML/strings into template literals (backticks);
 *   non-string operands become `${expr}` (identifiers, calls, nested `+` that are not
 *   plain numeric addition, etc.). All-string chains become indented multiline templates
 *   (newline after opening backtick, +2 spaces vs statement indent for HTML, newline at
 *   each original `+` boundary between literals, newline before closing backtick). When
 *   the chain is a direct `CallExpression` argument, the
 *   whole call is rebuilt so recast does not keep a line break between `(` and the opening
 *   backtick (yields `fn(\`...\`)` instead of `fn(\n  \`...\`)`).
 * - After that, bare template literals whose quasi-only text parses as an HTML fragment
 *   with at least one element (via parse5) are wrapped with `html\`\`` so Prettier can format them; `html` is
 *   `axe.testUtils.html`. Skipped when any quasi `raw` contains JS escapes such as `\r`,
 *   `\t`, `\n`, `\u…`, `\x…`, etc. — tagging + Prettier would rewrite those into literal
 *   control characters and break fixtures that rely on exact escape sequences in markup.
 *   Only inside Mocha runnables (`it` / `xit` / `specify` and
 *   `.only` / `.skip`, plus `before` / `after` / `beforeEach` / `afterEach` and their
 *   `.only` / `.skip`) — not in `describe` / `it` titles, options, or suite-level code.
 *   Callees may be parenthesized or ternary-chosen runnables, e.g. `(cond ? it : xit)(...)`.
 * - Unwrap legacy IE shadow-DOM skips: `(shadowSupported ? it : xit)(...)`,
 *   `(shadowSupported ? it : it.skip)(...)`, and `(shadowSupport.v1 ? it : xit|it.skip)(...)`
 *   become plain `it(...)`. Then drop `const|let|var shadowSupported = axe.testUtils.shadowSupport.v1`
 *   (or `shadowSupport = axe.testUtils.shadowSupport`) when the binding is unused.
 *   If no `html` binding is visible from the literal, inserts
 *   `const html = axe.testUtils.html;` at the start of the outermost Mocha `describe` /
 *   `describe.only` / `describe.skip` callback body that contains the literal.
 *
 * Usage:
 *   node build/codemods/modernize-test-files.mjs [options] [glob ...]
 *
 * Options:
 *   -h, --help         Show this message
 *   --dry-run          Print files that would change, do not write
 *   --verbose          Log per-file actions
 *   --no-prettier      Skip Prettier after writes (keep recast-only output; may preserve
 *                      extra blank lines that Prettier would collapse)
 *
 * Default globs: all .js files under test/ (glob: test slash star star slash star dot js)
 *
 * Output uses recast so unchanged regions stay aligned with the original source. After
 * writes, Prettier is run on changed files by default (use `--no-prettier` to skip). Then
 * run npm run eslint -- --fix and the test suite as needed.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { parse as babelParse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import * as t from '@babel/types';
import recast from 'recast';
import { glob as globAsync } from 'glob';
import { parseFragment } from 'parse5';

const traverse = traverseModule.default ?? traverseModule;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PARSER_PLUGINS = [
  'asyncGenerators',
  'bigInt',
  'classProperties',
  'classPrivateProperties',
  'classPrivateMethods',
  'dynamicImport',
  'importMeta',
  'objectRestSpread',
  'optionalCatchBinding',
  'optionalChaining',
  'nullishCoalescingOperator',
  'topLevelAwait',
  ['decorators', { decoratorsBeforeExport: false }]
];

/**
 * @param {import('@babel/traverse').NodePath} thisPath
 */
function getThisBindingFunction(thisPath) {
  let fn = thisPath.getFunctionParent();
  while (fn?.isArrowFunctionExpression?.()) {
    fn = fn.getFunctionParent();
  }
  return fn;
}

/**
 * Arrow functions cannot be used with `new`.
 *
 * @param {import('@babel/traverse').NodePath<import('@babel/types').FunctionExpression>} fnPath
 */
function functionExpressionIsNewCallee(fnPath) {
  /** @type {import('@babel/traverse').NodePath | null | undefined} */
  let current = fnPath;
  let p = current.parentPath;
  while (p?.isParenthesizedExpression?.()) {
    current = p;
    p = p.parentPath;
  }
  if (!p?.isNewExpression?.()) {
    return false;
  }
  return p.get('callee') === current;
}

/**
 * @param {import('@babel/traverse').NodePath} fnPath
 */
function functionMayBecomeArrow(fnPath) {
  if (!fnPath.isFunctionExpression()) {
    return false;
  }
  if (fnPath.node.id) {
    return false;
  }
  if (fnPath.node.generator) {
    return false;
  }
  if (functionExpressionIsNewCallee(fnPath)) {
    return false;
  }

  let blocked = false;

  fnPath.traverse({
    ThisExpression(p) {
      const provider = getThisBindingFunction(p);
      if (provider && provider.node === fnPath.node) {
        blocked = true;
        p.stop();
      }
    },
    Identifier(p) {
      if (p.node.name !== 'arguments') {
        return;
      }
      if (!p.isReferencedIdentifier()) {
        return;
      }
      let fn = p.getFunctionParent();
      while (fn?.isArrowFunctionExpression?.()) {
        fn = fn.getFunctionParent();
      }
      if (fn && fn.node === fnPath.node) {
        blocked = true;
        p.stop();
      }
    }
  });

  return !blocked;
}

/**
 * Whether converting this `var` to `let`/`const` preserves behavior. `var` in nested
 * blocks hoists to the function; `let`/`const` does not — only convert when the
 * declaration sits in the direct body of a function or method (not `if`/`for`/`try`,
 * not `for (var ...)`, not top-level script `var`).
 *
 * @param {import('@babel/traverse').NodePath<import('@babel/types').VariableDeclaration>} varPath
 */
function canSafelyConvertVarDeclaration(varPath) {
  const parent = varPath.parentPath;
  if (!parent) {
    return false;
  }

  if (
    parent.isForStatement() ||
    parent.isForOfStatement() ||
    parent.isForInStatement()
  ) {
    return false;
  }

  if (!parent.isBlockStatement()) {
    return false;
  }

  const block = parent;
  const container = block.parentPath;
  if (!container) {
    return false;
  }

  if (
    container.isFunctionDeclaration() ||
    container.isFunctionExpression() ||
    container.isArrowFunctionExpression()
  ) {
    return container.get('body') === block;
  }

  if (container.isClassMethod() || container.isObjectMethod()) {
    return container.get('body') === block;
  }

  return false;
}

/**
 * Whether an earlier statement in the same block already declares `name` with
 * `var` / `let` / `const`. Used so repeated `var name = …` in one function body
 * becomes one `let` plus `name = …` assignments (matching hoisted `var` behavior).
 *
 * @param {import('@babel/types').Statement[]} body
 * @param {number} beforeIndex
 * @param {string} name
 */
function blockBodyPriorDeclaresIdentifier(body, beforeIndex, name) {
  for (let i = 0; i < beforeIndex; i++) {
    const stmt = body[i];
    if (!t.isVariableDeclaration(stmt)) {
      continue;
    }
    for (const d of stmt.declarations) {
      if (t.isIdentifier(d.id) && d.id.name === name) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @param {import('@babel/traverse').NodePath} varPath
 */
function varDeclarationToConstLet(varPath) {
  if (!varPath.isVariableDeclaration() || varPath.node.kind !== 'var') {
    return;
  }
  if (!canSafelyConvertVarDeclaration(varPath)) {
    return;
  }

  const declarators = varPath.node.declarations;
  if (declarators.length === 0) {
    return;
  }

  const blockPath = varPath.parentPath;
  if (!blockPath?.isBlockStatement?.()) {
    return;
  }
  const body = blockPath.node.body;
  const stmtIndex = body.indexOf(varPath.node);
  if (stmtIndex >= 0 && declarators.length === 1) {
    const only = declarators[0];
    if (t.isIdentifier(only.id)) {
      const name = only.id.name;
      if (blockBodyPriorDeclaresIdentifier(body, stmtIndex, name)) {
        if (only.init !== null && only.init !== undefined) {
          varPath.replaceWith(
            t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.identifier(name),
                t.cloneNode(only.init)
              )
            )
          );
        } else {
          // `var x` after `var x` / `let x` — hoisted duplicate with no initializer; drop.
          varPath.remove();
        }
        return;
      }
    }
  }

  /** @type {{ id: import('@babel/types').Identifier, kind: 'const' | 'let' }[]} */
  const kinds = [];

  for (const decl of declarators) {
    if (!t.isIdentifier(decl.id)) {
      // `var { a } = o` — skip entire declaration; too rare in this repo to automate safely
      return;
    }
    const name = decl.id.name;
    const binding = varPath.scope.getBinding(name);
    let kind = !binding || !binding.constant ? 'let' : 'const';
    if (kind === 'const' && (decl.init === null || decl.init === undefined)) {
      kind = 'let';
    }
    kinds.push({
      id: decl.id,
      kind
    });
  }

  const firstKind = kinds[0].kind;
  const uniform = kinds.every(k => k.kind === firstKind);

  if (uniform) {
    varPath.node.kind = firstKind;
    return;
  }

  /** @type {import('@babel/types').VariableDeclaration[]} */
  const replacements = [];
  for (let i = 0; i < declarators.length; i++) {
    replacements.push(t.variableDeclaration(kinds[i].kind, [declarators[i]]));
  }

  if (replacements.length === 1) {
    varPath.replaceWith(replacements[0]);
  } else {
    varPath.replaceWithMultiple(replacements);
  }
}

/**
 * Escape text that becomes raw template literal segment (not inside ${}).
 *
 * @param {string} str
 */
function escapeTemplateQuasiText(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

/**
 * @param {import('@babel/types').Expression | import('@babel/types').PrivateName} node
 */
function isStringyOperand(node) {
  if (t.isStringLiteral(node) || t.isTemplateLiteral(node)) {
    return true;
  }
  if (t.isBinaryExpression(node) && node.operator === '+') {
    return isStringConcatBinary(node);
  }
  if (
    t.isIdentifier(node) ||
    t.isMemberExpression(node) ||
    t.isCallExpression(node) ||
    t.isOptionalCallExpression(node) ||
    t.isTaggedTemplateExpression(node)
  ) {
    return true;
  }
  if (t.isLiteral(node) && typeof node.value === 'string') {
    return true;
  }
  if (t.isLiteral(node) && node.value === null) {
    return true;
  }
  if (t.isBigIntLiteral(node)) {
    return true;
  }
  if (
    t.isAssignmentExpression(node) ||
    t.isConditionalExpression(node) ||
    t.isUnaryExpression(node) ||
    t.isLogicalExpression(node) ||
    t.isAwaitExpression(node) ||
    t.isYieldExpression(node) ||
    t.isUpdateExpression(node)
  ) {
    return true;
  }
  return false;
}

/**
 * Whether `a + b` can be string concatenation in JS (not numeric-only addition).
 *
 * @param {import('@babel/types').BinaryExpression} node
 */
function isStringConcatBinary(node) {
  if (!t.isBinaryExpression(node) || node.operator !== '+') {
    return false;
  }
  return isStringyOperand(node.left) || isStringyOperand(node.right);
}

/**
 * Flatten a `+` subtree into ordered parts when each `+` is string concatenation.
 *
 * @param {import('@babel/types').Expression} node
 * @returns {import('@babel/types').Expression[]}
 */
function flattenConcatChain(node) {
  if (!t.isBinaryExpression(node) || node.operator !== '+') {
    return [node];
  }
  if (!isStringConcatBinary(node)) {
    return [node];
  }
  return [...flattenConcatChain(node.left), ...flattenConcatChain(node.right)];
}

/**
 * Top of a left-associative `+` chain (`((a + b) + c)`), for single replacement.
 *
 * @param {import('@babel/traverse').NodePath<import('@babel/types').BinaryExpression>} binPath
 */
function findConcatChainRoot(binPath) {
  let current = binPath;
  while (true) {
    const parent = current.parentPath;
    if (
      parent?.isBinaryExpression?.() &&
      parent.node.operator === '+' &&
      parent.get('left') === current
    ) {
      current = parent;
    } else {
      break;
    }
  }
  return current;
}

/**
 * When a concat chain is a call's argument (possibly wrapped in one+ parens), replacing
 * only the `BinaryExpression` makes recast keep a line break between `(` and the new
 * template. Replacing the whole `CallExpression` drops that gap so we get
 * `queryFixture(\`...\`)`.
 *
 * @param {import('@babel/traverse').NodePath<import('@babel/types').BinaryExpression>} binPath
 * @returns {{ callPath: import('@babel/traverse').NodePath<import('@babel/types').CallExpression>, argIndex: number } | null}
 */
function getCallRewriteForConcatArg(binPath) {
  /** @type {import('@babel/traverse').NodePath} */
  let child = binPath;
  let p = binPath.parentPath;
  while (p?.isParenthesizedExpression?.() && p.get('expression') === child) {
    child = p;
    p = p.parentPath;
  }
  if (!p?.isCallExpression?.()) {
    return null;
  }
  const idx = p.node.arguments.indexOf(child.node);
  if (idx === -1) {
    return null;
  }
  return { callPath: p, argIndex: idx };
}

/**
 * @param {import('@babel/traverse').NodePath<import('@babel/types').CallExpression>} callPath
 * @param {number} argIndex
 * @param {import('@babel/types').Expression} newArg
 */
function replaceCallArgument(callPath, argIndex, newArg) {
  const old = callPath.node;
  const newArgs = old.arguments.map((arg, i) =>
    i === argIndex ? newArg : arg
  );
  const newCall = t.callExpression(old.callee, newArgs);
  if (old.optional) {
    newCall.optional = true;
  }
  callPath.replaceWith(newCall);
}

/**
 * Whitespace prefix of the line at `loc` up to `loc.column` (statement start), for
 * indenting generated multiline template literals like Prettier (`block + 2` for body).
 *
 * @param {string} source
 * @param {import('@babel/types').SourceLocation['start'] | null | undefined} loc
 */
function statementIndentFromLoc(source, loc) {
  if (!loc) {
    return '  ';
  }
  const lineText = source.split('\n')[loc.line - 1] ?? '';
  const prefix = lineText.slice(0, loc.column);
  if (!/^\s*$/.test(prefix)) {
    return '  ';
  }
  return prefix;
}

/**
 * @param {import('@babel/types').Expression[]} parts
 * @param {string} statementIndent
 */
function partsToTemplateLiteral(parts, statementIndent) {
  const innerIndent = `${statementIndent}  `;
  const onlyStrings = parts.every(p => t.isStringLiteral(p));

  if (onlyStrings) {
    const segments = parts.map(p => escapeTemplateQuasiText(p.value));
    const mergedBody = segments.join(`\n${innerIndent}`);
    const raw = `\n${innerIndent}${mergedBody}\n${statementIndent}`;
    const quasi = t.templateElement({ raw, cooked: raw }, true);
    return t.templateLiteral([quasi], []);
  }

  /** @type {import('@babel/types').TemplateElement[]} */
  const quasis = [];
  /** @type {import('@babel/types').Expression[]} */
  const expressions = [];
  let buffer = '';

  for (const part of parts) {
    if (t.isStringLiteral(part)) {
      if (buffer.length > 0) {
        buffer += `\n${innerIndent}`;
      }
      buffer += escapeTemplateQuasiText(part.value);
      continue;
    }
    const raw = buffer;
    buffer = '';
    quasis.push(t.templateElement({ raw, cooked: raw }, false));
    expressions.push(part);
  }
  quasis.push(t.templateElement({ raw: buffer, cooked: buffer }, true));

  return t.templateLiteral(quasis, expressions);
}

/**
 * @param {import('@babel/types').TemplateElement} el
 */
function templateElementText(el) {
  const v = el.value;
  return typeof v.cooked === 'string' ? v.cooked : v.raw;
}

/**
 * Cooked-ish full text of a template literal (quasis only; `${expr}` omitted).
 *
 * @param {import('@babel/types').TemplateLiteral} node
 */
function templateLiteralQuasiJoinedText(node) {
  return node.quasis.map(templateElementText).join('');
}

/**
 * True when quasi-joined text is permissively parseable as HTML and yields at least one
 * element (not comment-only, not plain text). Interpolation gaps are ignored (quasis
 * only), same as before.
 *
 * @param {import('@babel/types').TemplateLiteral} node
 */
function looksLikeHtmlTemplateLiteral(node) {
  const s = templateLiteralQuasiJoinedText(node).trim();
  if (s.length === 0 || !s.includes('<')) {
    return false;
  }
  try {
    const fragment = parseFragment(s);
    return fragment.childNodes.some(child => {
      const name = child.nodeName;
      return (
        name !== '#text' && name !== '#comment' && name !== '#documentType'
      );
    });
  } catch {
    return false;
  }
}

/**
 * True when a template quasi was written with JS escapes (e.g. `\r`, `\t`, `\n`) in
 * source. Wrapping with `html` and running Prettier turns those into literal control
 * characters or different line breaks, which breaks tests that assert exact strings in
 * attributes or text nodes.
 *
 * Uses each quasi's `value.raw` (Babel), where backslash-escape sequences appear as
 * two-character (or longer) `\` + introducer patterns, distinct from `\\` (one backslash
 * in cooked output).
 *
 * @param {import('@babel/types').TemplateLiteral} node
 */
function templateLiteralHasJsEscapesInRawQuasis(node) {
  for (const quasi of node.quasis) {
    const raw = quasi.value.raw;
    // Control / unicode / hex escapes; octal \0–\7 (legacy). Not `` \` `` / `\${` (template only).
    if (
      /\\(?:[0-7]{1,3}|[rntfbv]|u(?:\{[0-9a-fA-F]+\}|[0-9a-fA-F]{4})|x[0-9a-fA-F]{2})/.test(
        raw
      )
    ) {
      return true;
    }
  }
  return false;
}

/**
 * @param {import('@babel/types').Expression} callee
 */
function isMochaDescribeCallee(callee) {
  if (t.isIdentifier(callee) && callee.name === 'describe') {
    return true;
  }
  return (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.object, { name: 'describe' }) &&
    t.isIdentifier(callee.property) &&
    (callee.property.name === 'skip' || callee.property.name === 'only')
  );
}

/** Mocha roots that take a callback body (not `describe`). */
const MOCHA_RUNNABLE_ROOT_NAMES = new Set([
  'it',
  'xit',
  'specify',
  'before',
  'after',
  'beforeEach',
  'afterEach'
]);

/**
 * `it`, `xit`, `before`, `after`, `beforeEach`, `afterEach`, `specify`, and
 * `it.only` / `it.skip` / `beforeEach.skip` / … (including `.retries` on `it`).
 *
 * @param {import('@babel/types').Expression} callee
 */
function isMochaRunnableCallee(callee) {
  if (t.isIdentifier(callee) && MOCHA_RUNNABLE_ROOT_NAMES.has(callee.name)) {
    return true;
  }
  if (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.object) &&
    MOCHA_RUNNABLE_ROOT_NAMES.has(callee.object.name) &&
    t.isIdentifier(callee.property) &&
    (callee.property.name === 'only' ||
      callee.property.name === 'skip' ||
      callee.property.name === 'retries')
  ) {
    return true;
  }
  return false;
}

/**
 * Strip `(...)` wrappers from a callee (e.g. `(it)` or `((shadow ? it : xit))`).
 *
 * @param {import('@babel/types').Expression} callee
 */
function unwrapCalleeExpression(callee) {
  let e = callee;
  while (t.isParenthesizedExpression(e)) {
    e = e.expression;
  }
  return e;
}

/**
 * Whether `callee()` is a Mocha runnable call, including `(a ? it : xit)` and nested
 * ternaries where every branch ends in a recognizable runnable.
 *
 * @param {import('@babel/types').Expression} callee
 */
function isCallToMochaRunnable(callee) {
  const inner = unwrapCalleeExpression(callee);
  if (isMochaRunnableCallee(inner)) {
    return true;
  }
  if (t.isConditionalExpression(inner)) {
    return (
      isCallToMochaRunnable(inner.consequent) &&
      isCallToMochaRunnable(inner.alternate)
    );
  }
  return false;
}

/**
 * Index of the callback argument (`it(title, fn)`, `it(title, opts, fn)`, `it(fn)`).
 *
 * @param {import('@babel/types').CallExpression} callNode
 */
function getMochaRunnableCallbackArgIndex(callNode) {
  const args = callNode.arguments;
  for (let i = args.length - 1; i >= 0; i--) {
    const a = args[i];
    if (t.isFunctionExpression(a) || t.isArrowFunctionExpression(a)) {
      return i;
    }
  }
  return -1;
}

/**
 * True when the template is inside a runnable’s callback, not its title/options.
 *
 * @param {import('@babel/traverse').NodePath} tmplPath
 */
function isInsideMochaRunnableCallback(tmplPath) {
  const runnableCall = tmplPath.findParent(
    p =>
      p.isCallExpression() &&
      isCallToMochaRunnable(
        /** @type {import('@babel/types').CallExpression} */ (p.node).callee
      )
  );
  if (!runnableCall?.isCallExpression()) {
    return false;
  }
  const idx = getMochaRunnableCallbackArgIndex(runnableCall.node);
  if (idx < 0) {
    return false;
  }
  const callbackArgPath = runnableCall.get(`arguments.${idx}`);
  return callbackArgPath.isAncestor(tmplPath);
}

/**
 * Outermost `describe` / `describe.only` / `describe.skip` call ancestor.
 *
 * @param {import('@babel/traverse').NodePath} startPath
 * @returns {import('@babel/traverse').NodePath<import('@babel/types').CallExpression> | null}
 */
function findOutermostDescribeCallPath(startPath) {
  /** @type {import('@babel/traverse').NodePath<import('@babel/types').CallExpression> | null} */
  let outer = null;
  let p = startPath;
  while (p) {
    if (p.isCallExpression() && isMochaDescribeCallee(p.node.callee)) {
      outer = /** @type {typeof outer} */ (p);
    }
    p = p.parentPath;
  }
  return outer;
}

/**
 * @param {import('@babel/traverse').NodePath<import('@babel/types').CallExpression>} describePath
 * @returns {import('@babel/types').BlockStatement | null}
 */
function getDescribeCallbackBlock(describePath) {
  const args = describePath.node.arguments;
  if (args.length < 2) {
    return null;
  }
  const cb = args[1];
  if (!t.isFunctionExpression(cb) && !t.isArrowFunctionExpression(cb)) {
    return null;
  }
  if (!t.isBlockStatement(cb.body)) {
    return null;
  }
  return cb.body;
}

/**
 * @param {import('@babel/traverse').NodePath} templatePath
 */
function hasHtmlBindingInScopeChain(templatePath) {
  return templatePath.scope.hasBinding('html');
}

/**
 * @param {import('@babel/types').File | import('@babel/types').Program} ast
 */
function tagHtmlTemplatesAndInjectHtmlConst(ast) {
  /** @type {import('@babel/types').BlockStatement[]} */
  const describeBodiesNeedingConst = [];

  traverse(ast, {
    TemplateLiteral(tmplPath) {
      if (tmplPath.parentPath?.isTaggedTemplateExpression?.()) {
        return;
      }
      if (!looksLikeHtmlTemplateLiteral(tmplPath.node)) {
        return;
      }
      if (templateLiteralHasJsEscapesInRawQuasis(tmplPath.node)) {
        return;
      }
      if (!isInsideMochaRunnableCallback(tmplPath)) {
        return;
      }
      const describePath = findOutermostDescribeCallPath(tmplPath);
      if (!describePath) {
        return;
      }
      if (!hasHtmlBindingInScopeChain(tmplPath)) {
        const block = getDescribeCallbackBlock(describePath);
        if (!block) {
          return;
        }
        if (!describeBodiesNeedingConst.includes(block)) {
          describeBodiesNeedingConst.push(block);
        }
      }
      tmplPath.replaceWith(
        t.taggedTemplateExpression(t.identifier('html'), tmplPath.node)
      );
    }
  });

  const htmlInit = t.memberExpression(
    t.memberExpression(t.identifier('axe'), t.identifier('testUtils')),
    t.identifier('html')
  );
  const htmlDecl = t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier('html'), htmlInit)
  ]);

  for (const block of describeBodiesNeedingConst) {
    block.body.unshift(t.cloneNode(htmlDecl));
  }
}

/**
 * `axe.testUtils.shadowSupport` or `axe.testUtils.shadowSupport.v1`.
 *
 * @param {import('@babel/types').Expression | null | undefined} node
 * @param {boolean} requireV1
 */
function isInitAxeTestUtilsShadowSupport(node, requireV1) {
  if (!node || !t.isMemberExpression(node) || node.computed) {
    return false;
  }
  let cur = node;
  if (requireV1) {
    if (!t.isIdentifier(cur.property, { name: 'v1' })) {
      return false;
    }
    cur = cur.object;
    if (!t.isMemberExpression(cur) || cur.computed) {
      return false;
    }
  }
  if (!t.isIdentifier(cur.property, { name: 'shadowSupport' })) {
    return false;
  }
  cur = cur.object;
  if (!t.isMemberExpression(cur) || cur.computed) {
    return false;
  }
  if (!t.isIdentifier(cur.property, { name: 'testUtils' })) {
    return false;
  }
  cur = cur.object;
  return t.isIdentifier(cur, { name: 'axe' });
}

/**
 * Legacy `(shadowSupported | shadowSupport.v1) ? it : (xit | it.skip)` used to skip
 * shadow tests on IE. When matched, return the `it` branch to use as the call callee.
 *
 * @param {import('@babel/types').Expression} inner
 * @returns {import('@babel/types').Expression | null}
 */
function getItBranchFromShadowSupportSkipTernary(inner) {
  if (!t.isConditionalExpression(inner)) {
    return null;
  }
  const { test, consequent, alternate } = inner;
  const testOk =
    (t.isIdentifier(test) && test.name === 'shadowSupported') ||
    (t.isMemberExpression(test) &&
      !test.computed &&
      t.isIdentifier(test.object, { name: 'shadowSupport' }) &&
      t.isIdentifier(test.property, { name: 'v1' }));
  if (!testOk) {
    return null;
  }
  if (!t.isIdentifier(consequent) || consequent.name !== 'it') {
    return null;
  }
  const altOk =
    (t.isIdentifier(alternate) && alternate.name === 'xit') ||
    (t.isMemberExpression(alternate) &&
      !alternate.computed &&
      t.isIdentifier(alternate.object, { name: 'it' }) &&
      t.isIdentifier(alternate.property, { name: 'skip' }));
  if (!altOk) {
    return null;
  }
  return consequent;
}

/**
 * @param {import('@babel/types').File | import('@babel/types').Program} ast
 */
function unwrapShadowSupportMochaCalls(ast) {
  traverse(ast, {
    CallExpression(callPath) {
      const inner = unwrapCalleeExpression(callPath.node.callee);
      const itCallee = getItBranchFromShadowSupportSkipTernary(inner);
      if (!itCallee) {
        return;
      }
      callPath.get('callee').replaceWith(t.cloneNode(itCallee));
    }
  });
}

/**
 * How many reference sites resolve to this declarator’s binding. Prefer this over
 * `binding.referenced` after callee rewrites: Babel can keep stale `referencePaths` on
 * detached subtrees.
 *
 * @param {import('@babel/types').Program} program
 * @param {import('@babel/traverse').NodePath<import('@babel/types').VariableDeclarator>} declPath
 * @param {string} name
 */
function countReferencesToDeclarator(program, declPath, name) {
  let count = 0;
  traverse(program, {
    Identifier(p) {
      if (p.node.name !== name) {
        return;
      }
      if (!p.isReferencedIdentifier()) {
        return;
      }
      const b = p.scope.getBinding(name);
      if (b && b.path === declPath) {
        count++;
      }
    }
  });
  return count;
}

/**
 * @param {import('@babel/types').File | import('@babel/types').Program} ast
 */
function removeUnusedShadowSupportDeclarators(ast) {
  const program = t.isFile(ast) ? ast.program : ast;
  /** @type {import('@babel/traverse').NodePath<import('@babel/types').VariableDeclarator>[]} */
  const toRemove = [];

  traverse(ast, {
    VariableDeclarator(declPath) {
      const id = declPath.node.id;
      if (!t.isIdentifier(id)) {
        return;
      }
      const n = id.name;
      if (n === 'shadowSupported') {
        if (!isInitAxeTestUtilsShadowSupport(declPath.node.init, true)) {
          return;
        }
      } else if (n === 'shadowSupport') {
        if (!isInitAxeTestUtilsShadowSupport(declPath.node.init, false)) {
          return;
        }
      } else {
        return;
      }

      const binding = declPath.scope.getBinding(n);
      if (!binding || binding.constantViolations.length > 0) {
        return;
      }
      if (countReferencesToDeclarator(program, declPath, n) > 0) {
        return;
      }
      toRemove.push(declPath);
    }
  });

  for (const p of toRemove.reverse()) {
    p.remove();
  }
}

/**
 * Parse with recast so `recast.print` can reuse original formatting (including blank
 * lines). `tokens: true` helps recast reprint accurately.
 *
 * @param {string} source
 * @param {string} filename
 */
function parseSource(source, filename) {
  try {
    return recast.parse(source, {
      sourceFileName: filename,
      parser: {
        parse(code) {
          return babelParse(code, {
            sourceType: 'unambiguous',
            allowReturnOutsideFunction: true,
            errorRecovery: false,
            tokens: true,
            plugins: PARSER_PLUGINS
          });
        }
      }
    });
  } catch (e) {
    e.message = `${filename}: ${e.message}`;
    throw e;
  }
}

function transformSource(source, filename) {
  const ast = parseSource(source, filename);

  unwrapShadowSupportMochaCalls(ast);
  removeUnusedShadowSupportDeclarators(ast);

  traverse(ast, {
    BinaryExpression(binPath) {
      if (binPath.node.operator !== '+') {
        return;
      }
      if (findConcatChainRoot(binPath) !== binPath) {
        return;
      }
      if (!isStringConcatBinary(binPath.node)) {
        return;
      }
      const parts = flattenConcatChain(binPath.node);
      if (parts.length < 2) {
        return;
      }
      if (!parts.some(p => t.isStringLiteral(p))) {
        return;
      }
      const stmt = binPath.getStatementParent();
      const indent = statementIndentFromLoc(source, stmt?.node?.loc?.start);
      const template = partsToTemplateLiteral(parts, indent);
      const callRewrite = getCallRewriteForConcatArg(binPath);
      if (callRewrite) {
        replaceCallArgument(
          callRewrite.callPath,
          callRewrite.argIndex,
          template
        );
      } else {
        binPath.replaceWith(template);
      }
    }
  });

  tagHtmlTemplatesAndInjectHtmlConst(ast);

  /** @type {import('@babel/traverse').NodePath<import('@babel/types').FunctionExpression>[]} */
  const fnExprs = [];

  traverse(ast, {
    FunctionExpression(p) {
      fnExprs.push(p);
    }
  });

  /** @param {import('@babel/traverse').NodePath} p */
  function getPathDepth(p) {
    let d = 0;
    let c = p.parentPath;
    while (c) {
      d++;
      c = c.parentPath;
    }
    return d;
  }

  fnExprs
    .sort((a, b) => getPathDepth(b) - getPathDepth(a))
    .forEach(p => {
      if (!functionMayBecomeArrow(p)) {
        return;
      }
      const { async, params, body } = p.node;
      const arrow = t.arrowFunctionExpression(params, body, async);
      p.replaceWith(arrow);
    });

  traverse(ast, {
    ExpressionStatement(p) {
      const n = p.node;
      if (!t.isStringLiteral(n.expression)) {
        return;
      }
      if (n.expression.value !== 'use strict') {
        return;
      }
      if (n.directive === 'use strict') {
        p.remove();
      }
    },
    BlockStatement(p) {
      const dirs = p.node.directives;
      if (!dirs?.length) {
        return;
      }
      p.node.directives = dirs.filter(d => d.value.value !== 'use strict');
    },
    Program(p) {
      const dirs = p.node.directives;
      if (!dirs?.length) {
        return;
      }
      p.node.directives = dirs.filter(d => d.value.value !== 'use strict');
    }
  });

  traverse(ast, {
    VariableDeclaration(p) {
      if (p.node.kind === 'var') {
        varDeclarationToConstLet(p);
      }
    }
  });

  let out = recast.print(ast, { sourceFileName: filename }).code;
  if (!out.endsWith('\n')) {
    out += '\n';
  }
  return out;
}

function printHelp() {
  console.log(`Usage: node build/codemods/modernize-test-files.mjs [options] [glob ...]

Modernize Mocha/Karma-style tests (default: test/**/*.js). See file header for transforms.

Options:
  -h, --help       Show this message
  --dry-run        List files that would change; do not write
  --verbose        Log unchanged files too
  --no-prettier    Do not run Prettier after writes (recast output only)

By default, Prettier is run on each file that was written (may collapse some blank lines).
`);
}

function parseArgs(argv) {
  const args = {
    dryRun: false,
    verbose: false,
    help: false,
    prettier: true,
    globs: []
  };
  for (const a of argv) {
    if (a === '--help' || a === '-h') {
      args.help = true;
    } else if (a === '--dry-run') {
      args.dryRun = true;
    } else if (a === '--verbose') {
      args.verbose = true;
    } else if (a === '--no-prettier') {
      args.prettier = false;
    } else if (a === '--prettier') {
      args.prettier = true;
    } else if (!a.startsWith('-')) {
      args.globs.push(a);
    }
  }
  if (args.globs.length === 0) {
    args.globs = ['test/**/*.js'];
  }
  return args;
}

const requireFromCodemod = createRequire(import.meta.url);

const PRETTIER_WRITE_CHUNK = 80;

/**
 * @returns {string | null}
 */
function resolvePrettierBin() {
  try {
    return requireFromCodemod.resolve('prettier/bin/prettier.cjs');
  } catch {
    try {
      return requireFromCodemod.resolve('prettier/cli.js');
    } catch {
      return null;
    }
  }
}

/**
 * @param {string} projectRoot
 * @param {string[]} files Absolute paths
 */
function runPrettierOnFiles(projectRoot, files) {
  if (files.length === 0) {
    return;
  }
  const prettierBin = resolvePrettierBin();
  if (!prettierBin) {
    console.warn(
      'Prettier not found under node_modules; skipped auto-format. Run npm run fmt.'
    );
    return;
  }
  console.log('\nRunning Prettier on changed files...');
  try {
    for (let i = 0; i < files.length; i += PRETTIER_WRITE_CHUNK) {
      const chunk = files.slice(i, i + PRETTIER_WRITE_CHUNK);
      execFileSync(process.execPath, [prettierBin, '--write', ...chunk], {
        cwd: projectRoot,
        stdio: 'inherit'
      });
    }
  } catch (e) {
    console.error(e.message || e);
    process.exitCode = 1;
  }
}

async function main() {
  const argv = parseArgs(process.argv.slice(2));
  if (argv.help) {
    printHelp();
    return;
  }
  const cwd = path.join(__dirname, '..', '..');
  /** @type {string[]} */
  const files = [];
  for (const g of argv.globs) {
    const matched = await globAsync(g, {
      cwd,
      nodir: true,
      absolute: true
    });
    files.push(...matched);
  }
  files.sort();
  const unique = [...new Set(files)];

  let changed = 0;
  /** @type {string[]} */
  const writtenFiles = [];
  for (const file of unique) {
    const source = fs.readFileSync(file, 'utf8');
    let next;
    try {
      next = transformSource(source, file);
    } catch (e) {
      console.error(e.message || e);
      process.exitCode = 1;
      continue;
    }
    if (next === source) {
      if (argv.verbose) {
        console.log(`unchanged: ${path.relative(cwd, file)}`);
      }
      continue;
    }
    changed++;
    console.log(
      `${argv.dryRun ? 'would write' : 'write'}: ${path.relative(cwd, file)}`
    );
    if (!argv.dryRun) {
      fs.writeFileSync(file, next, 'utf8');
      writtenFiles.push(file);
    }
  }

  console.log(
    `\nDone. ${changed} file(s) ${argv.dryRun ? 'would be ' : ''}updated.`
  );
  if (argv.dryRun && changed > 0) {
    console.log('Re-run without --dry-run to apply changes.');
  }
  if (!argv.dryRun && writtenFiles.length > 0) {
    if (argv.prettier) {
      runPrettierOnFiles(cwd, writtenFiles);
    } else {
      console.log(
        '\nTip: Prettier was skipped (--no-prettier). Run npm run fmt on changed files to format.'
      );
    }
    console.log('\nNext: npm run eslint -- --fix');
  }
}

main();
