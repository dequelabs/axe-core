describe('focusable-content tests', () => {
  const html = axe.testUtils.html;

  let check;
  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const shadowSupported = axe.testUtils.shadowSupport.v1;
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

  it('returns false when there are no focusable content elements (content element `div` is not focusable)', () => {
    const params = checkSetup(html`
      <div id="target">
        <div>Content</div>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when content element is taken out of focusable order (tabindex = -1)', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" tabindex="-1" />
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
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

  it('returns false when all content elements are not focusable', () => {
    const params = checkSetup(html`
      <div id="target">
        <input type="text" tabindex="-1" />
        <select tabindex="-1"></select>
        <textarea tabindex="-1"></textarea>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
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
    before(function () {
      if (!shadowSupported) {
        this.skip();
      }
    });

    it('returns true when content element can be focused', () => {
      fixtureSetup(html` <div id="target"></div> `);
      const node = fixture.querySelector('#target');
      const shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<input type="text">';
      axe._tree = axe.utils.getFlattenedTree(fixture);
      axe._selectorData = axe.utils.getSelectorData(axe._tree);
      const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
      const actual = check.evaluate.call(checkContext, node, {}, virtualNode);
      assert.isTrue(actual);
    });

    it('returns false when no focusable content', () => {
      fixtureSetup(html` <div id="target"></div> `);
      const node = fixture.querySelector('#target');
      const shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<input type="text" tabindex="-1"> <p>just some text</p>';
      axe._tree = axe.utils.getFlattenedTree(fixture);
      axe._selectorData = axe.utils.getSelectorData(axe._tree);
      const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
      const actual = check.evaluate.call(checkContext, node, {}, virtualNode);
      assert.isFalse(actual);
    });
  });
});
