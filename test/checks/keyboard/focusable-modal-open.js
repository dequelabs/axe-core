describe('focusable-modal-open', () => {
  const html = axe.testUtils.html;

  let check;
  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;

  before(() => {
    check = checks['focusable-modal-open'];
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
    checkContext.reset();
  });

  it('returns true when no modal is open', () => {
    const params = checkSetup(html`
      <div id="target" aria-hidden="true">
        <button>Some button</button>
      </div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns undefined if a modal is open', () => {
    const params = checkSetup(html`
      <div id="target" aria-hidden="true">
        <button>Some button</button>
      </div>
      <div role="dialog">Modal</div>
    `);
    const actual = check.evaluate.apply(checkContext, params);
    assert.isUndefined(actual);
  });

  it('sets the tabbable elements as related nodes', () => {
    const params = checkSetup(html`
      <div id="target" aria-hidden="true">
        <button>Some button</button>
      </div>
      <div role="dialog">Modal</div>
    `);
    check.evaluate.apply(checkContext, params);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('button'))
    );
  });
});
