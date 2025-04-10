describe('aria-allowed-role-matches', function () {
  'use strict';

  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-allowed-role');
  });

  it('return false (no matches) for a <link> with a href to have any invalid role', function () {
    const vNode = queryFixture(
      '<link id="target" href="/example.com" role="invalid-role"></link>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('return true for input with redundant role', function () {
    const vNode = queryFixture(
      '<input id="target" type="text" role="textbox"/>'
    );
    assert.isTrue(rule.matches(null, vNode));
  });

  it('return true for element with valid role', function () {
    const vNode = queryFixture('<ol id="target" role="listbox"/>');
    assert.isTrue(rule.matches(null, vNode));
  });
});
