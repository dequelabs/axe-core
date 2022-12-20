describe('aria-allowed-attr-matches', function () {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-allowed-attr');
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('should return true on elements that have aria attributes', function () {
    var vNode = queryFixture(
      '<div role="button" id="target" aria-label="Thing 1" aria-mccheddarton="Unsupported thing 2"></div>'
    );

    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return false on elements that have no aria attributes', function () {
    var vNode = queryFixture('<div role="button" id="target"></div>');

    assert.isFalse(rule.matches(null, vNode));
  });
});
