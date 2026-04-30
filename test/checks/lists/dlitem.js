describe('dlitem', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should pass if the dlitem has a parent <dl>', () => {
    const checkArgs = checkSetup('<dl><dt id="target">My list item</dt></dl>');

    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has an incorrect parent', () => {
    const checkArgs = checkSetup(
      '<video><dt id="target">My list item</dt></video>'
    );

    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with role="list"', () => {
    const checkArgs = checkSetup(
      '<dl role="list"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with role="presentation"', () => {
    const checkArgs = checkSetup(
      '<dl role="presentation"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has a parent <dl> with a changed role', () => {
    const checkArgs = checkSetup(
      '<dl role="menubar"><dt id="target">My list item<</dt>/dl>'
    );
    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with an abstract role', () => {
    const checkArgs = checkSetup(
      '<dl role="section"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with an invalid role', () => {
    const checkArgs = checkSetup(
      '<dl role="invalid-role"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has a parent <dl> with a changed role', () => {
    const checkArgs = checkSetup(
      '<dl role="menubar"><dt id="target">My list item</dt></dl>'
    );
    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('returns true if the dd/dt is in a div with a dl as grandparent', () => {
    const nodeNames = ['dd', 'dt'];
    nodeNames.forEach(nodeName => {
      const checkArgs = checkSetup(
        html`<dl><div><${nodeName} id="target">My list item</${nodeName}></div></dl>`
      );
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  it('returns false if the dd/dt is in a div with a role with a dl as grandparent with a list role', () => {
    const nodeNames = ['dd', 'dt'];
    nodeNames.forEach(nodeName => {
      const checkArgs = checkSetup(
        html`<dl><div role="list"><${nodeName} id="target">My list item</${nodeName}></div></dl>`
      );
      assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  it('returns false if the dd/dt is in a div[role=presentation] with a dl as grandparent', () => {
    const nodeNames = ['dd', 'dt'];
    nodeNames.forEach(nodeName => {
      const checkArgs = checkSetup(
        html`<dl><div role="presentation"><${nodeName} id="target">My list item</${nodeName}></div></dl>`
      );
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  it('returns false if the dd/dt is in a div[role=none] with a dl as grandparent', () => {
    const nodeNames = ['dd', 'dt'];
    nodeNames.forEach(nodeName => {
      const checkArgs = checkSetup(
        html`<dl><div role="none"><${nodeName} id="target">My list item</${nodeName}></div></dl>`
      );
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  it('should return true in a shadow DOM pass', () => {
    const node = document.createElement('div');
    node.innerHTML = '<dt>My list item </dt>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<dl><slot></slot></dl>';

    const checkArgs = checkSetup(node, 'dt');
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should return false in a shadow DOM fail', () => {
    const node = document.createElement('div');
    node.innerHTML = '<dt>My list item </dt>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div><slot></slot></div>';

    const checkArgs = checkSetup(node, 'dt');
    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should return true when the item is grouped in dl > div in a shadow DOM', () => {
    const node = document.createElement('div');
    node.innerHTML = '<dt>My list item </dt>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<dl><div><slot></slot></div></dl>';

    const checkArgs = checkSetup(node, 'dt');
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });
});
