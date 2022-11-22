describe('label-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule;

  beforeEach(function () {
    fixture.innerHTML = '';
    rule = axe.utils.getRule('label');
  });

  it('returns true for non-input elements', function () {
    var vNode = queryFixture('<textarea id="target"></textarea>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for input elements without type', function () {
    var vNode = queryFixture('<input id="target" />');

    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for input buttons', function () {
    ['button', 'submit', 'image', 'reset'].forEach(function (type) {
      var vNode = queryFixture('<input id="target" type="' + type + '" />');
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns false for input elements type=hidden', function () {
    var vNode = queryFixture('<input id="target" type="hidden" />');

    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns true for other input types', function () {
    ['text', 'password', 'url', 'range', 'date', 'checkbox', 'radio'].forEach(
      function (type) {
        var vNode = queryFixture('<input id="target" type="' + type + '" />');
        assert.isTrue(rule.matches(null, vNode));
      }
    );
  });
});
