describe('aria-prohibited-attr', () => {
  'use strict';

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
    const params = checkSetup(
      '<div id="target" role="code" aria-hidden="false"  aria-label="foo" aria-labelledby="foo"></div>'
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

  it('should not allow `elementsAllowedAriaLabel` nodes with a prohibited role', () => {
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

  it('should not allow aria-label on divs that have an invalid role', function () {
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

  it('should allow aria-label on divs with a valid fallback role', function () {
    const params = checkSetup(
      '<div id="target" role="foo dialog" aria-label="foo"></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should not allow aria-label on divs with no valid fallback roles', function () {
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

  describe('widget ancestor', () => {
    it('should allow aria-label', () => {
      const params = checkSetup(`
        <button>
          <span>
            <span id="target" aria-label="hello world"></span>
          </span>
        </button>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should allow aria-labelledby', () => {
      const params = checkSetup(`
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
      const params = checkSetup(`
        <button>
          <h1 role="none">
            <span id="target" aria-label="hello world"></span>
          </h1>
        </button>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should skip "role=presentation" roles in between ancestor', () => {
      const params = checkSetup(`
        <a href="#">
          <h1 role="presentation">
            <span id="target" aria-label="hello world"></span>
          </h1>
        </a>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should not allow aria-label on descendant of non-widget', () => {
      const params = checkSetup(`
        <div role="grid">
          <span>
            <span id="target" aria-label="foo"></span>
          </span>
        </div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should not allow aria-labelledby on descendant of non-widget', () => {
      const params = checkSetup(`
        <div id="foo">hello world</div>
        <div role="grid">
          <span>
            <span id="target" aria-labelledby="foo"></span>
          </span>
        </div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should use closet non-presentational ancestor', () => {
      const params = checkSetup(`
        <button>
          <span role="grid">
            <span id="target" aria-label="foo"></span>
          </span>
        </button>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should use closet chromium role', () => {
      const params = checkSetup(`
        <button>
          <label>
            <span id="target" aria-label="foo"></span>
          </label>
        </button>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });
  });
});
