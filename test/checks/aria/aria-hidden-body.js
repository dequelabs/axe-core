describe('aria-hidden', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var body = document.body;
  afterEach(function () {
    checkContext.reset();
    body.removeAttribute('aria-hidden');
  });

  it('should not be present on document.body', function () {
    var tree = axe.testUtils.flatTreeSetup(body);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('fails appropriately if aria-hidden=true on document.body', function () {
    body.setAttribute('aria-hidden', true);
    var tree = axe.testUtils.flatTreeSetup(body);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('passes if aria-hidden=false on document.body', function () {
    body.setAttribute('aria-hidden', 'false');
    var tree = axe.testUtils.flatTreeSetup(body);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });
});
