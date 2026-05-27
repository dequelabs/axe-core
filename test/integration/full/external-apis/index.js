describe('external-apis', () => {
  const ruleName = 'aria-required-parent';

  beforeEach(done => {
    axe.testUtils.awaitNestedLoad(done);
  });

  afterEach(() => {
    axe._enableElementInternals = true;
  });

  it('correctly sets elementInternals data on nodes for rules', async () => {
    const options = { runOnly: ruleName };
    const context = { exclude: [] };

    axe.externalAPIs({
      getElementInternals() {
        return Promise.resolve([
          {
            ancestry: 'html > body > external-api-element',
            internals: {
              role: 'list'
            }
          }
        ]);
      }
    });

    const results = await axe.run(context, options);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.inapplicable, 0);
  });

  it('requires the feature flag in order to work', async () => {
    const options = { runOnly: ruleName };
    const context = { exclude: [] };

    axe._enableElementInternals = false;
    axe.externalAPIs({
      getElementInternals() {
        return Promise.resolve([
          {
            ancestry: 'html > body > external-api-element',
            internals: {
              role: 'list'
            }
          }
        ]);
      }
    });

    const results = await axe.run(context, options);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.inapplicable, 0);
  });

  it('causes rule to return incomplete if idref node is not found', async () => {
    axe.configure({
      rules: [
        {
          id: 'my-rule',
          selector: 'external-api-element',
          any: ['my-check']
        }
      ],
      checks: [
        {
          id: 'my-check',
          evaluate(node, options, vNode) {
            return vNode.elementInternals.ariaActiveDescendantElement;
          }
        }
      ]
    });

    const options = { runOnly: 'my-rule' };
    const context = { exclude: [] };

    axe.externalAPIs({
      getElementInternals() {
        return Promise.resolve([
          {
            ancestry: 'html > body > external-api-element',
            internals: {
              ariaActiveDescendantElement: {
                type: 'HTMLElement',
                value: 'button'
              }
            }
          }
        ]);
      }
    });

    const results = await axe.run(context, options);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
    assert.lengthOf(results.inapplicable, 0);

    assert.include(
      results.incomplete[0].error.message,
      'Unable to locate node using selector'
    );
  });

  it('causes rule to return incomplete if idrefs node(s) are not found', async () => {
    axe.configure({
      rules: [
        {
          id: 'my-rule',
          selector: 'external-api-element',
          any: ['my-check']
        }
      ],
      checks: [
        {
          id: 'my-check',
          evaluate(node, options, vNode) {
            return vNode.elementInternals.ariaLabelledByElements;
          }
        }
      ]
    });

    const options = { runOnly: 'my-rule' };
    const context = { exclude: [] };

    axe.externalAPIs({
      getElementInternals() {
        return Promise.resolve([
          {
            ancestry: 'html > body > external-api-element',
            internals: {
              ariaLabelledByElements: {
                type: 'NodeList',
                value: ['button']
              }
            }
          }
        ]);
      }
    });

    const results = await axe.run(context, options);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
    assert.lengthOf(results.inapplicable, 0);

    assert.include(
      results.incomplete[0].error.message,
      'Unable to locate nodes using selectors'
    );
  });
});
