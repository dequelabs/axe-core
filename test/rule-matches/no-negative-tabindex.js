describe('no-negative-tabindex-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule = axe.utils.getRule('frame-title');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true for nodes with no tabindex', function () {
    var vNode = queryFixture('<div id="target"></div>');
    var actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a zero tabindex', function () {
    var vNode = queryFixture('<div id="target" tabindex="0"></div>');
    var actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a positive tabindex', function () {
    var vNode = queryFixture('<div id="target" tabindex="4"></div>');
    var actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with an invalid tabindex', function () {
    var vNode = queryFixture('<div id="target" tabindex="foo"></div>');
    var actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns false for nodes with a negative tabindex', function () {
    var vNode = queryFixture('<div id="target" tabindex="-10"></div>');
    var actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });
});
