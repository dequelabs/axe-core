describe('label-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var rule;

  beforeEach(function () {
    rule = axe._audit.rules.find(function (rule) {
      return rule.id === 'label';
    });
  });

  it('returns true for non-input elements', function () {
    fixture.innerHTML = '<textarea></textarea>';
    var target = fixture.querySelector('textarea');

    assert.isTrue(rule.matches(target));
  });

  it('returns true for input elements without type', function () {
    fixture.innerHTML = '<input />';
    var target = fixture.querySelector('input');

    assert.isTrue(rule.matches(target));
  });

  it('returns false for input buttons', function () {
    fixture.innerHTML = '<input type="button" />' +
      '<input type="submit" />' +
      '<input type="image" />' +
      '<input type="reset" />';

    var targets = Array.from(fixture.querySelectorAll('input'));
    targets.forEach(function (target) {
      assert.isFalse(rule.matches(target));
    });
  });

  it('returns false for input elements type=hidden', function () {
    fixture.innerHTML = '<input type="hidden" />';
    var target = fixture.querySelector('input');

    assert.isFalse(rule.matches(target));
  });

  it('returns true for other input types', function () {
    fixture.innerHTML = '<input type="text" />' +
      '<input type="password" />' +
      '<input type="url" />' +
      '<input type="range" />' +
      '<input type="date" />' +
      '<input type="checkbox" />' +
      '<input type="radio" />';

    var targets = Array.from(fixture.querySelectorAll('input'));
    targets.forEach(function (target) {
      assert.isTrue(rule.matches(target));
    });
  });
});