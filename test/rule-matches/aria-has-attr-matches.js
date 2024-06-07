describe('aria-has-attr-matches', function () {
  'use strict';

  let queryFixture = axe.testUtils.queryFixture;
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-valid-attr-value');
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('should return false if an element has no attributes', function () {
    let vNode = fixtureSetup('<div></div>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return false if an element has no ARIA attributes', function () {
    let vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
  it('should return true if an element has ARIA attributes', function () {
    let vNode = queryFixture('<div id="target" aria-bats="monkeys"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });
});
