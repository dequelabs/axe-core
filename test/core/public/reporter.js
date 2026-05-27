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
});
