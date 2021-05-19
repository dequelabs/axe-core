describe('presentation-role-conflict-matches', function() {
  'use strict';

  var rule;
  var fixture = document.getElementById('fixture');
  var flatTreeSetup = axe.testUtils.flatTreeSetup;

  beforeEach(function() {
    rule = axe.utils.getRule('presentation-role-conflict');
  });

  afterEach(function() {
    fixture.innerHTML = '';
  });

  it('is a function', function() {
    assert.isFunction(rule.matches);
  });

  it('matches elements with an implicit role', function() {
    fixture.innerHTML = '<main id="target"></main>';
    flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');

    assert.isTrue(rule.matches(target));
  });

  it('does not match elements with no implicit role', function() {
    fixture.innerHTML = '<div id="target"></div>';
    flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');

    assert.isFalse(rule.matches(target));
  });

  it('does not match elements with no implicit role even if they are focusable and have an explicit role', function() {
    fixture.innerHTML = '<div id="target" role="none" tabindex="1"></div>';
    flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');

    assert.isFalse(rule.matches(target));
  });
});
