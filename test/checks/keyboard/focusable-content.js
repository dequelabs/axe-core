describe('focusable-content tests', () => {
  const html = axe.testUtils.html;

  let check;
  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;

  before(() => {
    check = checks['focusable-content'];
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  function relatedNodeIds() {
    return checkContext._relatedNodes.map(vNode => vNode.props.id);
  }

  it('returns false when there are no focusable content elements (content element `div` is not focusable)', () => {
    const params = checkSetup(html`
      <div id="target">
        <div>Content</div>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns undefined when content has a tabindex but is not in the tab order', () => {
    const params = checkSetup(html`
      <div id="target">
        <input id="related1" type="text" tabindex="-1" />
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isUndefined(actual);
    assert.deepEqual(relatedNodeIds(), ['related1']);
  });

  it('returns true when there is both a tabbable element and a negative tabindex element', () => {
    const params = checkSetup(html`
      <div id="target">
        <input id="related1" type="text" tabindex="-1" />
        <button>Tabbable</button>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
    assert.deepEqual(relatedNodeIds(), []);
  });

  it('returns false when content with a tabindex is hidden', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" tabindex="-1" hidden />
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when content with a tabindex is disabled', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" tabindex="-1" disabled />
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('ignores hidden content with a tabindex', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" tabindex="-1" hidden />
        <input id="related1" type="text" tabindex="-1" />
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isUndefined(actual);
    assert.deepEqual(relatedNodeIds(), ['related1']);
  });

  it('ignores disabled content with a tabindex', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" tabindex="-1" disabled />
        <input id="related1" type="text" tabindex="-1" />
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isUndefined(actual);
    assert.deepEqual(relatedNodeIds(), ['related1']);
  });

  it('returns false when element is focusable (only checks if contents are focusable)', () => {
    const params = checkSetup(html`
      <div id="target" tabindex="0">
        <p style="height: 200px;"></p>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns undefined when all content elements have a negative tabindex', () => {
    const params = checkSetup(html`
      <div id="target">
        <input id="related1" type="text" tabindex="-1" />
        <select id="related2" tabindex="-1"></select>
        <textarea id="related3" tabindex="-1"></textarea>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isUndefined(actual);
    assert.deepEqual(relatedNodeIds(), ['related1', 'related2', 'related3']);
  });

  it('returns true when one deeply nested content element is focusable', () => {
    const params = checkSetup(html`
      <div id="target">
        <div style="height: 200px">
          <div style="height: 200px">
            <input type="text" />
          </div>
        </div>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when content element can be focused', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" />
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when any one of the many content elements can be focused', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" tabindex="-1" />
        <select tabindex="-1"></select>
        <textarea tabindex="-1"></textarea>
        <p style="height: 200px;" tabindex="0"></p>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  describe('aria-activedescendant', () => {
    it('returns undefined when a focusable element references content with aria-activedescendant', () => {
      const params = checkSetup(html`
        <input id="related1" aria-activedescendant="opt2" />
        <div id="target">
          <div id="opt1">Apple</div>
          <div id="opt2">Banana</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.deepEqual(relatedNodeIds(), ['related1']);
      assert.deepEqual(checkContext._data, { messageKey: 'activedescendant' });
    });

    it('returns undefined when a nested active descendant is referenced', () => {
      const params = checkSetup(html`
        <div id="related1" tabindex="-1" aria-activedescendant="opt1"></div>
        <div id="target">
          <ul>
            <li><span id="opt1">Apple</span></li>
          </ul>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.deepEqual(relatedNodeIds(), ['related1']);
    });

    it('returns false when the element with aria-activedescendant is not focusable', () => {
      const params = checkSetup(html`
        <div aria-activedescendant="opt1"></div>
        <div id="target">
          <div id="opt1">Apple</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isFalse(actual);
    });

    it('returns false when the element with aria-activedescendant is disabled', () => {
      const params = checkSetup(html`
        <input disabled aria-activedescendant="opt1" />
        <div id="target">
          <div id="opt1">Apple</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isFalse(actual);
    });

    it('returns false when the active descendant is outside the element', () => {
      const params = checkSetup(html`
        <input aria-activedescendant="opt1" />
        <div id="opt1">Apple</div>
        <div id="target">
          <div>Banana</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isFalse(actual);
    });

    it('returns false when the active descendant does not exist', () => {
      const params = checkSetup(html`
        <input aria-activedescendant="missing" />
        <div id="target">
          <div>Banana</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isFalse(actual);
    });

    it('returns false when the active descendant is the element itself', () => {
      const params = checkSetup(html`
        <input aria-activedescendant="target" />
        <div id="target">
          <div>Banana</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isFalse(actual);
    });

    it('ignores aria-activedescendant on the element itself', () => {
      const params = checkSetup(html`
        <div id="target" tabindex="-1" aria-activedescendant="opt1">
          <div id="opt1">Apple</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isFalse(actual);
    });

    it('uses the negative tabindex message when content also has a negative tabindex', () => {
      const params = checkSetup(html`
        <input aria-activedescendant="opt1" />
        <div id="target">
          <div id="opt1">Apple</div>
          <button id="related1" tabindex="-1">Banana</button>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.deepEqual(relatedNodeIds(), ['related1']);
      assert.isNull(checkContext._data);
    });

    it('returns undefined when the active descendant is slotted into a shadow tree', () => {
      const params = checkSetup(html`
        <input id="related1" aria-activedescendant="opt1" />
        <div>
          <template shadowrootmode="open">
            <div id="target"><slot></slot></div>
          </template>
          <div id="opt1">Apple</div>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.deepEqual(relatedNodeIds(), ['related1']);
    });
  });

  describe('shadowDOM - focusable content', () => {
    it('returns true when content element can be focused', () => {
      const params = checkSetup(html`
        <div id="target">
          <template shadowrootmode="open">
            <input type="text" />
          </template>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isTrue(actual);
    });

    it('returns undefined when content has a negative tabindex', () => {
      const params = checkSetup(html`
        <div id="target">
          <template shadowrootmode="open">
            <input id="related1" type="text" tabindex="-1" />
            <p>just some text</p>
          </template>
        </div>
      `);
      const actual = check.evaluate.apply(checkContext, params);
      assert.isUndefined(actual);
      assert.deepEqual(relatedNodeIds(), ['related1']);
    });
  });
});
