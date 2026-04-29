describe('aria-required-parent', () => {
  const { fixture, MockCheckContext, checkSetup, getCheckEvaluate } =
    axe.testUtils;
  const checkEvaluate = getCheckEvaluate('aria-required-parent');
  const checkContext = MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should detect missing required parent', () => {
    const params = checkSetup(
      '<div><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['list']);
  });

  it('should detect missing required parent across shadow boundary', () => {
    fixture.innerHTML = '<div id="target"></div>';

    const shadowRoot = document
      .querySelector('#target')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

    axe.testUtils.flatTreeSetup(fixture);
    const shadowContent = shadowRoot.querySelector('#target');
    const virtualTarget = axe.utils.getNodeFromTree(shadowContent);

    const params = [shadowContent, undefined, virtualTarget];
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['list']);
  });

  it('should pass when required parent is present in an ancestral aria-owns context', () => {
    const snippet =
      '<div role="list"><div aria-owns="parent"></div></div>' +
      '<div id="parent"><p role="listitem" id="target">Nothing here.</p></div>';
    const params = checkSetup(snippet);
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should fail when wrong role is present in an aria-owns context', () => {
    const params = checkSetup(
      '<div role="menu"><div aria-owns="target"></div></div>' +
        '<div><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['list']);
  });

  it('should pass when required parent is present in an aria-owns context', () => {
    const params = checkSetup(
      '<div role="list" aria-owns="target"></div><div><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should pass when at least one required parent of multiple is present', () => {
    const params = checkSetup(
      '<div role="grid"><p role="row" id="target">Nothing here.</p></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should pass when required parent is present', () => {
    const params = checkSetup(
      '<div role="list"><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should fail when there is an intermediate role between the child and parent', () => {
    const params = checkSetup(
      '<div role="list"><div role="tabpanel"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should pass when intermediate node is role=presentation', () => {
    const params = checkSetup(
      '<div role="list"><div role="presentation"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should pass when intermediate node is role=group and required parent is present', () => {
    const params = checkSetup(
      '<ul role="menu"><li role="group"><button role="menuitem" id="target">Nothing here.</button></li></ul>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should fail when intermediate node is role=group but required parent is missing', () => {
    const params = checkSetup(
      '<ul role="none"><li role="group"><button role="menuitem" id="target">Nothing here.</button></li></ul>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['menu', 'menubar']);
  });

  it('should fail when intermediate node is role=group but this not an allowed context', () => {
    const params = checkSetup(
      '<div role="menu"><div role="group"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  describe('group with ownGroupRoles', () => {
    it('should pass when the role and grand parent role is in ownGroupRoles', () => {
      const params = checkSetup(
        '<div role="tree">' +
          '<div role="treeitem">' +
          '<div role="group">' +
          '<div role="treeitem" id="target">' +
          '</div></div></div></div>',
        {
          ownGroupRoles: ['treeitem']
        }
      );

      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should fail when the role and grand parent role is in ownGroupRoles', () => {
      const params = checkSetup(
        '<div role="menu">' +
          '<div role="menuitem">' +
          '<div role="group">' +
          '<div role="menuitem" id="target">' +
          '</div></div></div></div>',
        {
          ownGroupRoles: ['listitem']
        }
      );

      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('should fail when the role is not in a group', () => {
      const params = checkSetup(
        '<div role="list">' +
          '<div role="listitem">' +
          '<div role="none">' +
          '<div role="listitem" id="target">' +
          '</div></div></div></div>',
        {
          ownGroupRoles: ['listitem']
        }
      );

      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });
  });

  it('should pass when intermediate node is role=none', () => {
    const params = checkSetup(
      '<div role="list"><div role="none"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should pass when intermediate node is not owned by parent', () => {
    const params = checkSetup(
      '<div role="list" aria-owns="target"><div role="navigation"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should pass for multiple group and presentational roles', () => {
    const params = checkSetup(
      '<div role="tree"><div role="none"><div role="group"><div role="none"><div role="group"><div role="treeitem" id="target">Nothing here.</div></div></div></div></div></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should pass when required parent is present across shadow boundary', () => {
    fixture.innerHTML = '<div role="list" id="parent"></div>';

    const shadowRoot = document
      .querySelector('#parent')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

    axe.testUtils.flatTreeSetup(fixture);
    const shadowContent = shadowRoot.querySelector('#target');
    const virtualTarget = axe.utils.getNodeFromTree(shadowContent);

    const params = [shadowContent, undefined, virtualTarget];
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should fail when aria-owns context crosses shadow boundary', () => {
    fixture.innerHTML =
      '<div id="parent"><div role="list" aria-owns="target"></div></div>';

    const shadowRoot = document
      .querySelector('#parent')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

    axe.testUtils.flatTreeSetup(fixture);
    const shadowContent = shadowRoot.querySelector('#target');
    const virtualTarget = axe.utils.getNodeFromTree(shadowContent);

    const params = [shadowContent, undefined, virtualTarget];
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  describe('ElementInternals', () => {
    it('should allow element with required internals role', () => {
      const params = checkSetup(
        '<testutils-element with-role="list"><p role="listitem" id="target">Nothing here.</p></testutils-element>'
      );

      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('should detect missing required parent', () => {
      const params = checkSetup(
        '<testutils-element><p role="listitem" id="target">Nothing here.</p></testutils-element>'
      );
      assert.isFalse(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, ['list']);
    });
  });
});
