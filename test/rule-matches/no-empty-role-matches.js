describe('no-role-empty-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-roles');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns false when element does not have `role` attribute', function () {
    var vNode = queryFixture('<div id="target">Some Content</div>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has role attribute has no value', function () {
    var vNode = queryFixture('<div role id="target">Some Content</div>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has empty role attribute', function () {
    var vNode = queryFixture('<div role="" id="target">Some Content</div>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has role attribute consisting of only whitespace', function () {
    var vNode = queryFixture('<div role=" " id="target">Some Content</div>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when element has role attribute', function () {
    var vNode = queryFixture(
      '<div role="button" id="target">Some Content</div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has multiple roles', function () {
    var vNode = queryFixture(
      '<div role="button link" id="target">Some Content</div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has invalid role', function () {
    var vNode = queryFixture('<div role="xyz" id="target">Some Content</div>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
