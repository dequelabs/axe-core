describe('no-negative-tabindex-matches', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule = axe.utils.getRule('frame-title');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true for nodes with no tabindex', function () {
    let vNode = queryFixture('<div id="target"></div>');
    let actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a zero tabindex', function () {
    let vNode = queryFixture('<div id="target" tabindex="0"></div>');
    let actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a positive tabindex', function () {
    let vNode = queryFixture('<div id="target" tabindex="4"></div>');
    let actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with an invalid tabindex', function () {
    let vNode = queryFixture('<div id="target" tabindex="foo"></div>');
    let actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns false for nodes with a negative tabindex', function () {
    let vNode = queryFixture('<div id="target" tabindex="-10"></div>');
    let actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });
});
