describe('label-matches', function () {
  'use strict';

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    fixture.innerHTML = '';
    rule = axe.utils.getRule('label');
  });

  it('returns true for non-input elements', function () {
    const vNode = queryFixture('<textarea id="target"></textarea>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for input elements without type', function () {
    const vNode = queryFixture('<input id="target" />');

    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for input buttons', function () {
    ['button', 'submit', 'image', 'reset'].forEach(function (type) {
      const vNode = queryFixture('<input id="target" type="' + type + '" />');
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns false for input elements type=hidden', function () {
    const vNode = queryFixture('<input id="target" type="hidden" />');

    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns true for other input types', function () {
    ['text', 'password', 'url', 'range', 'date', 'checkbox', 'radio'].forEach(
      function (type) {
        const vNode = queryFixture('<input id="target" type="' + type + '" />');
        assert.isTrue(rule.matches(null, vNode));
      }
    );
  });
});
