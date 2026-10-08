describe('meta-viewport', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false on user-scalable=no', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=no">'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, 'user-scalable=no');
  });

  it('should return false on user-scalable=invalid', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=invalid, more-stuff=ok">'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false on user-scalable in the range <-1, 1>', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=0, more-stuff=ok">'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false on user-scalable in the range <-1, 1>', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=-0.5, more-stuff=ok">'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true on user-scalable=no if lowerBound is passed', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=no, more-stuff=ok">'
    );

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('meta-viewport').call(
        checkContext,
        null,
        {
          lowerBound: 2
        },
        vNode
      )
    );
  });

  it('should return true on user-scalable=device-width', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=device-width, more-stuff=ok">'
    );

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('meta-viewport')(null, null, vNode)
    );
  });

  it('should return true on user-scalable=device-height', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=device-width, more-stuff=ok">'
    );

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('meta-viewport')(null, null, vNode)
    );
  });

  it('should return false on maximum-scale=yes (translates to 1)', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="maximum-scale=yes">'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true on maximum-scale=device-width', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="maximum-scale=device-width">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true on maximum-scale=device-height', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="maximum-scale=device-height">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true on negative maximum scale (should be ignored)', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="maximum-scale=-1">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true if maximum-scale >= options.scaleMinimum', () => {
    let vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, maximum-scale=5, cats=dogs">'
    );

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('meta-viewport').call(
        checkContext,
        null,
        {
          scaleMinimum: 2
        },
        vNode
      )
    );

    vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, maximum-scale=3, cats=dogs">'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false on maximum-scale < options.scaleMinimum', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=yes, maximum-scale=1.5">'
    );

    assert.isFalse(
      axe.testUtils.getCheckEvaluate('meta-viewport').call(
        checkContext,
        null,
        {
          scaleMinimum: 2
        },
        vNode
      )
    );
    assert.deepEqual(checkContext._data, 'maximum-scale=1.5');
  });

  it('should return true if neither user-scalable or maximum-scale are set', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar, cats=dogs">'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('meta-viewport')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should not crash if viewport property does not have a value', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="user-scalable=1, minimal-ui">'
    );

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('meta-viewport')(null, null, vNode)
    );
  });

  it('should not crash if viewport property does not have a value', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="user-scalable=1, minimal-ui">'
    );

    assert.isTrue(
      checks['meta-viewport'].evaluate.call(checkContext, null, null, vNode)
    );
  });

  it('should handle ; separator', () => {
    const vNode = queryFixture(
      '<meta id="target" name="viewport" content="foo=bar; cats=dogs;  maximum-scale=1.5; user-scalable=yes">'
    );

    assert.isFalse(
      checks['meta-viewport'].evaluate.call(
        checkContext,
        null,
        {
          scaleMinimum: 2
        },
        vNode
      )
    );
  });
});
