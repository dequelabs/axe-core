describe('is-visible-on-screen-matches', () => {
  'use strict';

  const rule = axe.utils.getRule('avoid-inline-spacing');
  const queryFixture = axe.testUtils.queryFixture;

  it('returns true for visible elements', () => {
    const vNode = queryFixture('<p id="target">Hello world</p>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for elements with hidden', () => {
    const vNode = queryFixture('<p id="target" hidden>Hello world</p>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns true for visible elements with aria-hidden="true"', () => {
    const vNode = queryFixture(
      '<p id="target" aria-hidden="true">Hello world</p>'
    );
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for opacity:0 elements with accessible text', () => {
    const vNode = queryFixture(
      '<p id="target" style="opacity:0">Hello world</p>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });
});
