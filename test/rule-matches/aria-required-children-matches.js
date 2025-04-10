describe('aria-required-children-matches', function () {
  'use strict';

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-required-children');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true for a role that requires children', function () {
    const vNode = queryFixture('<div id="target" role="list"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return false for a role that does not require children', function () {
    const vNode = queryFixture('<div id="target" role="alert"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
});
