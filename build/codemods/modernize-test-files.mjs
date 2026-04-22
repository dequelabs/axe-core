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
 *   and using binding reassignment analysis
 * - Turn `+` chains used for multi-line HTML/strings into template literals (backticks);
 *   non-string operands become `${expr}` (identifiers, calls, nested `+` that are not
 *   plain numeric addition, etc.); a single space is added inside the backticks at the
 *   start and end so Prettier can reflow long HTML more readably.
 *
 * Usage:
 *   node build/codemods/modernize-test-files.mjs [options] [glob ...]
 *
 * Options:
 *   -h, --help         Show this message
 *   --dry-run          Print files that would change, do not write
 *   --verbose          Log per-file actions
 *   --prettier         After writes, run Prettier on changed files (can collapse blanks)
 *
 * Default globs: all .js files under test/ (glob: test slash star star slash star dot js)
 *
 * Output uses recast so unchanged regions (including blank lines) stay aligned with the
 * original source. Optional `--prettier` reformats changed files (Prettier may collapse
 * some blank lines). Then run npm run eslint -- --fix and the test suite as needed.
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
 * @param {import('@babel/types').Expression[]} parts
 */
function partsToTemplateLiteral(parts) {
  /** @type {import('@babel/types').TemplateElement[]} */
  const quasis = [];
  /** @type {import('@babel/types').Expression[]} */
  const expressions = [];
  /** Leading space inside opening backtick (Prettier-friendly padding). */
  let buffer = ' ';

  for (const part of parts) {
    if (t.isStringLiteral(part)) {
      buffer += escapeTemplateQuasiText(part.value);
      continue;
    }
    const raw = buffer;
    buffer = '';
    quasis.push(t.templateElement({ raw, cooked: raw }, false));
    expressions.push(part);
  }
  /** Trailing space inside closing backtick. */
  buffer += ' ';
  quasis.push(t.templateElement({ raw: buffer, cooked: buffer }, true));

  return t.templateLiteral(quasis, expressions);
}

/**
 * @param {string} source
 * @param {string} filename
 */
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
      binPath.replaceWith(partsToTemplateLiteral(parts));
    }
  });

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
  -h, --help     Show this message
  --dry-run      List files that would change; do not write
  --verbose      Log unchanged files too
  --prettier     Run Prettier on changed files after write (may collapse blank lines)

By default, blank lines are preserved (no Prettier). Pass --prettier to format with Prettier.
`);
}

function parseArgs(argv) {
  const args = {
    dryRun: false,
    verbose: false,
    help: false,
    prettier: false,
    globs: []
  };
  for (const a of argv) {
    if (a === '--help' || a === '-h') {
      args.help = true;
    } else if (a === '--dry-run') {
      args.dryRun = true;
    } else if (a === '--verbose') {
      args.verbose = true;
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
        '\nTip: run npm run fmt on changed files if you want Prettier, or re-run with --prettier.'
      );
    }
    console.log('\nNext: npm run eslint -- --fix');
  }
}

main();
