describe('no-explicit-name-matches', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('button-name');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true when element does not have `role` attribute', function () {
    let vNode = queryFixture('<button id="target"></button>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role of presentation', function () {
    let vNode = queryFixture(
      '<button id="target" role="presentation"></button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role of none', function () {
    let vNode = queryFixture('<button id="target" role="none"></button>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an invalid explicit role', function () {
    let vNode = queryFixture('<button id="target" role="foo"></button>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role that requires an accessible name', function () {
    let vNode = queryFixture('<button id="target" role="button"></button>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  describe('with a role that does not require an accessible name', function () {
    it('returns true when element is focusable', function () {
      let vNode = queryFixture(
        '<button id="target" role="separator"></button>'
      );
      let actual = rule.matches(vNode.actualNode, vNode);
      assert.isTrue(actual);
    });

    it('returns false when element is not focusable', function () {
      let vNode = queryFixture(
        '<button id="target" role="separator" disabled></button>'
      );
      let actual = rule.matches(vNode.actualNode, vNode);
      assert.isFalse(actual);
    });
  });
});
