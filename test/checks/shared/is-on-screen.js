describe('is-on-screen', function () {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;

  it('should return true for visible elements', function () {
    var vNode = queryFixture('<div id="target">elm</div>');

    assert.isTrue(axe.testUtils.getCheckEvaluate('is-on-screen')(vNode));
  });

  it('should return true for aria-hidden=true elements', function () {
    var vNode = queryFixture('<div id="target" aria-hidden="true">elm</div>');

    assert.isTrue(axe.testUtils.getCheckEvaluate('is-on-screen')(vNode));
  });

  it('should return false for display:none elements', function () {
    var vNode = queryFixture('<div id="target" style="display:none">elm</div>');

    assert.isFalse(axe.testUtils.getCheckEvaluate('is-on-screen')(vNode));
  });

  it('should return false for off screen elements', function () {
    var vNode = queryFixture(
      '<div id="target" style="position:absolute; top:-10000px">elm</div>'
    );

    assert.isFalse(axe.testUtils.getCheckEvaluate('is-on-screen')(vNode));
  });
});
