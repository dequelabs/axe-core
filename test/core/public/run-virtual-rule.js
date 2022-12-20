describe('axe.runVirtualRule', function () {
  beforeEach(function () {
    axe._load({
      rules: [
        {
          id: 'test',
          selector: '*',
          none: ['fred']
        }
      ],
      checks: [
        {
          id: 'fred',
          evaluate: function () {
            return true;
          }
        }
      ]
    });
  });

  afterEach(function () {
    axe._audit = null;
  });

  it('should throw if the rule does not exist', function () {
    axe._audit.rules = [];
    function fn() {
      axe.runVirtualRule('aria-roles', { nodeName: 'div' });
    }

    assert.throws(fn);
  });

  it('should modify the rule to not excludeHidden', function () {
    axe._audit.rules = [
      {
        id: 'aria-roles',
        excludeHidden: true,
        runSync: function () {
          assert.isFalse(this.excludeHidden);

          return {
            id: 'aria-roles',
            nodes: []
          };
        }
      }
    ];

    axe.runVirtualRule('aria-roles', { nodeName: 'div' });
  });

  it('should not modify the original rule', function () {
    axe._audit.rules = [
      {
        id: 'aria-roles',
        excludeHidden: true,
        runSync: function () {
          assert.notEqual(this, axe._audit.rules[0]);

          return {
            id: 'aria-roles',
            nodes: []
          };
        }
      }
    ];

    axe.runVirtualRule('aria-roles', { nodeName: 'div' });
  });

  it('should call rule.runSync', function () {
    var called = false;
    axe._audit.rules = [
      {
        id: 'aria-roles',
        runSync: function () {
          called = true;
          return {
            id: 'aria-roles',
            nodes: []
          };
        }
      }
    ];

    axe.runVirtualRule('aria-roles', { nodeName: 'div' });
    assert.isTrue(called);
  });

  describe('context', () => {
    const { Context } = axe._thisWillBeDeletedDoNotUse.base;
    it('passes context with vNode included to rule.runSync', function () {
      var node = new axe.SerialVirtualNode({ nodeName: 'div' });
      axe._audit.rules = [
        {
          id: 'aria-roles',
          runSync: function (context) {
            assert.equal(typeof context, 'object');
            assert.isTrue(Array.isArray(context.include));
            assert.equal(context.include[0], node);

            return {
              id: 'aria-roles',
              nodes: []
            };
          }
        }
      ];

      axe.runVirtualRule('aria-roles', node);
    });

    it('has all properties a normal context has', () => {
      const contextProps = Object.entries(new Context())
        .filter(arg => typeof arg[1] !== 'function')
        .map(([key]) => key)
        .sort();

      var node = new axe.SerialVirtualNode({ nodeName: 'div' });
      axe._audit.rules = [
        {
          id: 'aria-roles',
          runSync: function (context) {
            const virtualContextProps = Object.keys(context).sort();
            assert.deepEqual(virtualContextProps, contextProps);
            return {
              id: 'aria-roles',
              nodes: []
            };
          }
        }
      ];
      axe.runVirtualRule('aria-roles', node);
    });
  });

  it('should pass through options to rule.runSync', function () {
    axe._audit.rules = [
      {
        id: 'aria-roles',
        runSync: function (context, options) {
          assert.equal(options.foo, 'bar');

          return {
            id: 'aria-roles',
            nodes: []
          };
        }
      }
    ];

    axe.runVirtualRule('aria-roles', { nodeName: 'div' }, { foo: 'bar' });
  });

  it('should convert a serialised node into a VirtualNode', function () {
    var serialNode = {
      nodeName: 'div',
      foo: 'bar',
      attributes: {
        bar: 'baz'
      }
    };
    axe._audit.rules = [
      {
        id: 'aria-roles',
        runSync: function (context) {
          var node = context.include[0];
          assert.instanceOf(node, axe.AbstractVirtualNode);
          assert.equal(node.props.foo, 'bar');
          assert.equal(node.attr('bar'), 'baz');

          return {
            id: 'aria-roles',
            nodes: []
          };
        }
      }
    ];

    axe.runVirtualRule('aria-roles', serialNode);
  });

  it('should return correct structure', function () {
    var results = axe.runVirtualRule('test', { nodeName: 'div' });
    assert.isDefined(results.violations);
    assert.isDefined(results.passes);
    assert.isDefined(results.incomplete);
    assert.isDefined(results.inapplicable);
    assert.isDefined(results.testEngine);
    assert.isDefined(results.toolOptions);
  });
});
