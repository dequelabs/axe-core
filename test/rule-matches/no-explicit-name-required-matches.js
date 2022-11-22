describe('no-explicit-name-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('button-name');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true when element does not have `role` attribute', function () {
    var vNode = queryFixture('<button id="target"></button>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role of presentation', function () {
    var vNode = queryFixture(
      '<button id="target" role="presentation"></button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role of none', function () {
    var vNode = queryFixture('<button id="target" role="none"></button>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an invalid explicit role', function () {
    var vNode = queryFixture('<button id="target" role="foo"></button>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role that requires an accessible name', function () {
    var vNode = queryFixture('<button id="target" role="button"></button>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  describe('with a role that does not require an accessible name', function () {
    it('returns true when element is focusable', function () {
      var vNode = queryFixture(
        '<button id="target" role="separator"></button>'
      );
      var actual = rule.matches(vNode.actualNode, vNode);
      assert.isTrue(actual);
    });

    it('returns false when element is not focusable', function () {
      var vNode = queryFixture(
        '<button id="target" role="separator" disabled></button>'
      );
      var actual = rule.matches(vNode.actualNode, vNode);
      assert.isFalse(actual);
    });
  });
});
