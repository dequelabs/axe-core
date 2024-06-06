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
      'build/tasks/aria-supported.js',
      'doc/api/*',
      'doc/examples/jest_react/*.js',
      'lib/core/imports/*.js',
      'lib/core/utils/uuid.js',
      'axe.js',
      'axe.min.js'
    ]
  }
];
