describe('landmark-is-top-level', () => {
  const shadowSupported = axe.testUtils.shadowSupport.v1;
  const checkSetup = axe.testUtils.checkSetup;
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  const check = checks['landmark-is-top-level'];
  const checkContext = new axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false if the main landmark is in another landmark', () => {
    const params = checkSetup(
      '<div role="banner"><main id="target"></main></div>'
    );
    // landmark-is-top-level requires a complete tree to work properly
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'main' });
  });

  it('should return false if the complementary landmark is in another landmark', () => {
    const params = checkSetup(
      '<nav><div role="complementary" id="target"></div></nav>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'complementary' });
  });

  it('should return true if the complementary landmark is in main landmark', () => {
    const params = checkSetup(
      '<main><div role="complementary" id="target"></div></main>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'complementary' });
  });

  it('should return false if div with role set to main is in another landmark', () => {
    const params = checkSetup(
      '<div role="navigation"><div role="main" id="target"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'main' });
  });

  it('should return true if the landmark is not in another landmark', () => {
    const params = checkSetup(
      '<div><footer id="target"></footer><div role="banner"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'contentinfo' });
  });

  it('should return true if div with role set to main is not in another landmark', () => {
    const params = checkSetup(
      '<div><div role="main" id="target"></div><div role="navigation"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'main' });
  });

  it('should return true if the banner landmark is not in form landmark', () => {
    const params = checkSetup(
      '<div><div role="banner" id="target"></div><div role="form"></div></div>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { role: 'banner' });
  });

  (shadowSupported ? it : xit)(
    'should test if the landmark in shadow DOM is top level',
    () => {
      const params = shadowCheckSetup(
        '<div></div>',
        '<main id="target">Main content</main>'
      );
      axe.utils.getFlattenedTree(document.documentElement);
      assert.isTrue(check.evaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, { role: 'main' });
    }
  );
});
