describe('valid-scrollable-semantics', () => {
  const fixture = document.getElementById('fixture');
  const flatTreeSetup = axe.testUtils.flatTreeSetup;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext._data = null;
  });

  it('should return false for role=banner', () => {
    const node = document.createElement('div');
    node.setAttribute('role', '"banner');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return false for role=search', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'search');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=form', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'form');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=navigation', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'navigation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=complementary', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'complementary');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=contentinfo', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'contentinfo');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=main', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'main');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=region', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'region');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=alertdialog', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'alertdialog');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=article', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'article');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=dialog', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'dialog');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for nav elements', () => {
    const node = document.createElement('nav');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for section elements', () => {
    const node = document.createElement('section');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for article elements', () => {
    const node = document.createElement('article');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for aside elements', () => {
    const node = document.createElement('aside');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=tabpanel', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'tabpanel');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=tooltip', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'tooltip');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  describe('options', () => {
    it('should allow options.roles to return true for role', () => {
      const node = document.createElement('div');
      node.setAttribute('role', 'banner');
      fixture.appendChild(node);
      flatTreeSetup(fixture);
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('valid-scrollable-semantics')
          .call(checkContext, node, { roles: ['banner'] })
      );
    });
  });
});
