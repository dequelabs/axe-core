describe('aria-prohibited-attr', () => {
  const html = axe.testUtils.html;

  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('aria-prohibited-attr');

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true for prohibited attributes and no content', () => {
    const params = checkSetup(
      '<div id="target" role="code" aria-hidden="false" aria-label="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: 'code',
      messageKey: 'hasRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return undefined for prohibited attributes and content', () => {
    const params = checkSetup(
      '<div id="target" role="code" aria-hidden="false" aria-label="foo">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: 'code',
      messageKey: 'hasRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return true for multiple prohibited attributes', () => {
    // labelledby does not resolve, so AccName uses aria-label
    const params = checkSetup(
      '<div id="target" role="code" aria-hidden="false" aria-label="foo" aria-labelledby="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: 'code',
      messageKey: 'hasRolePlural',
      // attribute order not important
      prohibited: ['aria-label', 'aria-labelledby']
    });
  });

  it('should return true for prohibited aria-actions', () => {
    const params = checkSetup(
      '<div id="target" role="code" aria-actions="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: 'code',
      messageKey: 'hasRoleSingular',
      prohibited: ['aria-actions']
    });
  });

  it('should return false for aria-actions on a role that allows it', () => {
    const params = checkSetup(
      '<div id="target" role="button" aria-actions="foo"></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return undefined if element has no role and has text content (singular)', () => {
    const params = checkSetup(
      '<div id="target" aria-label="foo">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return undefined if element has no role and has text content (plural)', () => {
    const params = checkSetup(
      '<div id="target" aria-label="foo" aria-labelledby="foo">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRolePlural',
      prohibited: ['aria-label', 'aria-labelledby']
    });
  });

  it('should return true if element has no role and no text content (singular)', () => {
    const params = checkSetup('<div id="target" aria-label="foo"></div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should return true if element has no role and no text content (plural)', () => {
    // labelledby does not resolve, so AccName uses aria-label
    const params = checkSetup(
      '<div id="target" aria-label="foo" aria-labelledby="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRolePlural',
      prohibited: ['aria-label', 'aria-labelledby']
    });
  });

  it('should return false if all attributes are allowed', () => {
    const params = checkSetup(
      '<div id="target" role="button" aria-label="foo" aria-labelledby="foo">Contents</div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if no prohibited attributes are used', () => {
    const params = checkSetup(
      '<div id="target" role="code" aria-selected="true">Contents</div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if prohibited attributes have no value', () => {
    const params = checkSetup(
      '<div id="target" role="code" aria-label="  " aria-labelledby="  ">Contents</div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should allow `elementsAllowedAriaLabel` nodes to have aria-label', () => {
    const params = checkSetup(
      '<div id="target" aria-label="hello world"></div>',
      { elementsAllowedAriaLabel: ['div'] }
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should not allow `elementsAllowedAriaLabel` nodes with a role with prohibited attrs', () => {
    const params = checkSetup(
      '<div id="target" role="code" aria-label="hello world"></div>',
      { elementsAllowedAriaLabel: ['div'] }
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should allow elements that have an implicit role in chromium', () => {
    const params = checkSetup(
      '<svg id="target" aria-label="hello world"></svg>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should not allow aria-label on divs that have an invalid role', () => {
    const params = checkSetup(
      '<div id="target" role="foo" aria-label="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should allow aria-label on divs with a valid fallback role', () => {
    const params = checkSetup(
      '<div id="target" role="foo dialog" aria-label="foo"></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should not allow aria-label on divs with no valid fallback roles', () => {
    const params = checkSetup(
      '<div id="target" role="foo bar" aria-label="foo"></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      nodeName: 'div',
      role: null,
      messageKey: 'noRoleSingular',
      prohibited: ['aria-label']
    });
  });

  it('should allow aria-label on custom element without role', () => {
    const params = checkSetup(
      '<custom-elm id="target" aria-label="value"></custom-elm>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  describe('widget ancestor', () => {
    it('should allow aria-label', () => {
      const params = checkSetup(html`
        <button>
          <span>
            <span id="target" aria-label="hello world"></span>
          </span>
        </button>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should allow aria-labelledby', () => {
      const params = checkSetup(html`
        <div id="foo">hello world</div>
        <button>
          <span>
            <span id="target" aria-labelledby="foo"></span>
          </span>
        </button>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should skip "role=none" roles in between ancestor', () => {
      const params = checkSetup(html`
        <button>
          <h1 role="none">
            <span id="target" aria-label="hello world"></span>
          </h1>
        </button>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should skip "role=presentation" roles in between ancestor', () => {
      const params = checkSetup(html`
        <a href="#">
          <h1 role="presentation">
            <span id="target" aria-label="hello world"></span>
          </h1>
        </a>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should not allow aria-label on descendant of non-widget', () => {
      const params = checkSetup(html`
        <div role="grid">
          <span>
            <span id="target" aria-label="foo"></span>
          </span>
        </div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should not allow aria-labelledby on descendant of non-widget', () => {
      const params = checkSetup(html`
        <div id="foo" hidden>hello world</div>
        <div role="grid">
          <span>
            <span id="target" aria-labelledby="foo"></span>
          </span>
        </div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should use closet non-presentational ancestor', () => {
      const params = checkSetup(html`
        <button>
          <span role="grid">
            <span id="target" aria-label="foo"></span>
          </span>
        </button>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should use closet chromium role', () => {
      const params = checkSetup(html`
        <button>
          <label>
            <span id="target" aria-label="foo"></span>
          </label>
        </button>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });
  });

  describe('visible aria-labelledby references', () => {
    it('should return undefined for a visible reference outside the element', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="hd"></div>
        <h1 id="hd">Hello world</h1>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        nodeName: 'div',
        role: null,
        messageKey: 'visibleLabelSingular',
        prohibited: ['aria-labelledby']
      });
    });

    it('continues to fail other prohibited attributes', () => {
      const params = checkSetup(html`
        <code
          id="target"
          role="code"
          aria-labelledby="hd"
          aria-actions="hd"
        ></code>
        <h1 id="hd">Hello world</h1>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        nodeName: 'code',
        role: 'code',
        messageKey: 'hasRolePlural',
        prohibited: ['aria-actions', 'aria-labelledby']
      });
    });

    it('should return undefined with a visible labelledby and aria-label', () => {
      // aria-label is an exception, as it is ignored when aria-labelledby resolves
      const params = checkSetup(html`
        <code id="target" aria-labelledby="hd" aria-label="Hello world"></code>
        <h1 id="hd">Hello world</h1>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        nodeName: 'code',
        role: null,
        messageKey: 'visibleLabelPlural',
        prohibited: ['aria-label', 'aria-labelledby']
      });
    });

    it('should return undefined for a visible reference on a prohibiting role', () => {
      const params = checkSetup(html`
        <div id="target" role="code" aria-labelledby="hd"></div>
        <h1 id="hd">Hello world</h1>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        nodeName: 'div',
        role: 'code',
        messageKey: 'visibleLabelSingular',
        prohibited: ['aria-labelledby']
      });
    });

    it('should return true when any of multiple references is not visible', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="hidden hd"></div>
        <h1 id="hidden" hidden>Hidden</h1>
        <h1 id="hd">Hello world</h1>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should return undefined when all of multiple references are visible', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="a b"></div>
        <h1 id="a">Hello</h1>
        <h1 id="b">world</h1>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
    });

    it('should return undefined for a visible empty reference', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="hd"></div>
        <p id="hd"></p>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
    });

    it('should return true for a visible empty reference and aria-label', () => {
      // The accessible name comes from the prohibited aria-label, because
      // aria-labelledby resolves to an empty string
      const params = checkSetup(html`
        <code id="target" aria-labelledby="hd" aria-label="Hello world"></code>
        <p id="hd"></p>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        nodeName: 'code',
        role: null,
        messageKey: 'noRolePlural',
        prohibited: ['aria-label', 'aria-labelledby']
      });
    });

    it('should return true for a whitespace only reference and aria-label', () => {
      const params = checkSetup(html`
        <code id="target" aria-labelledby="hd" aria-label="Hello world"></code>
        <p id="hd">&nbsp;</p>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should return undefined for a reference to itself', () => {
      // The accessible name is empty, as the element has no content
      const params = checkSetup(
        '<div id="target" aria-labelledby="target"></div>'
      );
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        nodeName: 'div',
        role: null,
        messageKey: 'visibleLabelSingular',
        prohibited: ['aria-labelledby']
      });
    });

    it('should return undefined for a missing reference', () => {
      const params = checkSetup(
        '<div id="target" aria-labelledby="missing"></div>'
      );
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        nodeName: 'div',
        role: null,
        messageKey: 'unresolvedLabel',
        prohibited: ['aria-labelledby']
      });
    });

    it('should return undefined when a reference is missing among visible ones', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="missing hd"></div>
        <h1 id="hd">Hello world</h1>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
    });

    it('should return true when a reference is missing among hidden ones', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="missing hd"></div>
        <h1 id="hd" hidden>Hello world</h1>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should return true for a hidden reference', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="hd"></div>
        <h1 id="hd" hidden>Hello world</h1>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should return true for a display:none reference', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="hd"></div>
        <h1 id="hd" style="display: none">Hello world</h1>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should return true for an aria-hidden reference', () => {
      const params = checkSetup(html`
        <div id="target" aria-labelledby="hd"></div>
        <h1 id="hd" aria-hidden="true">Hello world</h1>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should return undefined for a visible reference on a custom element', () => {
      const params = checkSetup(html`
        <h1 id="hd">Hello world</h1>
        <my-element id="target" role="code" aria-labelledby="hd"></my-element>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
    });

    it('should return undefined for a visible reference inside shadow DOM', () => {
      const params = checkSetup(html`
        <div>
          <template shadowrootmode="open">
            <div id="target" aria-labelledby="hd"></div>
            <h1 id="hd">Hello world</h1>
          </template>
        </div>
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, params));
    });
  });
});
