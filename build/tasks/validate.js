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
  } catch (e) {
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
          impact: {
            required: true,
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
        },
        conform: function hasCategoryTag(tags) {
          return tags.some(tag => tag.includes('cat.'));
        },
        messages: {
          conform: 'must include a category tag'
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
  return issues;
}
