describe('duplicate-img-label', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should return false if no text is present', () => {
    fixture.innerHTML = '<button><img id="target" alt="Plain text"></button>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    const result = axe.testUtils.getCheckEvaluate('duplicate-img-label')(
      node,
      undefined,
      axe.utils.getNodeFromTree(node)
    );
    assert.isFalse(result);
  });

  it('should return false if aria-label duplicates img alt', () => {
    fixture.innerHTML =
      '<button aria-label="Plain text"><img id="target" alt="Plain text"></button>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img and text have different text', () => {
    fixture.innerHTML =
      '<button><img id="target" alt="Alt text">Plain text</button>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if img and text have the same text', () => {
    fixture.innerHTML =
      '<button><img id="target" alt="Plain text">Plain text</button>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if img has ARIA label with the same text', () => {
    fixture.innerHTML =
      '<button><img id="target" aria-label="Plain text">Plain text</button>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img and text are both blank', () => {
    fixture.innerHTML = '<button><img id="target" alt=""></button>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img and text have superset/subset text', () => {
    fixture.innerHTML =
      '<button><img id="target" alt="Plain text and more">Plain text</button>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img does not have required parent', () => {
    fixture.innerHTML =
      '<main><img id="target" alt="Plain text and more"><p>Plain text</p></main>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should support options.parentSelector', () => {
    fixture.innerHTML =
      '<div aria-label="Plain text"><img id="target" alt="Plain text"></div>';
    const node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        { parentSelector: 'div' },
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if the img is part of a shadow tree', () => {
    const button = document.createElement('div');
    button.setAttribute('role', 'button');
    button.innerHTML = 'My button';
    const shadow = button.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<slot></slot><img id="target" alt="My button">';
    fixture.appendChild(button);
    axe.testUtils.flatTreeSetup(fixture);
    const node = shadow.querySelector('#target');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if the img is a slotted element', () => {
    const button = document.createElement('div');
    button.setAttribute('role', 'button');
    button.innerHTML = '<img id="target" alt="My button">';
    const shadow = button.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<span>My button</span> <slot></slot>';

    fixture.appendChild(button);
    axe.testUtils.flatTreeSetup(fixture);
    const node = button.querySelector('#target');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if the shadow img has a different text', () => {
    const button = document.createElement('div');
    button.setAttribute('role', 'button');
    button.innerHTML = 'My button';
    const shadow = button.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<slot></slot><img alt="My image">';
    const checkArgs = checkSetup(button);

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('duplicate-img-label')
        .apply(null, checkArgs)
    );
  });
});
