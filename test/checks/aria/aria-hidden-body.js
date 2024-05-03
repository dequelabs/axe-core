describe('aria-hidden', function () {
  'use strict';

  let checkContext = axe.testUtils.MockCheckContext();
  let body = document.body;
  afterEach(function () {
    checkContext.reset();
    body.removeAttribute('aria-hidden');
  });

  it('should not be present on document.body', function () {
    let tree = axe.testUtils.flatTreeSetup(body);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('fails appropriately if aria-hidden=true on document.body', function () {
    body.setAttribute('aria-hidden', true);
    let tree = axe.testUtils.flatTreeSetup(body);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('passes if aria-hidden=false on document.body', function () {
    body.setAttribute('aria-hidden', 'false');
    let tree = axe.testUtils.flatTreeSetup(body);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-hidden-body')
        .call(checkContext, null, {}, tree[0])
    );
  });
});
