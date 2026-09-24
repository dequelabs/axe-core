describe('meta-viewport', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  describe('; separator', () => {
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

    it('should return false on user-scalable=no', () => {
      const vNode = queryFixture(
        '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=no, more-stuff=ok">'
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

    it('should return true on user-scalable=yes', () => {
      const vNode = queryFixture(
        '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=yes, more-stuff=ok">'
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
      assert.deepEqual(checkContext._data, 'maximum-scale');
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
  });

  describe('invalid values and keywords', () => {
    /**
     * Run a meta-viewport check on a viewport meta element
     * @param {String} checkId
     * @param {String} content Value of the content attribute
     * @return {Boolean}
     */
    function evaluate(checkId, content) {
      const vNode = queryFixture(
        `<meta id="target" name="viewport" content="${content}">`
      );
      return axe.testUtils
        .getCheckEvaluate(checkId)
        .call(checkContext, null, null, vNode);
    }

    it('should return false on an invalid user-scalable value (translates to 0)', () => {
      assert.isFalse(evaluate('meta-viewport', 'user-scalable=invalid'));
      assert.deepEqual(checkContext._data, 'user-scalable');
    });

    it('should return true on user-scalable=device-width or device-height', () => {
      assert.isTrue(evaluate('meta-viewport', 'user-scalable=device-width'));
      assert.isTrue(evaluate('meta-viewport', 'user-scalable=device-height'));
    });

    it('should return false on an invalid maximum-scale value (translates to 0)', () => {
      assert.isFalse(evaluate('meta-viewport', 'maximum-scale=invalid'));
      assert.deepEqual(checkContext._data, 'maximum-scale');
    });

    it('should return false on maximum-scale=no', () => {
      assert.isFalse(evaluate('meta-viewport', 'maximum-scale=no'));
    });

    it('should return true on maximum-scale=device-width or device-height (translates to 10)', () => {
      assert.isTrue(evaluate('meta-viewport', 'maximum-scale=device-width'));
      assert.isTrue(evaluate('meta-viewport', 'maximum-scale=device-height'));
      assert.isTrue(
        evaluate('meta-viewport-large', 'maximum-scale=device-width')
      );
    });

    it('should leave an invalid maximum-scale to meta-viewport in meta-viewport-large', () => {
      assert.isTrue(evaluate('meta-viewport-large', 'maximum-scale=invalid'));
    });
  });

  describe(', separator', () => {
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

    it('should return false on user-scalable=no', () => {
      const vNode = queryFixture(
        '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=no, more-stuff=ok">'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('meta-viewport')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, 'user-scalable=no');
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

    it('should return true on user-scalable=yes', () => {
      const vNode = queryFixture(
        '<meta id="target" name="viewport" content="foo=bar, cats=dogs, user-scalable=yes, more-stuff=ok">'
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
        axe.testUtils
          .getCheckEvaluate('meta-viewport')
          .call(checkContext, null, null, vNode)
      );

      vNode = queryFixture(
        '<meta id="target" name="viewport" content="foo=bar, maximum-scale=2, cats=dogs">'
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
  });
});
