describe('skip-link-matches', function () {
  'use strict';

  var rule, link;
  var fixture = document.getElementById('fixture');

  beforeEach(function () {
    rule = axe.utils.getRule('skip-link');
    fixture.innerHTML =
      '<a href="" id="target" style="position: absolute; left: -10000px;">Click me</a><div id="main"></div>';
    link = fixture.querySelector('#target');
    axe._tree = axe.utils.getFlattenedTree(fixture);
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('returns false if the links is onscreen', function () {
    link.removeAttribute('style');
    link.href = '#main';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute does not start with #', function () {
    link.href = 'foo#bar';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute is `#`', function () {
    link.href = '#';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute starts with #!', function () {
    link.href = '#!foo';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute starts with #/', function () {
    link.href = '#/foo';
    assert.isFalse(rule.matches(link));
  });

  it('returns true if the href attribute starts with #', function () {
    link.href = '#main';
    assert.isTrue(rule.matches(link));
  });

  it('returns true if the href attribute starts with /# (angular)', function () {
    link.href = '/#main';
    assert.isTrue(rule.matches(link));
  });
});
