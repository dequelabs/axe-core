describe('has-implicit-chromium-role-matches', function () {
  'use strict';

  let rule;
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    rule = axe.utils.getRule('presentation-role-conflict');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('matches elements with an implicit role', function () {
    const vNode = queryFixture('<main id="target"></main>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('does not match elements with no implicit role', function () {
    const vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('matches elements with an implicit role in chromium', function () {
    const vNode = queryFixture('<svg id="target"></svg>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('does not match elements with no implicit role even if they are focusable and have an explicit role', function () {
    const vNode = queryFixture(
      '<div id="target" role="none" tabindex="1"></div>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });
});
