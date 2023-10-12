import axe from '../../axe';

// Configure
const spec: axe.Spec = {
  branding: {
    brand: 'foo',
    application: 'bar'
  },
  reporter: 'v1',
  checks: [
    {
      id: 'custom-check',
      evaluate: function (node) {
        this.relatedNodes([node]);
        this.data('some data');
        return true;
      },
      after: function (results) {
        const id = results[0].id;
        return results;
      },
      metadata: {
        impact: 'minor',
        messages: {
          pass: 'yes',
          fail: 'nope',
          incomplete: {
            maybe: 'maybe',
            or: 'maybe not'
          }
        }
      }
    },
    {
      id: 'async-check',
      evaluate: function (node) {
        const done = this.async();
        done(true);
      }
    }
  ],
  standards: {
    ...axe.utils.getStandards(),
    ariaRoles: {
      'custom-role': {
        type: 'widget'
      },
      'custom-full-role': {
        type: 'widget',
        requiredContext: ['button'],
        requiredOwned: ['label'],
        requiredAttrs: ['aria-label'],
        allowedAttrs: ['aria-labelledby'],
        nameFromContent: true,
        unsupported: false,
        superclassRole: ['button'],
        accessibleNameRequired: true,
        childrenPresentational: true,
        prohibitedAttrs: ['aria-has-popup'],
        deprecated: false
      }
    },
    ariaAttrs: {
      'custom-attr': {
        type: 'boolean'
      },
      'custom-full-attr': {
        type: 'mntokens',
        values: ['foo', 'bar'],
        allowEmpty: false,
        global: false,
        unsupported: false,
        minValue: 7
      }
    },
    htmlElms: {
      'custom-elm': {
        allowedRoles: ['button']
      },
      'custom-full-elm': {
        allowedRoles: false,
        noAriaAttrs: false,
        shadowRoot: false,
        implicitAttrs: {
          'aria-min-value': '7'
        },
        namingMethods: ['subtreeText'],
        chromiumRole: 'CustomElm',
        variant: {
          href: {
            matches: '[href]',
            contentTypes: ['interactive', 'phrasing', 'flow']
          },
          defualt: {
            contentTypes: ['flow'],
            allowedRoles: false,
            noAriaAttrs: false,
            shadowRoot: false,
            implicitAttrs: {
              'aria-min-value': '7'
            },
            namingMethods: ['subtreeText'],
            chromiumRole: 'CustomElm'
          }
        }
      }
    },
    cssColors: {
      customColor: [0, 1, 2, 3]
    }
  },
  rules: [
    {
      id: 'custom-rule',
      any: ['custom-check'],
      matches: function (node) {
        return node.tagName === 'BODY';
      },
      tags: ['a'],
      actIds: ['b'],
      metadata: {
        description: 'custom rule',
        help: 'different help',
        helpUrl: 'https://example.com'
      }
    },
    {
      id: 'custom-cat-rule',
      selector: 'cat',
      impact: 'serious',
      excludeHidden: false,
      enabled: true,
      pageLevel: true,
      preload: false,
      reviewOnFail: false,
      matches: 'cat-matches'
    },
    {
      id: 'bad-impact',
      // @ts-expect-error
      impact: 'bad'
    }
  ]
};

axe.configure(spec);
axe.configure({
  locale: {
    checks: {
      foo: {
        fail: 'failure',
        pass: 'success',
        incomplete: {
          foo: 'nar'
        }
      }
    }
  }
});
axe.configure({
  locale: {
    lang: 'foo',
    rules: {
      foo: {
        description: 'desc',
        help: 'help'
      }
    },
    checks: {
      foo: {
        pass: 'pass',
        fail: 'fail',
        incomplete: {
          foo: 'bar'
        }
      },
      bar: {
        pass: 'pass',
        fail: 'fail'
      }
    }
  }
});

// Reporters
let fooReporter = (
  results: axe.RawResult[],
  options: axe.RunOptions,
  resolve: (out: 'foo') => void,
  reject: (err: Error) => void
) => {
  reject && resolve('foo');
};

axe.addReporter<'foo'>('foo', fooReporter, true);
axe.configure({ reporter: fooReporter });

// Setup & teardown
axe.setup();
axe.setup(document);
axe.setup(document.createElement('div'));
axe.teardown();

// Plugins
var pluginSrc: axe.AxePlugin = {
  id: 'doStuff',
  run: (data: any, callback: Function) => {
    callback();
  },
  commands: [
    {
      id: 'run-doStuff',
      callback: (data: any, callback: Function) => {
        axe.plugins['doStuff'].run(data, callback);
      }
    }
  ]
};
axe.registerPlugin(pluginSrc);
axe.cleanup();

axe.reset();

axe.getRules(['wcag2aa']);
typeof axe.getRules() === 'object';

const rules = axe.getRules();
rules.forEach(rule => {
  rule.ruleId.substr(1234);
});

const source = axe.source;
const version = axe.version;
const { NA, PASS, CANTTELL, FAIL } = axe.constants;
