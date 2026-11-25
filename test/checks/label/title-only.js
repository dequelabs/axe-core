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

  it('should return false if aria-describedby references a missing element', () => {
    const params = checkSetup(html`
      <input id="target" type="text" aria-describedby="missing" />
    `);
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('should return false if aria-describedby references an empty element', () => {
    const params = checkSetup(html`
      <input id="target" type="text" aria-describedby="dby" />
      <div id="dby"></div>
    `);
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('should return true if an element only has aria-description', () => {
    const params = checkSetup(html`
      <input id="target" type="text" aria-description="woop" />
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
