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
      elementInternals() {
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
      elementInternals() {
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
});
