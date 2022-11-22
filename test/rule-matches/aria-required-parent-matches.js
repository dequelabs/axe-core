describe('aria-required-parent-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-required-parent');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true for a role that requires parent', function () {
    var vNode = queryFixture('<div id="target" role="listitem"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return false for a role that does not require parent', function () {
    var vNode = queryFixture('<div id="target" role="alert"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
});
