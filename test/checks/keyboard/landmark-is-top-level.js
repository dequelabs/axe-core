describe('landmark-is-top-level', function () {
  'use strict';

  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let checkSetup = axe.testUtils.checkSetup;
  let shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  let check = checks['landmark-is-top-level'];
  let checkContext = new axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('should return false if the main landmark is in another landmark', function () {
    let params = checkSetup(
      '<div role="banner"><main id="target"></main></div>'
    );
    // landmark-is-top-level requires a complete tree to work properly
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'main' });
  });

  it('should return false if the complementary landmark is in another landmark', function () {
    let params = checkSetup(
      '<nav><div role="complementary" id="target"></div></nav>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'complementary' });
  });

  it('should return true if the complementary landmark is in main landmark', function () {
    let params = checkSetup(
      '<main><div role="complementary" id="target"></div></main>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'complementary' });
  });

  it('should return false if div with role set to main is in another landmark', function () {
    let params = checkSetup(
      '<div role="navigation"><div role="main" id="target"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'main' });
  });

  it('should return true if the landmark is not in another landmark', function () {
    let params = checkSetup(
      '<div><footer id="target"></footer><div role="banner"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'contentinfo' });
  });

  it('should return true if div with role set to main is not in another landmark', function () {
    let params = checkSetup(
      '<div><div role="main" id="target"></div><div role="navigation"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'main' });
  });

  it('should return true if the banner landmark is not in form landmark', function () {
    let params = checkSetup(
      '<div><div role="banner" id="target"></div><div role="form"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'banner' });
  });

  (shadowSupported ? it : xit)(
    'should test if the landmark in shadow DOM is top level',
    function () {
      let params = shadowCheckSetup(
        '<div></div>',
        '<main id="target">Main content</main>'
      );
      axe.utils.getFlattenedTree(document.documentElement);
      assert.isTrue(check.evaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, { role: 'main' });
    }
  );
});
