/*eslint max-len: off */
import path from 'node:path';
import clone from 'clone';
import doT from '@deque/dot';
import { encode } from 'html-entities';
import templates from './templates.mjs';
import buildManual from './build-manual.mjs';
import { templateProcess } from './build-context.mjs';
import { compareRuleIds } from './rule-id-sort.mjs';

const doTRegex = /\{\{.+?\}\}/g;

const descriptionTableHeader =
  '| Rule ID | Description | Impact | Tags | Issue Type | [ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/rules/) |\n| :------- | :------- | :------- | :------- | :------- | :------- |\n';

// prevent striping newline characters from strings (e.g. failure
// summaries). must be synced with lib/core/imports/index.js
doT.templateSettings.strip = false;

function getLocale(ctx, options) {
  if (options.locale) {
    return ctx.readJSON(`locales/${options.locale}.json`);
  }
}

function makeHeaderLink(title) {
  return title.replace(/ /g, '-').replace(/[\.&]/g, '').toLowerCase();
}

function buildRules(ctx, options, callback) {
  const packageJSON = ctx.readJSON('package.json');
  const axeVersion = packageJSON.version.substring(
    0,
    packageJSON.version.lastIndexOf('.')
  );
  // Impact order for derived rule text (matches axe.commons.impact severity order).
  const axeImpact = Object.freeze(['minor', 'moderate', 'serious', 'critical']);
  const locale = getLocale(ctx, options);
  options.getFiles = false;
  buildManual(ctx, options, build => {
    const metadata = {
      rules: {},
      checks: {}
    };
    let descriptions = {
      wcag20: {
        title: 'WCAG 2.0 Level A & AA Rules',
        rules: []
      },
      wcag21: {
        title: 'WCAG 2.1 Level A & AA Rules',
        rules: []
      },
      wcag22: {
        title: 'WCAG 2.2 Level A & AA Rules',
        intro:
          'These rules are disabled by default, until WCAG 2.2 is more widely adopted and required.',
        rules: []
      },
      bestPractice: {
        title: 'Best Practices Rules',
        intro:
          'Rules that do not necessarily conform to WCAG success criterion but are industry accepted practices that improve the user experience.',
        rules: []
      },
      wcag2aaa: {
        title: 'WCAG 2.x level AAA rules',
        intro:
          'Rules that check for conformance to WCAG AAA success criteria that can be fully automated. These are disabled by default in axe-core.',
        rules: []
      },
      experimental: {
        title: 'Experimental Rules',
        intro:
          'Rules we are still testing and developing. They are disabled by default in axe-core, but are enabled for the axe browser extensions.',
        rules: []
      },
      deprecated: {
        title: 'Deprecated Rules',
        intro:
          'Deprecated rules are disabled by default and will be removed in the next major release.',
        rules: []
      }
    };

    const TOC = Object.keys(descriptions)
      .map(key => {
        return `- [${descriptions[key].title}](#${makeHeaderLink(
          descriptions[key].title
        )})`;
      })
      .join('\n');

    const tags = options.tags ? options.tags.split(/\s*,\s*/) : [];
    const rules = build.rules;
    const checks = build.checks;

    // Translate checks before parsing them so that translations
    // get applied to the metadata object
    if (locale && locale.checks) {
      checks.forEach(check => {
        if (locale.checks[check.id] && check.metadata) {
          check.metadata.messages = locale.checks[check.id];
        }
      });
    }

    parseChecks(checks);

    function parseMetaData(source, propType) {
      let data = source.metadata;
      const id = source.id || source.type;
      if (id && locale && locale[propType] && propType !== 'checks') {
        data = locale[propType][id] || data;
      }
      const result = clone(data) || {};

      if (result.messages) {
        Object.keys(result.messages).forEach(key => {
          // only convert to templated function for strings
          // objects handled later in publish-metadata.js
          if (
            typeof result.messages[key] !== 'object' &&
            doTRegex.test(result.messages[key])
          ) {
            result.messages[key] = doT
              .template(result.messages[key])
              .toString();
          }
        });
      }
      //TODO this is actually failureSummaries, property name should better reflect that
      if (result.failureMessage && doTRegex.test(result.failureMessage)) {
        result.failureMessage = doT.template(result.failureMessage).toString();
      }
      return result;
    }

    function createFailureSummaryObject(summaries) {
      const result = {};
      summaries.forEach(summary => {
        if (summary.type) {
          result[summary.type] = parseMetaData(summary, 'failureSummaries');
        }
      });
      return result;
    }

    function getIncompleteMsg(summaries) {
      const summary = summaries.find(
        element => typeof element.incompleteFallbackMessage === 'string'
      );
      return summary ? summary.incompleteFallbackMessage : '';
    }

    function replaceFunctions(string) {
      return string
        .replace(
          /"(evaluate|after|gather|matches|source|commons)":\s*("[^"]+?.js")/g,
          (m, p1, p2) => {
            return m.replace(p2, getSource(p2.replace(/^"|"$/g, ''), p1));
          }
        )
        .replace(/"(function anonymous\([\s\S]+?\) {)([\s\S]+?)(})"/g, m =>
          JSON.parse(m)
        )
        .replace(/"(\(function \(\) {)([\s\S]+?)(}\)\(\))"/g, m =>
          JSON.parse(m)
        );
    }

    function getSource(file, type) {
      const abs = path.isAbsolute(file) ? file : path.join(ctx.root, file);
      return templateProcess(templates[type], {
        source: ctx.readFile(path.relative(ctx.root, abs))
      });
    }

    function findCheck(checkCollection, id) {
      return checkCollection.find(check => check.id === id);
    }

    const blacklist = (k, v) => {
      if (options.blacklist.indexOf(k) !== -1) {
        return undefined;
      }
      return v;
    };

    function parseChecks(collection) {
      return collection.map(check => {
        const c = {};
        const id = typeof check === 'string' ? check : check.id;
        const definition = clone(findCheck(checks, id));
        if (!definition) {
          console.error('check ' + id + ' not found');
        }
        c.options = check.options || definition.options;
        c.id = id;

        if (definition.metadata && !metadata.checks[id]) {
          metadata.checks[id] = parseMetaData(definition, 'checks');
        }

        return c.options === undefined ? id : c;
      });
    }

    function traverseChecks(checkCollection, predicate, startValue) {
      return checkCollection.reduce((out, check) => {
        const id = typeof check === 'string' ? check : check.id;
        const definition = clone(findCheck(checks, id));
        if (!definition) {
          console.error('check ' + id + ' not found');
        }
        return predicate(definition, out);
      }, startValue);
    }

    function parseImpactForRule(rule) {
      function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
      if (rule.impact) {
        return capitalize(rule.impact);
      }

      function getUniqueArr(arr) {
        return arr.filter(
          (value, index, self) => self.indexOf(value) === index
        );
      }

      function getImpactScores(definition, out) {
        if (definition && definition.metadata && definition.metadata.impact) {
          const impactScore = axeImpact.indexOf(definition.metadata.impact);
          out.push(impactScore);
        }
        return out;
      }

      function getScore(checkCollection, onlyHighestScore) {
        const scores = traverseChecks(checkCollection, getImpactScores, []);
        if (scores && scores.length) {
          return onlyHighestScore
            ? [Math.max.apply(null, scores)]
            : getUniqueArr(scores);
        } else {
          return [];
        }
      }

      const highestImpactForRuleTypeAny = getScore(rule.any, true);
      const allUniqueImpactsForRuleTypeAll = getScore(rule.all, false);
      const allUniqueImpactsForRuleTypeNone = getScore(rule.none, false);
      const cumulativeImpacts = highestImpactForRuleTypeAny
        .concat(allUniqueImpactsForRuleTypeAll)
        .concat(allUniqueImpactsForRuleTypeNone);
      const cumulativeScores = getUniqueArr(cumulativeImpacts).sort(); //order lowest to highest

      return cumulativeScores.reduce((out, cV) => {
        return out.length
          ? out + ', ' + capitalize(axeImpact[cV])
          : capitalize(axeImpact[cV]);
      }, '');
    }

    function parseFailureForRule(rule) {
      function hasFailure(definition, out) {
        if (
          !rule.reviewOnFail &&
          definition &&
          definition.metadata &&
          definition.metadata.impact
        ) {
          out = out || !!definition.metadata.messages.fail;
        }
        return out;
      }

      return (
        traverseChecks(rule.any, hasFailure, false) ||
        traverseChecks(rule.all, hasFailure, false) ||
        traverseChecks(rule.none, hasFailure, false)
      );
    }

    function parseIncompleteForRule(rule) {
      function hasIncomplete(definition, out) {
        if (definition && definition.metadata && definition.metadata.impact) {
          out =
            out ||
            !!definition.metadata.messages.incomplete ||
            rule.reviewOnFail;
        }
        return out;
      }

      return (
        traverseChecks(rule.any, hasIncomplete, false) ||
        traverseChecks(rule.all, hasIncomplete, false) ||
        traverseChecks(rule.none, hasIncomplete, false)
      );
    }

    function createActLinksForRule(rule) {
      const actIds = rule.actIds || [];
      const actLinks = [];
      actIds.forEach(id =>
        actLinks.push(`[${id}](https://act-rules.github.io/rules/${id})`)
      );
      return actLinks.join(', ');
    }

    rules.map(rule => {
      const impact = parseImpactForRule(rule);
      const canFail = parseFailureForRule(rule);
      const canIncomplete = parseIncompleteForRule(rule);

      rule.any = parseChecks(rule.any);
      rule.all = parseChecks(rule.all);
      rule.none = parseChecks(rule.none);
      if (rule.metadata && !metadata.rules[rule.id]) {
        metadata.rules[rule.id] = parseMetaData(rule, 'rules'); // Translate rules
      }

      let result;
      if (rule.tags.includes('deprecated')) {
        result = descriptions.deprecated.rules;
      } else if (rule.tags.includes('experimental')) {
        result = descriptions.experimental.rules;
      } else if (rule.tags.find(tag => tag.includes('aaa'))) {
        result = descriptions.wcag2aaa.rules;
      } else if (rule.tags.includes('best-practice')) {
        result = descriptions.bestPractice.rules;
      } else if (rule.tags.find(tag => tag.startsWith('wcag2a'))) {
        result = descriptions.wcag20.rules;
      } else if (rule.tags.find(tag => tag.startsWith('wcag21a'))) {
        result = descriptions.wcag21.rules;
      } else {
        result = descriptions.wcag22.rules;
      }

      const issueType = [];
      if (canFail) {
        issueType.push('failure');
      }
      if (canIncomplete) {
        issueType.push('needs&nbsp;review');
      }

      const actLinks = createActLinksForRule(rule);

      result.push([
        `[${rule.id}](https://dequeuniversity.com/rules/axe/${axeVersion}/${rule.id}?application=RuleDescription)`,
        encode(rule.metadata.description),
        impact,
        rule.tags.join(', '),
        issueType.join(', '),
        actLinks
      ]);
      if (tags.length) {
        rule.enabled = !!rule.tags.filter(t => tags.indexOf(t) !== -1).length;
      }
      return rule;
    });

    Object.keys(descriptions).forEach(key => {
      descriptions[key].rules.sort((a, b) => {
        const idA = /^\[([^\]]+)\]/.exec(a[0]);
        const idB = /^\[([^\]]+)\]/.exec(b[0]);
        const keyA = idA ? idA[1] : a[0];
        const keyB = idB ? idB[1] : b[0];
        return compareRuleIds(keyA, keyB);
      });
    });

    const ruleTables = Object.keys(descriptions)
      .map(key => {
        const description = descriptions[key];

        return `
## ${description.title}

${description.intro ? description.intro : ''}

${
  description.rules.length
    ? descriptionTableHeader
    : '_There are no matching rules_'
}${description.rules.map(row => '| ' + row.join(' | ') + ' |').join('\n')}`;
      })
      .join('\n\n');

    descriptions = `
<!--- This file is automatically generated using build/configure.mjs --->

# Rule Descriptions

## Table of Contents
${TOC}
${ruleTables}`;

    // Translate failureSummaries
    metadata.failureSummaries = createFailureSummaryObject(build.misc);
    metadata.incompleteFallbackMessage = getIncompleteMsg(build.misc);

    callback({
      auto: replaceFunctions(
        JSON.stringify(
          {
            lang: options.locale || 'en',
            data: metadata,
            rules: rules,
            checks: checks
          },
          blacklist
        )
      ),
      manual: replaceFunctions(
        JSON.stringify(
          {
            data: metadata,
            rules: rules,
            checks: checks
          },
          blacklist
        )
      ),
      descriptions
    });
  });
}

export default buildRules;
