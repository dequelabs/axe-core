describe('aria-hidden-focus-matches', function () {
  'use strict';

  let rule;
  let queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-hidden-focus');
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('return true when there is no parent with aria-hidden', function () {
    let vNode = queryFixture('<div id="target">' + '</div>');
    let actual = rule.matches(vNode.actualNode);
    assert.isTrue(actual);
  });

  it('return false when has a parent element with aria-hidden', function () {
    let vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<div id="target" aria-hidden="true">' +
        '</div>' +
        '</div>'
    );
    let actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('return false when has any parent element with aria-hidden', function () {
    let vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<div>' +
        '<div id="target" aria-hidden="true">' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    let actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('return false when has any parent element with aria-hidden', function () {
    let vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<div aria-hidden="true">' +
        '<button id="target">btn</button>' +
        '</div>' +
        '</div>'
    );
    let actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });
});
