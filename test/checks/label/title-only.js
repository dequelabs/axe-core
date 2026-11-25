describe('title-only', () => {
  const checkSetup = axe.testUtils.checkSetup;
  const html = axe.testUtils.html;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('title-only');
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should return true if an element only has a title', () => {
    const node = document.createElement('input');
    node.type = 'text';
    node.title = 'Duplicate';

    fixture.appendChild(node);

    axe.testUtils.flatTreeSetup(fixture);

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('title-only')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
    node.setAttribute('aria-label', 'woop');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('title-only')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if an element only has aria-describedby', () => {
    const node = document.createElement('input');
    node.type = 'text';
    node.setAttribute('aria-describedby', 'dby');
    const dby = document.createElement('div');
    dby.id = 'dby';
    dby.innerHTML = 'woop';

    fixture.appendChild(node);
    fixture.appendChild(dby);

    axe.testUtils.flatTreeSetup(fixture);

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('title-only')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
    node.setAttribute('aria-label', 'woop');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('title-only')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if aria-describedby is empty and there is no title or label', () => {
    const node = document.createElement('input');
    node.type = 'text';
    node.setAttribute('aria-describedby', '');

    fixture.appendChild(node);

    axe.testUtils.flatTreeSetup(fixture);

    assert.isFalse(
      checkEvaluate(node, undefined, axe.utils.getNodeFromTree(node))
    );
  });

  // https://github.com/dequelabs/axe-core/issues/5014
  // A visible label is only needed when the form control itself is visible.
  it('should return false if the element is visually hidden', () => {
    const params = checkSetup(html`
      <div
        id="label"
        style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0)"
      >
        Upload a file
      </div>
      <span id="hint">Max 5 MB</span>
      <input
        type="file"
        id="target"
        aria-labelledby="label"
        aria-describedby="hint"
        style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0"
      />
    `);
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('should return true if the element is visible and its label is visually hidden', () => {
    const params = checkSetup(html`
      <div
        id="label"
        style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0)"
      >
        Upload a file
      </div>
      <span id="hint">Max 5 MB</span>
      <input
        type="file"
        id="target"
        aria-labelledby="label"
        aria-describedby="hint"
      />
    `);
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  describe('ElementInternals', () => {
    it('should return true if an element only has elementInternals aria-describedby', () => {
      const params = checkSetup(html`
        <div id="dby">description</div>
        <testutils-element
          id="target"
          with-aria-describedby="dby"
        ></testutils-element>
      `);
      assert.isTrue(checkEvaluate.apply(null, params));
    });
  });
});
