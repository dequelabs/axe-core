describe('inline-style-property tests', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  describe('important-letter-spacing check', () => {
    const checkEvaluate = axe.testUtils.getCheckEvaluate(
      'important-letter-spacing'
    );
    const checkContext = axe.testUtils.MockCheckContext();
    afterEach(() => {
      checkContext.reset();
    });

    it('is true when the property is not set in the style attribute', () => {
      const params = checkSetup(
        '<p style="width: 60%" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false when letter-spacing is less than 0.12em and !important', () => {
      const params = checkSetup(
        '<p style="letter-spacing: 0.1em !important" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 0.1,
        minValue: 0.12
      });
    });

    it('is true when !important is not used', () => {
      const params = checkSetup(
        '<p style="letter-spacing: 0.1em" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true when letter-spacing is 0.15 times the font-size', () => {
      const params = checkSetup(
        '<p style="letter-spacing: 0.15em !important" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, {
        value: 0.15,
        minValue: 0.12
      });
    });

    it('uses the highest priority value if multiple are set', () => {
      const style = [
        'letter-spacing: 0.15em !important',
        'letter-spacing: 0.1em !important',
        'letter-spacing: 0.2em'
      ].join('; ');
      const params = checkSetup(
        '<p style="' + style + '" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 0.1,
        minValue: 0.12
      });
    });

    describe('handles different font-sizes', () => {
      it('is true when the font is 0.15 time the spacing', () => {
        const params = checkSetup(
          '<p style="font-size: 20px; letter-spacing: 3px !important" id="target">Hello world</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 0.15,
          minValue: 0.12
        });
      });

      it('is false when the font is 0.10 times the spacing', () => {
        const params = checkSetup(
          '<p style="font-size: 30px; letter-spacing: 3px !important" id="target">Hello world</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, {
          value: 0.1,
          minValue: 0.12
        });
      });
    });

    describe('with non-number values', () => {
      it('is false when `normal` (which is 0) is used along with !important', () => {
        const params = checkSetup(
          '<p style="letter-spacing: normal !important" id="target">Hello world</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, {
          value: 0,
          minValue: 0.12
        });
      });

      it('is false when `initial` (meaning `normal`) is used along with !important', () => {
        const params = checkSetup(
          '<p style="letter-spacing: initial !important" id="target">Hello world</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, {
          value: 0,
          minValue: 0.12
        });
      });

      it('is true when `inherited` is used along with !important', () => {
        const params = checkSetup(
          '<p style="letter-spacing: 0.1em">' +
            '<span style="letter-spacing: inherit !important;" id="target">Hello world</span</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'inherit',
          minValue: 0.12
        });
      });

      it('is true when `unset` is used along with !important', () => {
        const params = checkSetup(
          '<p style="letter-spacing: 0.1em">' +
            '<span style="letter-spacing: unset !important;" id="target">Hello world</span</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'unset',
          minValue: 0.12
        });
      });

      it('is true when `revert` is used along with !important', () => {
        const params = checkSetup(
          '<p style="letter-spacing: 0.1em">' +
            '<span style="letter-spacing: revert !important;" id="target">Hello world</span</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'revert',
          minValue: 0.12
        });
      });

      it('is true when `revert-layer` is used along with !important', () => {
        const params = checkSetup(
          '<p style="letter-spacing: 0.1em">' +
            '<span style="letter-spacing: revert-layer !important;" id="target">Hello world</span</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'revert-layer',
          minValue: 0.12
        });
      });
    });
  });

  describe('important-word-spacing check', () => {
    const checkEvaluate = axe.testUtils.getCheckEvaluate(
      'important-word-spacing'
    );
    const checkContext = axe.testUtils.MockCheckContext();
    afterEach(() => {
      checkContext.reset();
    });

    it('is true when word-spacing is not set in the style attribute', () => {
      const params = checkSetup(
        '<p style="width: 60%" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true when below 0.16em and not !important', () => {
      const params = checkSetup(
        '<p style="word-spacing: 0.1em" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false when below 0.16em and !important', () => {
      const params = checkSetup(
        '<p style="word-spacing: 0.1em !important" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 0.1,
        minValue: 0.16
      });
    });

    it('is true when 0.16em and !important', () => {
      const params = checkSetup(
        '<p style="word-spacing: 0.16em !important" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, {
        value: 0.16,
        minValue: 0.16
      });
    });
  });

  describe('important-line-height check', () => {
    const checkEvaluate = axe.testUtils.getCheckEvaluate(
      'important-line-height'
    );
    const checkContext = axe.testUtils.MockCheckContext();
    afterEach(() => {
      checkContext.reset();
    });

    it('is true when line-height is not set in the style attribute', () => {
      const params = checkSetup(
        '<p style="width: 60%" id="target">Hello world</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true when below 1.5em and not !important', () => {
      const params = checkSetup(
        '<p style="line-height: 1.2em; max-width: 200px;" id="target">' +
          '	The toy brought back fond memories of being lost in the rain forest.' +
          '</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false when below 1.5em and !important', () => {
      const params = checkSetup(
        '<p style="line-height: 1.2em !important; max-width: 200px;" id="target">' +
          '	The toy brought back fond memories of being lost in the rain forest.' +
          '</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 1.2,
        minValue: 1.5
      });
    });

    it('is true when 1.5em and !important', () => {
      const params = checkSetup(
        '<p style="line-height: 1.5em !important; max-width: 200px;" id="target">' +
          '	The toy brought back fond memories of being lost in the rain forest.' +
          '</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, {
        value: 1.5,
        minValue: 1.5
      });
    });

    it('returns the 1em for `normal !important`', () => {
      const params = checkSetup(
        '<p style="line-height: normal !important; max-width: 200px;" id="target">' +
          '	The toy brought back fond memories of being lost in the rain forest.' +
          '</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 1,
        minValue: 1.5
      });
    });

    it('is true for single line texts', () => {
      const params = checkSetup(
        '<p style="line-height: 1.2em !important; max-width: 200px;" id="target">' +
          '	Short' +
          '</p>'
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });
  });

  describe('With options configured for font-size', () => {
    const checkEvaluate = axe.testUtils.getCheckEvaluate(
      'important-letter-spacing'
    );
    const checkContext = axe.testUtils.MockCheckContext();
    const options = {
      cssProperty: 'font-size',
      minValue: 16,
      maxValue: 42,
      absoluteValues: true,
      noImportant: false
    };

    afterEach(() => {
      checkContext.reset();
    });

    it('is false when !important and below the minValue', () => {
      const params = checkSetup(
        '<p style="font-size: 12px !important" id="target">Hello world</p>',
        options
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 12,
        minValue: 16,
        maxValue: 42
      });
    });

    it('is false when !important and above the maxValue', () => {
      const params = checkSetup(
        '<p style="font-size: 43px !important" id="target">Hello world</p>',
        options
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 43,
        minValue: 16,
        maxValue: 42
      });
    });

    it('is true when not !important', () => {
      const params = checkSetup(
        '<p style="font-size: 12px" id="target">Hello world</p>',
        options
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false when not !important and {noImportant: true}', () => {
      const opt = Object.assign({}, options, { noImportant: true });
      const params = checkSetup(
        '<p style="font-size: 12px" id="target">Hello world</p>',
        opt
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 12,
        minValue: 16,
        maxValue: 42
      });
    });

    it('returns the normal value when `normal` is used', () => {
      // Using line-height, since font-size cannot be normal
      const opts = {
        cssProperty: 'line-height',
        normalValue: 3,
        minValue: 5
      };
      const params = checkSetup(
        '<p style="line-height: normal !important" id="target">Hello world</p>',
        opts
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 3,
        minValue: 5
      });
    });

    it('is true when above the minValue', () => {
      const params = checkSetup(
        '<p style="font-size: 16px !important" id="target">Hello world</p>',
        options
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, {
        value: 16,
        minValue: 16,
        maxValue: 42
      });
    });

    it('ignores minValue when not a number', () => {
      const opt = Object.assign({}, options, { minValue: '16' });
      const params = checkSetup(
        '<p style="font-size: 12px !important" id="target">Hello world</p>',
        opt
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, {
        value: 12,
        maxValue: 42
      });
    });

    it('ignores maxValue when not a number', () => {
      const opt = Object.assign({}, options, { maxValue: '42' });
      const params = checkSetup(
        '<p style="font-size: 50px !important" id="target">Hello world</p>',
        opt
      );
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, {
        value: 50,
        minValue: 16
      });
    });
  });
});
