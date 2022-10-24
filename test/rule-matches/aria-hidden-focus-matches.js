describe('aria-hidden-focus-matches', function () {
  'use strict';

  var rule;
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-hidden-focus');
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('return true when there is no parent with aria-hidden', function () {
    var vNode = queryFixture('<div id="target">' + '</div>');
    var actual = rule.matches(vNode.actualNode);
    assert.isTrue(actual);
  });

  it('return false when has a parent element with aria-hidden', function () {
    var vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<div id="target" aria-hidden="true">' +
        '</div>' +
        '</div>'
    );
    var actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('return false when has any parent element with aria-hidden', function () {
    var vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<div>' +
        '<div id="target" aria-hidden="true">' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    var actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('return false when has any parent element with aria-hidden', function () {
    var vNode = queryFixture(
      '<div aria-hidden="true">' +
        '<div aria-hidden="true">' +
        '<button id="target">btn</button>' +
        '</div>' +
        '</div>'
    );
    var actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });
});
