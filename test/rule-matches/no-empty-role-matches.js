describe('no-role-empty-matches', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('aria-roles');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns false when element does not have `role` attribute', function () {
    let vNode = queryFixture('<div id="target">Some Content</div>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has role attribute has no value', function () {
    let vNode = queryFixture('<div role id="target">Some Content</div>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has empty role attribute', function () {
    let vNode = queryFixture('<div role="" id="target">Some Content</div>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has role attribute consisting of only whitespace', function () {
    let vNode = queryFixture('<div role=" " id="target">Some Content</div>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when element has role attribute', function () {
    let vNode = queryFixture(
      '<div role="button" id="target">Some Content</div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has multiple roles', function () {
    let vNode = queryFixture(
      '<div role="button link" id="target">Some Content</div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has invalid role', function () {
    let vNode = queryFixture('<div role="xyz" id="target">Some Content</div>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
