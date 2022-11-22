/*eslint-env node */
/*eslint max-len: off */
'use strict';

var clone = require('clone');
var doT = require('@deque/dot');
var templates = require('./templates');
var buildManual = require('./build-manual');
var entities = new (require('html-entities').AllHtmlEntities)();
var packageJSON = require('../package.json');
var doTRegex = /\{\{.+?\}\}/g;

var axeVersion = packageJSON.version.substring(
  0,
  packageJSON.version.lastIndexOf('.')
);

var descriptionTableHeader =
  '| Rule ID | Description | Impact | Tags | Issue Type | ACT Rules |\n| :------- | :------- | :------- | :------- | :------- | :------- |\n';

// prevent striping newline characters from strings (e.g. failure
// summaries). must be synced with lib/core/imports/index.js
doT.templateSettings.strip = false;

function getLocale(grunt, options) {
  var localeFile;
  if (options.locale) {
    localeFile = './locales/' + options.locale + '.json';
  }

  if (localeFile) {
    return grunt.file.readJSON(localeFile);
  }
}

function makeHeaderLink(title) {
  return title.replace(/ /g, '-').replace(/[\.&]/g, '').toLowerCase();
}

function buildRules(grunt, options, commons, callback) {
  var axeImpact = Object.freeze(['minor', 'moderate', 'serious', 'critical']); // TODO: require('../axe') does not work if grunt configure is moved after uglify, npm test breaks with undefined. Complicated grunt concurrency issue.
  var locale = getLocale(grunt, options);
  options.getFiles = false;
  buildManual(grunt, options, commons, function (result) {
    var metadata = {
      rules: {},
      checks: {}
    };
    var descriptions = {
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

    var TOC = Object.keys(descriptions)
      .map(key => {
        return `- [${descriptions[key].title}](#${makeHeaderLink(
          descriptions[key].title
        )})`;
      })
      .join('\n');

    var tags = options.tags ? options.tags.split(/\s*,\s*/) : [];
    var rules = result.rules;
    var checks = result.checks;

    // Translate checks before parsing them so that translations
    // get applied to the metadata object
    if (locale && locale.checks) {
      checks.forEach(function (check) {
        if (locale.checks[check.id] && check.metadata) {
          check.metadata.messages = locale.checks[check.id];
        }
      });
    }

    parseChecks(checks);

    function parseMetaData(source, propType) {
      var data = source.metadata;
      var key = source.id || source.type;
      if (key && locale && locale[propType] && propType !== 'checks') {
        data = locale[propType][key] || data;
      }
      var result = clone(data) || {};

      if (result.messages) {
        Object.keys(result.messages).forEach(function (key) {
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
      var result = {};
      summaries.forEach(function (summary) {
        if (summary.type) {
          result[summary.type] = parseMetaData(summary, 'failureSummaries');
        }
      });
      return result;
    }

    function getIncompleteMsg(summaries) {
      var summary = summaries.find(function (summary) {
        return typeof summary.incompleteFallbackMessage === 'string';
      });
      return summary ? summary.incompleteFallbackMessage : '';
    }

    function replaceFunctions(string) {
      return string
        .replace(
          /"(evaluate|after|gather|matches|source|commons)":\s*("[^"]+?.js")/g,
          function (m, p1, p2) {
            return m.replace(p2, getSource(p2.replace(/^"|"$/g, ''), p1));
          }
        )
        .replace(
          /"(function anonymous\([\s\S]+?\) {)([\s\S]+?)(})"/g,
          function (m) {
            return JSON.parse(m);
          }
        )
        .replace(/"(\(function \(\) {)([\s\S]+?)(}\)\(\))"/g, function (m) {
          return JSON.parse(m);
        });
    }

    function getSource(file, type) {
      return grunt.template.process(templates[type], {
        data: {
          source: grunt.file.read(file)
        }
      });
    }

    function findCheck(checks, id) {
      return checks.filter(function (check) {
        if (check.id === id) {
          return true;
        }
      })[0];
    }

    function blacklist(k, v) {
      if (options.blacklist.indexOf(k) !== -1) {
        return undefined;
      }
      return v;
    }

    function parseChecks(collection) {
      return collection.map(function (check) {
        var c = {};
        var id = typeof check === 'string' ? check : check.id;
        var definition = clone(findCheck(checks, id));
        if (!definition) {
          grunt.log.error('check ' + id + ' not found');
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
      return checkCollection.reduce(function (out, check) {
        var id = typeof check === 'string' ? check : check.id;
        var definition = clone(findCheck(checks, id));
        if (!definition) {
          grunt.log.error('check ' + id + ' not found');
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
        return arr.filter(function (value, index, self) {
          return self.indexOf(value) === index;
        });
      }

      function getImpactScores(definition, out) {
        if (definition && definition.metadata && definition.metadata.impact) {
          var impactScore = axeImpact.indexOf(definition.metadata.impact);
          out.push(impactScore);
        }
        return out;
      }

      function getScore(checkCollection, onlyHighestScore) {
        var scores = traverseChecks(checkCollection, getImpactScores, []);
        if (scores && scores.length) {
          return onlyHighestScore
            ? [Math.max.apply(null, scores)]
            : getUniqueArr(scores);
        } else {
          return [];
        }
      }

      var highestImpactForRuleTypeAny = getScore(rule.any, true);
      var allUniqueImpactsForRuleTypeAll = getScore(rule.all, false);
      var allUniqueImpactsForRuleTypeNone = getScore(rule.none, false);
      var cumulativeImpacts = highestImpactForRuleTypeAny
        .concat(allUniqueImpactsForRuleTypeAll)
        .concat(allUniqueImpactsForRuleTypeNone);
      var cumulativeScores = getUniqueArr(cumulativeImpacts).sort(); //order lowest to highest

      return cumulativeScores.reduce(function (out, cV) {
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
      var actIds = rule.actIds || [];
      var actLinks = [];
      actIds.forEach(id =>
        actLinks.push(`[${id}](https://act-rules.github.io/rules/${id})`)
      );
      return actLinks.join(', ');
    }

    rules.map(function (rule) {
      var impact = parseImpactForRule(rule);
      var canFail = parseFailureForRule(rule);
      var canIncomplete = parseIncompleteForRule(rule);

      rule.any = parseChecks(rule.any);
      rule.all = parseChecks(rule.all);
      rule.none = parseChecks(rule.none);
      if (rule.metadata && !metadata.rules[rule.id]) {
        metadata.rules[rule.id] = parseMetaData(rule, 'rules'); // Translate rules
      }

      var rules;
      if (rule.tags.includes('deprecated')) {
        rules = descriptions.deprecated.rules;
      } else if (rule.tags.includes('experimental')) {
        rules = descriptions.experimental.rules;
      } else if (rule.tags.find(tag => tag.includes('aaa'))) {
        rules = descriptions.wcag2aaa.rules;
      } else if (rule.tags.includes('best-practice')) {
        rules = descriptions.bestPractice.rules;
      } else if (rule.tags.find(tag => tag.startsWith('wcag2a'))) {
        rules = descriptions.wcag20.rules;
      } else if (rule.tags.find(tag => tag.startsWith('wcag21a'))) {
        rules = descriptions.wcag21.rules;
      } else {
        rules = descriptions.wcag22.rules;
      }

      var issueType = [];
      if (canFail) {
        issueType.push('failure');
      }
      if (canIncomplete) {
        issueType.push('needs&nbsp;review');
      }

      var actLinks = createActLinksForRule(rule);

      rules.push([
        `[${rule.id}](https://dequeuniversity.com/rules/axe/${axeVersion}/${rule.id}?application=RuleDescription)`,
        entities.encode(rule.metadata.description),
        impact,
        rule.tags.join(', '),
        issueType.join(', '),
        actLinks
      ]);
      if (tags.length) {
        rule.enabled = !!rule.tags.filter(function (t) {
          return tags.indexOf(t) !== -1;
        }).length;
      }
      return rule;
    });

    var ruleTables = Object.keys(descriptions)
      .map(key => {
        var description = descriptions[key];

        return `
## ${description.title}

${description.intro ? description.intro : ''}

${
  description.rules.length
    ? descriptionTableHeader
    : '_There are no matching rules_'
}${description.rules
          .map(function (row) {
            return '| ' + row.join(' | ') + ' |';
          })
          .join('\n')}`;
      })
      .join('\n\n');

    var descriptions = `
# Rule Descriptions

## Table of Contents
${TOC}
${ruleTables}`;

    // Translate failureSummaries
    metadata.failureSummaries = createFailureSummaryObject(result.misc);
    metadata.incompleteFallbackMessage = getIncompleteMsg(result.misc);

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

module.exports = buildRules;
