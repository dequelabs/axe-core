describe('heading-matches', function () {
  'use strict';
  let queryFixture = axe.testUtils.queryFixture;
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('empty-heading');
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('should return false on elements that are not headings', function () {
    let vNode = fixtureSetup('<div></div>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return true on elements with role="heading"', function () {
    let vNode = queryFixture('<div role="heading" id="target"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return true on regular headings without roles', function () {
    for (let i = 1; i <= 6; i++) {
      let vNode = queryFixture('<h' + i + ' id="target"></h' + i + '>');
      assert.isTrue(rule.matches(null, vNode));
    }
  });

  it('should return false on headings with their role changes', function () {
    let vNode = queryFixture('<h1 role="banner" id="target"></h1>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return true on headings with their role changes to an invalid role', function () {
    let vNode = queryFixture('<h1 role="bruce" id="target"></h1>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return true on headings with their role changes to an abstract role', function () {
    let vNode = queryFixture('<h1 role="widget" id="target"></h1>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return true on headings with explicit role="none" and an empty aria-label to account for presentation conflict resolution', function () {
    let vNode = queryFixture('<h1 aria-label="" role="none" id="target"></h1>');
    assert.isTrue(rule.matches(null, vNode));
  });
});
