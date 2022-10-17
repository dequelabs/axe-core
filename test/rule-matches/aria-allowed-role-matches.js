describe('aria-allowed-role-matches', function () {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-allowed-role');
  });

  it('return false (no matches) for a <link> with a href to have any invalid role', function () {
    var vNode = queryFixture(
      '<link id="target" href="/example.com" role="invalid-role"></link>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('return true for input with redundant role', function () {
    var vNode = queryFixture('<input id="target" type="text" role="textbox"/>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('return true for element with valid role', function () {
    var vNode = queryFixture('<ol id="target" role="listbox"/>');
    assert.isTrue(rule.matches(null, vNode));
  });
});
