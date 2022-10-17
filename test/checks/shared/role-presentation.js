describe('role-presentation', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('role-presentation');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should detect role="presentation" on the element', function () {
    var vNode = queryFixture('<div id="target" role="presentation"></div>');

    assert.isTrue(checkEvaluate(null, null, vNode));
  });

  it('should return false when role !== presentation', function () {
    var vNode = queryFixture('<div id="target" role="cats"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });

  it('should return false when there is no role attribute', function () {
    var vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });
});
