describe('aria-required-parent-matches', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-required-parent');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true for a role that requires parent', function () {
    let vNode = queryFixture('<div id="target" role="listitem"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return false for a role that does not require parent', function () {
    let vNode = queryFixture('<div id="target" role="alert"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
});
