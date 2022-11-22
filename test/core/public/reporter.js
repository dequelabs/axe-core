describe('axe.reporter', function () {
  'use strict';

  var orig = {};
  before(function () {
    orig.reporters = window.reporters;
  });

  after(function () {
    Object.keys(orig).forEach(function (k) {
      window[k] = orig[k];
    });
  });

  it('should add reporter with given name', function () {
    axe.addReporter('bob', 'joe');
    assert.equal(axe.getReporter('bob'), 'joe');
  });

  it('returns false when reporter does not exist', function () {
    assert.isFalse(axe.hasReporter('fancy-bob'));
  });

  it('returns true when reporter exists', function () {
    axe.addReporter('sponge');
    assert.isTrue(axe.hasReporter('sponge'));
  });
});
