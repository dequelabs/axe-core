describe('aria-has-attr-matches', function () {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-valid-attr-value');
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('should return false if an element has no attributes', function () {
    var vNode = fixtureSetup('<div></div>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return false if an element has no ARIA attributes', function () {
    var vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
  it('should return true if an element has ARIA attributes', function () {
    var vNode = queryFixture('<div id="target" aria-bats="monkeys"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });
});
