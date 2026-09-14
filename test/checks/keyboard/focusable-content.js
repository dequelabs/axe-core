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
