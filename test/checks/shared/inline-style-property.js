describe('inline-style-property tests', () => {
  const html = axe.testUtils.html;
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;

  afterEach(() => {
    fixture.innerHTML = '';
    sinon.restore();
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
        html`<p style="${style}" id="target">Hello world</p>`
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
        const params = checkSetup(html`
          <p style="letter-spacing: 0.1em">
          <span style="letter-spacing: inherit !important;" id="target">Hello world</span</p>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'inherit',
          minValue: 0.12
        });
      });

      it('is true when `unset` is used along with !important', () => {
        const params = checkSetup(html`
          <p style="letter-spacing: 0.1em">
          <span style="letter-spacing: unset !important;" id="target">Hello world</span</p>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'unset',
          minValue: 0.12
        });
      });

      it('is true when `revert` is used along with !important', () => {
        const params = checkSetup(html`
          <p style="letter-spacing: 0.1em">
          <span style="letter-spacing: revert !important;" id="target">Hello world</span</p>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'revert',
          minValue: 0.12
        });
      });

      it('is true when `revert-layer` is used along with !important', () => {
        const params = checkSetup(html`
          <p style="letter-spacing: 0.1em">
          <span style="letter-spacing: revert-layer !important;" id="target">Hello world</span</p>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, {
          value: 'revert-layer',
          minValue: 0.12
        });
      });
    });

    it('is undefined when the computed letter-spacing is not a number', () => {
      const params = checkSetup(
        '<p style="letter-spacing: 0.1em !important" id="target">Hello world</p>'
      );
      sinon
        .stub(window, 'getComputedStyle')
        .returns({ getPropertyValue: () => 'invalid' });
      const result = checkEvaluate.apply(checkContext, params);
      assert.isUndefined(result);
      assert.deepEqual(checkContext._data, {
        value: 'invalid',
        minValue: 0.12
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

    it('is undefined when the computed word-spacing is not a number', () => {
      const params = checkSetup(
        '<p style="word-spacing: 0.1em !important" id="target">Hello world</p>'
      );
      sinon
        .stub(window, 'getComputedStyle')
        .returns({ getPropertyValue: () => 'invalid' });
      const result = checkEvaluate.apply(checkContext, params);
      assert.isUndefined(result);
      assert.deepEqual(checkContext._data, {
        value: 'invalid',
        minValue: 0.16
      });
    });

    describe('with text in descendants', () => {
      it('is false when a descendant inherits a spacing below the minimum', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            <p id="child">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, { value: 0.1, minValue: 0.16 });
        assert.deepEqual(checkContext._relatedNodes, [
          fixture.querySelector('#child')
        ]);
      });

      it('measures the spacing against the font-size of the text', () => {
        const params = checkSetup(html`
          <div
            id="target"
            style="font-size: 16px; word-spacing: 2px !important"
          >
            <p style="font-size: 10px">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.deepEqual(checkContext._data, { value: 0.2, minValue: 0.16 });
      });

      it('fails when the text has a font-size the spacing is too small for', () => {
        const params = checkSetup(html`
          <div
            id="target"
            style="font-size: 10px; word-spacing: 2px !important"
          >
            <p style="font-size: 16px">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._data, { value: 0.13, minValue: 0.16 });
      });

      it('is true when every text sets the property itself', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            <p style="word-spacing: 0.2em !important">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.isNull(checkContext._data);
        assert.lengthOf(checkContext._relatedNodes, 0);
      });

      it('skips text below an element that sets the property itself', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            <p style="word-spacing: 0.2em">
              <span>Hello world</span>
            </p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.isNull(checkContext._data);
      });

      it('does not skip text below an element that inherits the property', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            <p style="word-spacing: inherit">
              <span id="child">Hello world</span>
            </p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._relatedNodes, [
          fixture.querySelector('#child')
        ]);
      });

      it('does not skip text below an element that unsets the property', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            <p style="word-spacing: unset">
              <span id="child">Hello world</span>
            </p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._relatedNodes, [
          fixture.querySelector('#child')
        ]);
      });

      it('skips text that a stylesheet gives a spacing of its own', () => {
        const params = checkSetup(html`
          <style>
            .tight {
              word-spacing: 0.05em;
            }
          </style>
          <div id="target" style="word-spacing: 0.5em !important">
            <p class="tight">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.isNull(checkContext._data);
        assert.lengthOf(checkContext._relatedNodes, 0);
      });

      it('skips the text below an element a stylesheet gives a spacing of its own', () => {
        const params = checkSetup(html`
          <style>
            .tight {
              word-spacing: 0.05em;
            }
          </style>
          <div id="target" style="word-spacing: 0.5em !important">
            <div class="tight"><p>Hello world</p></div>
            <p id="child" style="font-size: 10px">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        // 8px inherited, on the 10px font-size of the text that is measured
        assert.deepEqual(checkContext._data, { value: 0.8, minValue: 0.16 });
      });

      it('fails for text next to text a stylesheet gives a spacing of its own', () => {
        const params = checkSetup(html`
          <style>
            .loose {
              word-spacing: 0.5em;
            }
          </style>
          <div id="target" style="word-spacing: 0.1em !important">
            <p class="loose">Hello world</p>
            <p id="child">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._relatedNodes, [
          fixture.querySelector('#child')
        ]);
      });

      it('fails for text that inherits the property next to text that does not', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            <p style="word-spacing: 0.2em !important">Hello world</p>
            <p id="child">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._relatedNodes, [
          fixture.querySelector('#child')
        ]);
      });

      it('ignores text that is not visible', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            <p style="display: none">Hello world</p>
            <p style="opacity: 0">Hello world</p>
            <p></p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isTrue(result);
        assert.isNull(checkContext._data);
      });

      it('does not list the element itself as a related node', () => {
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            Hello world
            <p id="child">Hello world</p>
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.deepEqual(checkContext._relatedNodes, [
          fixture.querySelector('#child')
        ]);
      });

      it('finds text in the shadow DOM', () => {
        const params = axe.testUtils.shadowCheckSetup(
          '<div id="target" style="word-spacing: 0.1em !important"><div id="shadow"></div></div>',
          '<p>Hello world</p>'
        );
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.lengthOf(checkContext._relatedNodes, 1);
      });

      it('lists at most five related nodes', () => {
        const paragraphs = '<p>Hello world</p>'.repeat(5);
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            ${paragraphs}
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.lengthOf(checkContext._relatedNodes, 5);
        assert.deepEqual(checkContext._data, { value: 0.1, minValue: 0.16 });
      });

      it('stops looking after the failure that sets the messageKey', () => {
        const paragraphs = '<p>Hello world</p>'.repeat(10);
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            ${paragraphs}
          </div>
        `);
        const getComputedStyle = sinon.spy(window, 'getComputedStyle');
        const result = checkEvaluate.apply(checkContext, params);
        const styled = getComputedStyle.args.map(([element]) => element);
        const paragraphNodes = Array.from(fixture.querySelectorAll('p'));
        assert.isFalse(result);
        assert.equal(checkContext._data.messageKey, 'omitted');
        assert.isTrue(
          paragraphNodes.slice(0, 6).every(p => styled.includes(p))
        );
        assert.isFalse(paragraphNodes.slice(6).some(p => styled.includes(p)));
      });

      it('sets the messageKey when related nodes are left out', () => {
        const paragraphs = '<p>Hello world</p>'.repeat(6);
        const params = checkSetup(html`
          <div id="target" style="word-spacing: 0.1em !important">
            ${paragraphs}
          </div>
        `);
        const result = checkEvaluate.apply(checkContext, params);
        assert.isFalse(result);
        assert.lengthOf(checkContext._relatedNodes, 5);
        assert.deepEqual(checkContext._data, {
          value: 0.1,
          minValue: 0.16,
          messageKey: 'omitted'
        });
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

    it('only measures the descendants with text on more than one line', () => {
      const params = checkSetup(html`
        <div
          id="target"
          style="line-height: 1.2em !important; max-width: 200px;"
        >
          <p>Banana</p>
          <p id="multiline">
            The toy brought back fond memories of being lost in the rain forest.
          </p>
        </div>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, { value: 1.2, minValue: 1.5 });
      assert.deepEqual(checkContext._relatedNodes, [
        fixture.querySelector('#multiline')
      ]);
    });

    it('measures a descendant with another font-size against the line-height it inherits', () => {
      const params = checkSetup(html`
        <div id="target" style="line-height: 1.2 !important; max-width: 200px;">
          <p id="multiline" style="font-size: 10px">
            The toy brought back fond memories of being lost in the rain forest.
          </p>
        </div>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, { value: 1.2, minValue: 1.5 });
      assert.deepEqual(checkContext._relatedNodes, [
        fixture.querySelector('#multiline')
      ]);
    });

    it('skips a descendant that a stylesheet gives a line-height of its own', () => {
      const params = checkSetup(html`
        <style>
          .tight {
            line-height: 1.1;
          }
        </style>
        <div id="target" style="line-height: 1.6 !important; max-width: 200px;">
          <p class="tight" style="font-size: 10px">
            The toy brought back fond memories of being lost in the rain forest.
          </p>
        </div>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true when no descendant with text is on more than one line', () => {
      const params = checkSetup(html`
        <div id="target" style="line-height: 1.2em !important;">
          <p>Banana</p>
          <p>Apple</p>
        </div>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is true when below 1.5em and not !important', () => {
      const params = checkSetup(html`
        <p style="line-height: 1.2em; max-width: 200px;" id="target">
          The toy brought back fond memories of being lost in the rain forest.
        </p>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is false when below 1.5em and !important', () => {
      const params = checkSetup(html`
        <p style="line-height: 1.2em !important; max-width: 200px;" id="target">
          The toy brought back fond memories of being lost in the rain forest.
        </p>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 1.2,
        minValue: 1.5
      });
    });

    it('is true when 1.5em and !important', () => {
      const params = checkSetup(html`
        <p style="line-height: 1.5em !important; max-width: 200px;" id="target">
          The toy brought back fond memories of being lost in the rain forest.
        </p>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.deepEqual(checkContext._data, {
        value: 1.5,
        minValue: 1.5
      });
    });

    it('returns the 1em for `normal !important`', () => {
      const params = checkSetup(html`
        <p
          style="line-height: normal !important; max-width: 200px;"
          id="target"
        >
          The toy brought back fond memories of being lost in the rain forest.
        </p>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isFalse(result);
      assert.deepEqual(checkContext._data, {
        value: 1,
        minValue: 1.5
      });
    });

    it('is true for single line texts', () => {
      const params = checkSetup(html`
        <p style="line-height: 1.2em !important; max-width: 200px;" id="target">
          Short
        </p>
      `);
      const result = checkEvaluate.apply(checkContext, params);
      assert.isTrue(result);
      assert.isNull(checkContext._data);
    });

    it('is undefined when the computed line-height is not a number', () => {
      const params = checkSetup(html`
        <p style="line-height: 1.2em !important; max-width: 200px;" id="target">
          The toy brought back fond memories of being lost in the rain forest.
        </p>
      `);
      sinon
        .stub(window, 'getComputedStyle')
        .returns({ getPropertyValue: () => 'invalid' });
      const result = checkEvaluate.apply(checkContext, params);
      assert.isUndefined(result);
      assert.deepEqual(checkContext._data, {
        value: 'invalid',
        minValue: 1.5
      });
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
