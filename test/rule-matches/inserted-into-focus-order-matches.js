describe('inserted-into-focus-order-matches', function () {
  'use strict';

  const fixture = document.getElementById('fixture');
  const flatTreeSetup = axe.testUtils.flatTreeSetup;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('focus-order-semantics');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true for a non-focusable element with tabindex > -1', function () {
    fixture.innerHTML = '<div tabindex="0"></div>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isTrue(rule.matches(node));
  });

  it('should return false for a non-focusable element with tabindex == -1', function () {
    fixture.innerHTML = '<div tabindex="-1"></div>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false for a native focusable element with tabindex > 0', function () {
    fixture.innerHTML = '<button tabindex="0"></button>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false for a native focusable element with no tabindex', function () {
    fixture.innerHTML = '<a href="#"></a>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false for non-numeric tabindex value', function () {
    fixture.innerHTML = '<div tabindex="abc"></div>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });
});
