describe('axe.reporter', () => {
  const orig = {};
  before(() => {
    orig.reporters = window.reporters;
  });

  after(() => {
    Object.keys(orig).forEach(k => {
      window[k] = orig[k];
    });
  });

  it('should add reporter with given name', () => {
    axe.addReporter('bob', 'joe');
    assert.equal(axe.getReporter('bob'), 'joe');
  });

  it('returns false when reporter does not exist', () => {
    assert.isFalse(axe.hasReporter('fancy-bob'));
  });

  it('returns true when reporter exists', () => {
    axe.addReporter('sponge');
    assert.isTrue(axe.hasReporter('sponge'));
  });

  it('falls back to the v1 reporter for an unknown name', () => {
    assert.equal(axe.getReporter('fancy-bob'), axe.getReporter('v1'));
  });

  describe('isDefault', () => {
    const fixture = document.getElementById('fixture');
    const bobReporter = (results, options, resolve) => resolve('bob results');

    beforeEach(() => {
      // a fresh audit; the global beforeEach restores the original one
      axe._load({});
    });

    it('makes axe.run use the reporter when none is passed', async () => {
      axe.addReporter('bob-default', bobReporter, true);
      const results = await axe.run(fixture);
      assert.equal(results, 'bob results');
    });

    it('is undone by axe.reset()', async () => {
      axe.addReporter('bob-default', bobReporter, true);
      axe.reset();
      const results = await axe.run(fixture);
      assert.equal(results.toolOptions.reporter, 'v1');
    });
  });
});
