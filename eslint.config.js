const prettier = require('eslint-config-prettier');
const globals = require('globals');
const mochaNoOnly = require('eslint-plugin-mocha-no-only');

module.exports = [
  prettier,
  {
    rules: {
      'mocha-no-only/mocha-no-only': ['error'],
      'no-bitwise': 2,
      camelcase: 2,
      curly: 2,
      eqeqeq: 2,
      'guard-for-in': 2,
      'wrap-iife': [2, 'any'],
      'no-use-before-define': [
        2,
        {
          functions: false
        }
      ],
      'new-cap': 2,
      'no-caller': 2,
      'no-empty': 2,
      'no-new': 2,
      'no-plusplus': 0,
      'no-undef': 2,
      'no-unused-vars': 2,
      strict: 0,
      'max-params': [2, 6],
      'max-depth': [2, 5],
      'max-len': 0,
      semi: 0,
      'no-cond-assign': 0,
      'no-debugger': 2,
      'no-eq-null': 0,
      'no-eval': 2,
      'no-unused-expressions': 0,
      'block-scoped-var': 0,
      'no-iterator': 0,
      'linebreak-style': 0,
      'no-loop-func': 0,
      'no-multi-str': 0,
      'no-proto': 0,
      'no-script-url': 0,
      'dot-notation': 2,
      'no-new-func': 0,
      'no-new-wrappers': 0,
      'no-shadow': 2,
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[property.name=tagName]',
          message: "Don't use node.tagName, use node.nodeName instead."
        },
        // node.attributes can be clobbered so is unsafe to use
        // @see https://github.com/dequelabs/axe-core/pull/1432
        {
          // node.attributes
          selector:
            'MemberExpression[object.name=node][property.name=attributes]',
          message:
            "Don't use node.attributes, use node.hasAttributes() or axe.utils.getNodeAttributes(node) instead."
        },
        {
          // vNode.actualNode.attributes
          selector:
            'MemberExpression[object.property.name=actualNode][property.name=attributes]',
          message:
            "Don't use node.attributes, use node.hasAttributes() or axe.utils.getNodeAttributes(node) instead."
        },
        // node.contains doesn't work with shadow dom
        // @see https://github.com/dequelabs/axe-core/issues/4194
        {
          // node.contains()
          selector:
            'CallExpression[callee.object.name=node][callee.property.name=contains]',
          message:
            "Don't use node.contains(node2) as it doesn't work across shadow DOM. Use axe.utils.contains(node, node2) instead."
        },
        {
          // vNode.actualNode.contains()
          selector:
            'CallExpression[callee.object.property.name=actualNode][callee.property.name=contains]',
          message:
            "Don't use node.contains(node2) as it doesn't work across shadow DOM. Use axe.utils.contains(node, node2) instead."
        }
      ]
    },
    plugins: {
      'mocha-no-only': mochaNoOnly
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        axe: true,
        Promise: true,
        ...globals.node,
        ...globals.es2015
      }
    }
  },
  {
    files: ['lib/**/*.js'],
    // reporters and check after methods should not have access to window or document
    ignores: ['lib/core/reporters/**/*.js', 'lib/**/*-after.js'],
    languageOptions: {
      sourceType: 'module',
      // lib files should not access global window properties without going through window (i.e. do not add globals.browser)
      globals: {
        window: true,
        document: true,
        ...globals.node,
        ...globals.es2015
      }
    },
    rules: {
      'func-names': [2, 'as-needed'],
      'prefer-const': 2,
      'no-use-before-define': 'off'
    }
  },
  {
    // disallow imports from node modules
    ignores: ['lib/core/imports/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^[^.]',
              message: 'Only core/imports files should import from node modules'
            }
          ]
        }
      ]
    }
  },
  {
    // disallow imports in standards
    files: ['lib/standards/**/*.js'],
    // index file can import other standards and from utils
    ignores: ['lib/standards/index.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*'],
              message:
                "Standard files shouldn't use imports as they are just hard coded data objects"
            }
          ]
        }
      ]
    }
  },
  {
    // restrict imports to core/utils files to other core/utils, core, core/base, standards, imports, or reporters/helpers
    files: ['lib/core/utils/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // e.g. "../commons/aria/" or "../public/"
              regex:
                '.*\\.\\.\\/(commons|public|checks|rules)(\\/|$)|.*\\.\\.\\/reporters\\/.*?\\.js',
              message:
                'Util files should only import from other utils, core, or standard files'
            },
            // disallow imports from node modules
            // seems only 1 regex pattern is allowed to match as not having this allows node module imports even while having the general rule above for all files)
            {
              regex: '^[^.]',
              message: 'Only core/imports files should import from node modules'
            }
          ]
        }
      ]
    }
  },
  {
    // restrict imports to core/public files to other core/public, or imports allowed by core/utils
    files: ['lib/core/public/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // e.g. "../commons/aria/" or "../checks/"
              regex:
                '.*\\.\\.\\/(commons|checks|rules)(\\/|$)|.*\\.\\.\\/reporters\\/.*?\\.js',
              message:
                'Public files should only import from other public, util, core, or standard files'
            },
            // disallow imports from node modules
            {
              regex: '^[^.]',
              message: 'Only core/imports files should import from node modules'
            }
          ]
        }
      ]
    }
  },
  {
    // disallow imports in core/imports files to any non-node module
    files: ['lib/core/imports/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // relative file paths
              regex: '\\\.\\\.\\/',
              message: 'Import files should only import from node modules'
            }
          ]
        }
      ]
    }
  },
  {
    // disallow imports in core/reporters files to any non-util file
    files: ['lib/core/reporters/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // e.g. "../commons/aria/" or "../checks/"
              regex: '.*\\.\\.\\/(commons|base|public|checks|rules)(\\/|$)',
              message: 'Reporter files should only import util functions'
            },
            // disallow imports from node modules
            {
              regex: '^[^.]',
              message: 'Only core/imports files should import from node modules'
            }
          ]
        }
      ]
    }
  },
  {
    // disallow imports in commons files to any check or rule
    files: ['lib/commons/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // e.g. ../checks/"
              regex: '.*\\.\\.\\/(checks|rules)(\\/|$)',
              message: 'Commons files cannot import from checks and rules'
            },
            // disallow imports from node modules
            {
              regex: '^[^.]',
              message: 'Only core/imports files should import from node modules'
            }
          ]
        }
      ]
    }
  },
  {
    // Utils should be functions that can be used without setting up the virtual tree, as opposed to commons which require the virtual tree
    files: ['lib/core/utils/**/*.js'],
    ignores: [
      // these are files with known uses of virtual node that are legacy before this rule was enforced
      'lib/core/utils/closest.js',
      'lib/core/utils/contains.js',
      'lib/core/utils/query-selector-all-filter.js',
      'lib/core/utils/selector-cache.js',
      // this will create a virtual node if one doesn't exist already in order to truncate the html output properly
      'lib/core/utils/dq-element.js',
      // this sets up the virtual tree so is allowed vNode
      'lib/core/utils/get-flattened-tree.js'
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[object.name=vNode]',
          message:
            "Utils is meant for utility functions that work independently of axe's state; utilities that require the virtual tree to be set up should go in commons, not utils."
        },
        {
          selector: 'MemberExpression[object.name=virtualNode]',
          message:
            "Utils is meant for utility functions that work independently of axe's state; utilities that require the virtual tree to be set up should go in commons, not utils."
        }
      ]
    }
  },
  {
    files: ['doc/examples/chrome-debugging-protocol/axe-cdp.js'],
    languageOptions: {
      globals: {
        window: true
      }
    }
  },
  {
    // after functions and reporters will not be run inside the same context as axe.run so should not access browser globals that require context specific information (window.location, window.getComputedStyles, etc.)
    files: ['lib/**/*-after.js', 'lib/core/reporters/**/*.js'],
    languageOptions: {
      sourceType: 'module'
    }
  },
  {
    // polyfills are mostly copy-pasted from sources so we don't control their styling
    files: [
      'lib/core/imports/polyfills.js',
      'lib/core/utils/pollyfill-elements-from-point.js'
    ],
    rules: {
      'func-names': 0,
      'no-bitwise': 0,
      curly: 0,
      eqeqeq: 0
    }
  },
  {
    files: ['test/act-rules/**/*.js', 'test/aria-practices/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    },
    rules: {
      'new-cap': 0,
      'no-use-before-define': 0
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.browser,
        ...globals.es2015,
        ...globals.node,
        assert: true,
        helpers: true,
        checks: true,
        sinon: true
      }
    },
    rules: {
      'new-cap': 0,
      'no-use-before-define': 0
    }
  },
  {
    ignores: [
      '**/node_modules/*',
      '**/tmp/*',
      'patches/*',
      'build/tasks/aria-supported.js',
      'doc/api/*',
      'doc/examples/jest_react/*.js',
      'lib/core/imports/polyfills.js',
      'lib/core/utils/uuid.js',
      'axe.js',
      'axe.min.js'
    ]
  }
];
