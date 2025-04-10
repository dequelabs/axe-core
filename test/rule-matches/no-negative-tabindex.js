describe('no-negative-tabindex-matches', function () {
  'use strict';

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const rule = axe.utils.getRule('frame-title');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true for nodes with no tabindex', function () {
    const vNode = queryFixture('<div id="target"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a zero tabindex', function () {
    const vNode = queryFixture('<div id="target" tabindex="0"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a positive tabindex', function () {
    const vNode = queryFixture('<div id="target" tabindex="4"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with an invalid tabindex', function () {
    const vNode = queryFixture('<div id="target" tabindex="foo"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns false for nodes with a negative tabindex', function () {
    const vNode = queryFixture('<div id="target" tabindex="-10"></div>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });
});
