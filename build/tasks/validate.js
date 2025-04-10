/*eslint-env node */
'use strict';

var revalidator = require('revalidator').validate,
  fs = require('fs'),
  path = require('path');

function fileExists(v, o) {
  if (!v.endsWith('.js')) {
    return true;
  }

  var file = path.resolve(path.dirname(o._path), v);
  var exists;
  try {
    exists = fs.existsSync(file);
  } catch {
    return false;
  }
  return exists;
}

function hasUniqueId() {
  var seen = {};
  return function (v, o) {
    if (!seen[v]) {
      seen[v] = o;
      return true;
    }
    return false;
  };
}

function hasMultipleOutcomes(messages) {
  const keys = Object.keys(messages);
  if (keys.length < 2) {
    return false;
  }

  return keys.every(key => {
    switch (key) {
      case 'pass':
      case 'fail':
      case 'incomplete':
        return ['string', 'object'].includes(typeof messages[key]);

      default:
        return false;
    }
  });
}

function createSchemas() {
  var schemas = {};

  schemas.tool = {
    properties: {
      id: {
        required: true,
        type: 'string',
        conform: hasUniqueId()
      },
      options: {
        type: 'object'
      },
      source: {
        type: 'string',
        required: true,
        conform: fileExists,
        messages: {
          conform: 'File does not exist'
        }
      }
    }
  };

  schemas.check = {
    properties: {
      id: {
        required: true,
        type: 'string',
        conform: hasUniqueId()
      },
      excludeHidden: {
        type: 'boolean'
      },
      evaluate: {
        type: 'string',
        required: true,
        conform: fileExists,
        messages: {
          conform: 'File does not exist'
        }
      },
      matches: {
        type: 'string',
        required: false,
        conform: fileExists,
        messages: {
          conform: 'File does not exist'
        }
      },
      metadata: {
        type: 'object',
        required: true,
        properties: {
          messages: {
            required: true,
            type: 'object',
            conform: hasMultipleOutcomes,
            messages: {
              conform: 'Must have at least two valid messages'
            }
          },
          // @deprecated: Use impact on rules instead
          impact: {
            type: 'string',
            enum: ['minor', 'moderate', 'serious', 'critical']
          }
        }
      }
    }
  };

  schemas.rule = {
    seen: {},
    properties: {
      id: {
        required: true,
        type: 'string',
        conform: hasUniqueId()
      },
      selector: {
        type: 'string'
      },
      impact: {
        required: true,
        type: 'string',
        enum: ['minor', 'moderate', 'serious', 'critical']
      },
      excludeHidden: {
        type: 'boolean'
      },
      enabled: {
        type: 'boolean'
      },
      pageLevel: {
        type: 'boolean'
      },
      any: {
        type: 'array',
        items: {
          type: ['string', 'object'],
          conform: function (v) {
            if (typeof v === 'string') {
              return true;
            }
            if (typeof v === 'object' && typeof v.id === 'string') {
              return true;
            }
            return false;
          },
          message: 'must be a string or an object with a key of id'
        }
      },
      all: {
        type: 'array',
        items: {
          type: ['string', 'object'],
          conform: function (v) {
            if (typeof v === 'string') {
              return true;
            }
            if (typeof v === 'object' && typeof v.id === 'string') {
              return true;
            }
            return false;
          },
          message: 'must be a string or an object with a key of id'
        }
      },
      none: {
        type: 'array',
        items: {
          type: ['string', 'object'],
          conform: function (v) {
            if (typeof v === 'string') {
              return true;
            }
            if (typeof v === 'object' && typeof v.id === 'string') {
              return true;
            }
            return false;
          },
          message: 'must be a string or an object with a key of id'
        }
      },
      tags: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      actIds: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      matches: {
        type: 'string',
        required: false,
        conform: fileExists,
        messages: {
          conform: 'File does not exist'
        }
      },
      metadata: {
        type: 'object',
        required: true,
        additionalProperties: false,
        properties: {
          help: {
            required: true,
            type: 'string'
          },
          description: {
            required: true,
            type: 'string'
          }
        }
      }
    }
  };

  return schemas;
}

function validateFiles(grunt, files, schema, type) {
  var valid = true;
  files.forEach(function (f) {
    f.src.forEach(function (pathArg) {
      var file = grunt.file.readJSON(pathArg);
      file._path = pathArg;
      var result = revalidator(file, schema);
      if (!result.valid) {
        result.errors.forEach(function (err) {
          grunt.log.error(pathArg, err.property + ' ' + err.message);
        });
        valid = false;
      }

      const ruleIssues = type === 'rule' ? validateRule(file) : [];
      if (ruleIssues.length > 0) {
        ruleIssues.forEach(issue => grunt.log.error(pathArg, issue));
        valid = false;
      }

      if (valid) {
        grunt.verbose.ok();
      }
    });
  });
  return valid;
}

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'validate',
    'Task for validating API schema for checks and rules',
    function () {
      const { type } = this.options();
      const schemas = createSchemas();
      const schema = schemas[type];
      if (!schema) {
        grunt.log.error(
          'Please specify a valid type to validate: ' + Object.keys(schemas)
        );
        return false;
      }
      const valid = validateFiles(grunt, this.files, schema, type);
      schema.seen = {};
      return valid;
    }
  );
};

function validateRule({ tags, metadata }) {
  if (!Array.isArray(tags) || typeof metadata !== 'object') {
    return [];
  }
  const issues = [];
  const prohibitedWord = tags.includes('best-practice') ? 'must' : 'should';
  const { description, help } = metadata;

  if (description.toLowerCase().includes(prohibitedWord)) {
    issues.push(
      `metadata.description can not contain the word '${prohibitedWord}'.`
    );
  }

  if (help.toLowerCase().includes(prohibitedWord)) {
    issues.push(`metadata.help can not contain the word '${prohibitedWord}'.`);
  }

  issues.push(...findTagIssues(tags));
  return issues;
}

const miscTags = ['ACT', 'experimental', 'review-item', 'deprecated'];

const categories = [
  'aria',
  'color',
  'forms',
  'keyboard',
  'language',
  'name-role-value',
  'parsing',
  'semantics',
  'sensory-and-visual-cues',
  'structure',
  'tables',
  'text-alternatives',
  'time-and-media'
];

const standardsTags = [
  {
    // Has to be first, as others rely on the WCAG level getting picked up first
    name: 'WCAG',
    standardRegex: /^wcag2(1|2)?a{1,3}(-obsolete)?$/,
    criterionRegex: /^wcag\d{3,4}$/
  },
  {
    name: 'Section 508',
    standardRegex: /^section508$/,
    criterionRegex: /^section508\.\d{1,2}\.[a-z]$/,
    wcagLevelRegex: /^wcag2aa?$/
  },
  {
    name: 'Trusted Tester',
    standardRegex: /^TTv5$/,
    criterionRegex: /^TT\d{1,3}\.[a-z]$/,
    wcagLevelRegex: /^wcag2aa?$/
  },
  {
    name: 'EN 301 549',
    standardRegex: /^EN-301-549$/,
    criterionRegex: /^EN-9\.[1-4]\.[1-9]\.\d{1,2}$/,
    wcagLevelRegex: /^wcag21?aa?$/
  }
];

function findTagIssues(tags) {
  const issues = [];
  const catTags = tags.filter(tag => tag.startsWith('cat.'));
  const bestPracticeTags = tags.filter(tag => tag === 'best-practice');

  // Category
  if (catTags.length !== 1) {
    issues.push(`Must have exactly one cat. tag, got ${catTags.length}`);
  }
  if (catTags.length && !categories.includes(catTags[0].slice(4))) {
    issues.push(`Invalid category tag: ${catTags[0]}`);
  }
  if (!startsWith(tags, catTags)) {
    issues.push(`Tag ${catTags[0]} must be before ${tags[0]}`);
  }
  tags = removeTags(tags, catTags);

  // Best practice
  if (bestPracticeTags.length > 1) {
    issues.push(
      `Only one best-practice tag is allowed, got ${bestPracticeTags.length}`
    );
  }
  if (!startsWith(tags, bestPracticeTags)) {
    issues.push(`Tag ${bestPracticeTags[0]} must be before ${tags[0]}`);
  }
  tags = removeTags(tags, bestPracticeTags);

  const standards = {};
  // WCAG, Section 508, Trusted Tester, EN 301 549
  for (const {
    name,
    standardRegex,
    criterionRegex,
    wcagLevelRegex
  } of standardsTags) {
    const standardTags = tags.filter(tag => tag.match(standardRegex));
    const criterionTags = tags.filter(tag => tag.match(criterionRegex));
    if (!standardTags.length && !criterionTags.length) {
      continue;
    }

    standards[name] = {
      name,
      standardTag: standardTags[0] ?? null,
      criterionTags
    };
    if (bestPracticeTags.length !== 0) {
      issues.push(`${name} tags cannot be used along side best-practice tag`);
    }
    if (standardTags.length === 0) {
      issues.push(`Expected one ${name} tag, got 0`);
    } else if (standardTags.length > 1) {
      issues.push(`Expected one ${name} tag, got: ${standardTags.join(', ')}`);
    }
    if (criterionTags.length === 0) {
      issues.push(`Expected at least one ${name} criterion tag, got 0`);
    }

    if (wcagLevelRegex) {
      const wcagLevel = standards.WCAG.standardTag;
      if (!wcagLevel.match(wcagLevelRegex)) {
        issues.push(`${name} rules not allowed on ${wcagLevel}`);
      }
    }

    // Must have the same criteria listed
    if (name === 'EN 301 549') {
      const wcagCriteria = standards.WCAG.criterionTags.map(tag =>
        tag.slice(4)
      );
      const enCriteria = criterionTags.map(tag =>
        tag.slice(5).replaceAll('.', '')
      );
      if (
        wcagCriteria.length !== enCriteria.length ||
        !startsWith(wcagCriteria, enCriteria)
      ) {
        issues.push(
          `Expect WCAG and EN criteria numbers to match: ${wcagCriteria.join(
            ', '
          )} vs ${enCriteria.join(', ')}}`
        );
      }
    }
    tags = removeTags(tags, [...standardTags, ...criterionTags]);
  }

  // Other tags
  const usedMiscTags = miscTags.filter(tag => tags.includes(tag));
  const unknownTags = removeTags(tags, usedMiscTags);
  if (unknownTags.length) {
    issues.push(`Invalid tags: ${unknownTags.join(', ')}`);
  }

  // At this point only misc tags are left:
  tags = removeTags(tags, unknownTags);
  if (!startsWith(tags, usedMiscTags)) {
    issues.push(
      `Tags [${tags.join(', ')}] should be sorted like [${usedMiscTags.join(
        ', '
      )}]`
    );
  }

  return issues;
}

function startsWith(arr1, arr2) {
  return arr2.every((item, i) => item === arr1[i]);
}

function removeTags(tags, tagsToRemove) {
  return tags.filter(tag => !tagsToRemove.includes(tag));
}
