describe('role-none', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('role-none');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should detect role="none" on the element', function () {
    let vNode = queryFixture('<div id="target" role="none"></div>');

    assert.isTrue(checkEvaluate(null, null, vNode));
  });

  it('should return false when role !== none', function () {
    let vNode = queryFixture('<div id="target" role="cats"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });

  it('should return false when there is no role attribute', function () {
    let vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });
});
