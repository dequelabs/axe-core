describe('focusable-not-tabbable', () => {
  const html = axe.testUtils.html;

  let check;
  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;

  before(() => {
    check = checks['focusable-not-tabbable'];
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
    checkContext.reset();
  });

  it('returns true when BUTTON removed from tab order through tabindex', () => {
    const params = checkSetup(html`
      <div id="target" aria-hidden="true">
        <button tabindex="-1">Some button</button>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when LINK is in tab order', () => {
    const params = checkSetup(html`
      <div id="target" aria-hidden="true">
        <a href="abc.html">ABC Site</a>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('a'))
    );
  });

  it('returns true when focusable SUMMARY element, that cannot be disabled', () => {
    const params = checkSetup(
      '<details id="target" aria-hidden="true"><summary>Some button</summary><p>Some details</p></details>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('summary'))
    );
  });

  it('returns true when TEXTAREA is in tab order, but 0 related nodes as TEXTAREA can be disabled', () => {
    const params = checkSetup(html`
      <div id="target" aria-hidden="true">
        <label
          >Enter your comments:
          <textarea></textarea>
        </label>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.lengthOf(checkContext._relatedNodes, 0);
    assert.isTrue(actual);
  });

  it('returns false when focusable AREA element', () => {
    const params = checkSetup(html`
      <main id="target" aria-hidden="true">
        <map name="infographic">
          <area
            shape="rect"
            coords="184,6,253,27"
            href="https://mozilla.org"
            target="_blank"
            alt="Mozilla"
          />
        </map>
      </main>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when aria-hidden=false does not negate aria-hidden true', () => {
    // Note: aria-hidden can't be reset once you've set it to true on an ancestor
    const params = checkSetup(
      '<div id="target" aria-hidden="true"><div aria-hidden="false"><button tabindex="-1">Some button</button></div></div>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when focusable text in shadowDOM', () => {
    // Note:
    // `testUtils.checkSetup` does not work for shadowDOM
    // as `axe._tree` and `axe._selectorData` needs to be updated after shadowDOM construction
    fixtureSetup('<div aria-hidden="true" id="target"></div>`');
    const node = fixture.querySelector('#target');
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<p tabindex="0">btn</p>';
    axe.testUtils.flatTreeSetup(fixture);
    axe._selectorData = axe.utils.getSelectorData(axe._tree);
    const virtualNode = axe.utils.getNodeFromTree(node);
    const actual = check.evaluate.call(checkContext, node, {}, virtualNode);
    assert.isFalse(actual);
  });

  it('returns false when focusable content through tabindex', () => {
    const params = checkSetup(
      '<p id="target" tabindex="0" aria-hidden="true">Some text</p>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when focusable target that cannot be disabled', () => {
    const params = checkSetup(
      '<div aria-hidden="true"><a id="target" href="">foo</a><button>bar</button></div>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when focusable target that can be disabled', () => {
    const params = checkSetup(
      '<div aria-hidden="true"><a href="">foo</a><button id="target">bar</button></div>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true if there is a focusable element and modal is open', () => {
    const params = checkSetup(html`
      <div id="target" aria-hidden="true">
        <a href="">foo</a>
      </div>
      <div role="dialog">Modal</div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns undefined when the control has onfocus', () => {
    const params = checkSetup(
      '<a href="/" aria-hidden="true" id="target" onfocus="redirectFocus()">Link</a>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });

  it('returns undefined when all focusable controls have onfocus events', () => {
    const params = checkSetup(html`
      <div aria-hidden="true" id="target">
        <a href="/" onfocus="redirectFocus()">First link</a>
        <a href="/" onfocus="redirectFocus()">Second link</a>
      </div>
    `);
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });

  it('returns false when some, but not all focusable controls have onfocus events', () => {
    const params = checkSetup(html`
      <div aria-hidden="true" id="target">
        <a href="/" onfocus="redirectFocus()">First link</a>
        <a href="/"">Second link</a>
      </div>
    `);
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('returns undefined when control has 0 width and height and pointer events: none (focus trap bumper)', () => {
    const params = checkSetup(
      '<div id="target" aria-hidden="true" tabindex="0" style="pointer-events: none"></div>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });
});
