describe('role-none', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('role-none');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should detect role="none" on the element', function () {
    var vNode = queryFixture('<div id="target" role="none"></div>');

    assert.isTrue(checkEvaluate(null, null, vNode));
  });

  it('should return false when role !== none', function () {
    var vNode = queryFixture('<div id="target" role="cats"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });

  it('should return false when there is no role attribute', function () {
    var vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });
});
