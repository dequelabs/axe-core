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

    const labelledNode = document.createElement('input');
    labelledNode.type = 'text';
    labelledNode.title = 'Duplicate';
    labelledNode.setAttribute('aria-label', 'woop');

    fixture.appendChild(node);
    fixture.appendChild(labelledNode);

    axe.testUtils.flatTreeSetup(fixture);

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('title-only')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('title-only')(
        labelledNode,
        undefined,
        axe.utils.getNodeFromTree(labelledNode)
      )
    );
  });

  it('should return true if an element only has aria-describedby', () => {
    const node = document.createElement('input');
    node.type = 'text';
    node.setAttribute('aria-describedby', 'dby');

    const labelledNode = document.createElement('input');
    labelledNode.type = 'text';
    labelledNode.setAttribute('aria-describedby', 'dby');
    labelledNode.setAttribute('aria-label', 'woop');

    const dby = document.createElement('div');
    dby.id = 'dby';
    dby.innerHTML = 'woop';

    fixture.appendChild(node);
    fixture.appendChild(labelledNode);
    fixture.appendChild(dby);

    axe.testUtils.flatTreeSetup(fixture);

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('title-only')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('title-only')(
        labelledNode,
        undefined,
        axe.utils.getNodeFromTree(labelledNode)
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
