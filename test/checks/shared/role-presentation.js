describe('role-presentation', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('role-presentation');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should detect role="presentation" on the element', function () {
    let vNode = queryFixture('<div id="target" role="presentation"></div>');

    assert.isTrue(checkEvaluate(null, null, vNode));
  });

  it('should return false when role !== presentation', function () {
    let vNode = queryFixture('<div id="target" role="cats"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });

  it('should return false when there is no role attribute', function () {
    let vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });
});
