describe('has-implicit-chromium-role-matches', function () {
  'use strict';

  var rule;
  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    rule = axe.utils.getRule('presentation-role-conflict');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('matches elements with an implicit role', function () {
    var vNode = queryFixture('<main id="target"></main>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('does not match elements with no implicit role', function () {
    var vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('matches elements with an implicit role in chromium', function () {
    var vNode = queryFixture('<svg id="target"></svg>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('does not match elements with no implicit role even if they are focusable and have an explicit role', function () {
    var vNode = queryFixture(
      '<div id="target" role="none" tabindex="1"></div>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });
});
