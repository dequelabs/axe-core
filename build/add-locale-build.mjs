import path from 'node:path';
import clone from 'clone';
import buildManual from './build-manual.mjs';
import { compareRuleIds, sortRecordKeysByRuleId } from './rule-id-sort.mjs';

/**
 * @param {ReturnType<import('./build-context.mjs').createBuildContext>} ctx
 */
export function runAddLocaleTemplate(ctx) {
  const options = {
    rules: ['lib/rules/**/*.json'],
    checks: ['lib/checks/**/*.json'],
    misc: ['lib/misc/**/*.json'],
    blacklist: ['metadata'],
    tags: '',
    lang: 'xyz'
  };

  buildManual(ctx, options, result => {
    const locale = {
      lang: options.lang,
      rules: rulesToSortedMap(result.rules),
      checks: checksToOrderedMap(result.checks),
      failureSummaries: failureSummariesToSortedMap(result.misc),
      incompleteFallbackMessage: result.misc.reduce((out, misc) => {
        return misc.incompleteFallbackMessage
          ? misc.incompleteFallbackMessage
          : out;
      }, '')
    };

    if (ctx.exists(`locales/${options.lang}.json`)) {
      const oldMessages = ctx.readJSON(`locales/${options.lang}.json`);
      mergeMessages(locale, oldMessages);
    }

    // `mergeMessages` only overwrites values, never reorders keys, so the
    // pre-existing ordering above is preserved. We only re-sort the rules and
    // failure summary maps since those are intentionally keyed alphabetically;
    // checks stay in file-path order.
    locale.rules = sortRecordKeysByRuleId(locale.rules);
    locale.failureSummaries = sortRecordKeysByRuleId(locale.failureSummaries);

    ctx.writeFile('locales/_template.json', JSON.stringify(locale, null, '  '));
    console.log(
      'created file at',
      path.join(ctx.root, 'locales/_template.json')
    );
  });
}

/**
 * @param {ReturnType<import('./build-context.mjs').createBuildContext>} ctx
 * @param {string} langCode
 */
export function runAddLocaleNewLang(ctx, langCode) {
  const options = {
    rules: ['lib/rules/**/*.json'],
    checks: ['lib/checks/**/*.json'],
    misc: ['lib/misc/**/*.json'],
    blacklist: ['metadata'],
    tags: '',
    lang: langCode
  };

  const destRel = `locales/${langCode || 'new-locale'}.json`;

  buildManual(ctx, options, result => {
    const locale = {
      lang: options.lang,
      rules: rulesToSortedMap(result.rules),
      checks: checksToOrderedMap(result.checks),
      failureSummaries: failureSummariesToSortedMap(result.misc),
      incompleteFallbackMessage: result.misc.reduce((out, misc) => {
        return misc.incompleteFallbackMessage
          ? misc.incompleteFallbackMessage
          : out;
      }, '')
    };

    const localePath = `locales/${langCode}.json`;
    if (langCode && ctx.exists(localePath)) {
      const oldMessages = ctx.readJSON(localePath);
      mergeMessages(locale, oldMessages);
    }

    locale.rules = sortRecordKeysByRuleId(locale.rules);
    locale.failureSummaries = sortRecordKeysByRuleId(locale.failureSummaries);

    ctx.writeFile(destRel, JSON.stringify(locale, null, '  '));
    console.log('created file at', path.join(ctx.root, destRel));
  });
}

function mergeMessages(newMessages, oldMessages) {
  Object.keys(newMessages).forEach(key => {
    if (!Object.hasOwn(oldMessages, key)) {
      return;
    }

    const newValue = newMessages[key];
    const oldValue = oldMessages[key];

    if (typeof newValue === 'object') {
      if (typeof oldValue !== 'object') {
        return;
      }

      newMessages[key] = mergeMessages(clone(newValue), oldValue);
    } else {
      newMessages[key] = clone(oldValue);
    }
  });

  return newMessages;
}

/**
 * @param {{ id: string, metadata: object }[]} rules
 * @returns {Record<string, object>}
 */
function rulesToSortedMap(rules) {
  return [...rules]
    .sort((a, b) => compareRuleIds(a.id, b.id))
    .reduce((out, rule) => {
      out[rule.id] = rule.metadata;
      return out;
    }, {});
}

/**
 * Preserves the order of `checks` as provided by `buildManual`, which expands
 * `lib/checks/**\/*.json` alphabetically by file path. That keeps checks
 * grouped by their containing directory (e.g. `aria/*`, then `color/*`)
 * instead of sorting strictly by check id — matching the historical Grunt
 * `add-locale` output.
 *
 * @param {{ id: string, metadata?: { messages?: object } }[]} checks
 * @returns {Record<string, object>}
 */
function checksToOrderedMap(checks) {
  return checks
    .filter(check => check.metadata)
    .reduce((out, check) => {
      out[check.id] = check.metadata.messages;
      return out;
    }, {});
}

/**
 * @param {{ type: string, metadata: object }[]} misc
 * @returns {Record<string, object>}
 */
function failureSummariesToSortedMap(misc) {
  return [...misc]
    .sort((a, b) => String(a.type).localeCompare(String(b.type)))
    .reduce((out, item) => {
      out[item.type] = item.metadata;
      return out;
    }, {});
}
