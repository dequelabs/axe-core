describe('is-initiator-matches', function () {
  'use strict';

  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('html-has-lang');
  });

  afterEach(function () {
    var fixture = document.getElementById('fixture');
    fixture.innerHTML = '';
  });

  it('should return true if the context is the initiator', function () {
    assert.isTrue(rule.matches(null, null, { initiator: true }));
  });

  it('should return false if the context is not the initiator', function () {
    assert.isFalse(rule.matches(null, null, { initiator: false }));
  });
});
