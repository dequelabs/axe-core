describe('aria-required-children', () => {
  const fixture = document.getElementById('fixture');
  const shadowSupported = axe.testUtils.shadowSupport.v1;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const requiredChildrenCheck = axe.testUtils.getCheckEvaluate(
    'aria-required-children'
  );

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should detect missing sole required child', () => {
    const params = checkSetup(
      '<div role="list" id="target"><p>Nothing here.</p></div>'
    );

    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['listitem']);
  });

  (shadowSupported ? it : xit)(
    'should detect missing sole required child in shadow tree',
    () => {
      fixture.innerHTML = '<div id="target" role="list"></div>';

      const target = document.querySelector('#target');
      const shadowRoot = target.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p>Nothing here.</p>';

      axe.testUtils.flatTreeSetup(fixture);
      const virtualTarget = axe.utils.getNodeFromTree(target);

      const params = [target, undefined, virtualTarget];
      assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
      assert.deepEqual(checkContext._data, ['listitem']);
    }
  );

  it('should detect multiple missing required children when one required', () => {
    const params = checkSetup(
      '<div role="grid" id="target"><p>Nothing here.</p></div>'
    );

    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['rowgroup', 'row']);
  });

  (shadowSupported ? it : xit)(
    'should detect missing multiple required children in shadow tree when one required',
    () => {
      fixture.innerHTML = '<div role="grid" id="target"></div>';

      const target = document.querySelector('#target');
      const shadowRoot = target.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p>Nothing here.</p>';

      axe.testUtils.flatTreeSetup(fixture);
      const virtualTarget = axe.utils.getNodeFromTree(target);

      const params = [target, undefined, virtualTarget];
      assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
      assert.deepEqual(checkContext._data, ['rowgroup', 'row']);
    }
  );

  it('should pass all existing required children when all required', () => {
    const params = checkSetup(
      `<div id="target" role="menu">
        <li role="none"></li>
        <li role="menuitem">Item 1</li>
        <div role="menuitemradio">Item 2</div>
        <div role="menuitemcheckbox">Item 3</div>
      </div>`
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should return undefined when element is empty and is in reviewEmpty options', () => {
    const params = checkSetup('<div role="list" id="target"></div>', {
      reviewEmpty: ['list']
    });
    assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should return false when children do not have correct role and is in reviewEmpty options', () => {
    const params = checkSetup(
      '<div role="list" id="target"><div role="menuitem"></div></div>',
      { reviewEmpty: ['list'] }
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should return false when owned children do not have correct role and is in reviewEmpty options', () => {
    const params = checkSetup(
      '<div role="list" id="target" aria-owns="ownedchild"></div><div id="ownedchild" role="menuitem"></div>',
      { reviewEmpty: ['list'] }
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail when list does not have required children listitem', () => {
    const params = checkSetup(
      '<div id="target" role="list"><span>Item 1</span></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    assert.deepEqual(checkContext._data, ['listitem']);
  });

  it('should pass when missing required children but aria-busy', () => {
    const params = checkSetup(
      '<div id="target" role="list" aria-busy="true"><span>Item 1</span></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));

    assert.deepEqual(checkContext._data, { messageKey: 'aria-busy' });
  });

  it('should treat aria-busy="false" as not aria-busy', () => {
    const params = checkSetup(
      '<div id="target" role="list" aria-busy="false"><span>Item 1</span></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should treat valueless aria-busy as not aria-busy', () => {
    const params = checkSetup(
      '<div id="target" role="list" aria-busy><span>Item 1</span></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail list with an unallowed child', () => {
    const params = checkSetup(`
      <div id="target" role="list"><div role="tabpanel"></div></div>
    `);
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    assert.deepEqual(checkContext._data, {
      messageKey: 'unallowed',
      values: '[role=tabpanel]'
    });
  });

  it('should fail list with an unallowed child, even if aria-busy="true"', () => {
    const params = checkSetup(`
      <div id="target" role="list" aria-busy="true"><div role="tabpanel"></div></div>
    `);
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    assert.deepEqual(checkContext._data, {
      messageKey: 'unallowed',
      values: '[role=tabpanel]'
    });
  });

  it('should fail when list has intermediate child with role that is not a required role', () => {
    const params = checkSetup(
      '<div id="target" role="list"><div role="tabpanel"><div role="listitem">List item 1</div></div></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    const unallowed = axe.utils.querySelectorAll(
      axe._tree,
      '[role="tabpanel"]'
    )[0];
    assert.deepEqual(checkContext._data, {
      messageKey: 'unallowed',
      values: '[role=tabpanel]'
    });
    assert.deepEqual(checkContext._relatedNodes, [unallowed]);
  });

  it('should fail when list has child with global aria attribute but no role', () => {
    const params = checkSetup(
      '<div id="target" role="list"><div aria-live="polite"><div role="listitem">List item 1</div></div></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    const unallowed = axe.utils.querySelectorAll(
      axe._tree,
      '[aria-live="polite"]'
    )[0];
    assert.deepEqual(checkContext._data, {
      messageKey: 'unallowed',
      values: 'div[aria-live]'
    });
    assert.deepEqual(checkContext._relatedNodes, [unallowed]);
  });

  it('should fail when list has child with tabindex but no role', () => {
    const params = checkSetup(
      '<div id="target" role="list"><div tabindex="0"><div role="listitem">List item 1</div></div></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    const unallowed = axe.utils.querySelectorAll(
      axe._tree,
      '[tabindex="0"]'
    )[0];
    assert.deepEqual(checkContext._data, {
      messageKey: 'unallowed',
      values: 'div[tabindex]'
    });
    assert.deepEqual(checkContext._relatedNodes, [unallowed]);
  });

  it('should remove duplicate unallowed selectors', () => {
    const params = checkSetup(`
      <div id="target" role="list">
        <div role="tabpanel"></div>
        <div role="listitem">List item 1</div>
        <div role="tabpanel"></div>
      </div>
    `);
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    assert.deepEqual(checkContext._data, {
      messageKey: 'unallowed',
      values: '[role=tabpanel]'
    });
  });

  it('should pass when list has child with aria-hidden', () => {
    const params = checkSetup(
      '<div id="target" role="list">' +
        '<div aria-hidden="true">Ignore item</div>' +
        '<div role="listitem">List item 1</div>' +
        '</div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass when list has child with aria-hidden and is focusable', () => {
    const params = checkSetup(
      '<div id="target" role="list">' +
        '<div aria-hidden="true" tabindex="0">Ignore item</div>' +
        '<div role="listitem">List item 1</div>' +
        '</div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail when nested child with role row does not have required child role cell', () => {
    const params = checkSetup(
      '<div  role="grid"><div role="row" id="target"><span>Item 1</span></div></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

    assert.includeMembers(checkContext._data, ['cell']);
  });

  it('should pass one indirectly aria-owned child when one required', () => {
    const params = checkSetup(
      '<div role="grid" id="target" aria-owns="r"></div><div id="r"><div role="row">Nothing here.</div></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should not break if aria-owns points to non-existent node', () => {
    const params = checkSetup(
      '<div role="row" id="target" aria-owns="nonexistent"></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass one existing aria-owned child when one required', () => {
    const params = checkSetup(
      '<div role="grid" id="target" aria-owns="r"></div><p id="r" role="row">Nothing here.</p>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail one existing aria-owned child when an intermediate child with role that is not a required role exists', () => {
    const params = checkSetup(
      '<div id="target" role="list" aria-owns="list"></div><div id="list"><div role="tabpanel"><div role="listitem"></div></div></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass one existing required child when one required (has explicit role of tab)', () => {
    const params = checkSetup(
      '<ul id="target" role="tablist"><li role="tab">Tab 1</li><li role="tab">Tab 2</li></ul>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass required child roles (grid contains row, which contains cell)', () => {
    const params = checkSetup(
      '<table id="target" role="grid"><tr role="row"><td role="cell">Item 1</td></tr></table>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass one existing required child when one required', () => {
    const params = checkSetup(
      '<div role="grid" id="target"><p role="row">Nothing here.</p></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass one existing required child when one required because of implicit role', () => {
    const params = checkSetup(
      '<table id="target"><p role="row">Nothing here.</p></table>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass when a child with an implicit role is present', () => {
    const params = checkSetup(
      '<table role="grid" id="target"><tr><td>Nothing here.</td></tr></table>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass direct existing required children', () => {
    const params = checkSetup(
      '<div role="list" id="target"><p role="listitem">Nothing here.</p></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass indirect required children', () => {
    const params = checkSetup(
      '<div role="list" id="target"><p>Just a regular ol p that contains a... <p role="listitem">Nothing here.</p></p></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should return true when a role has no required owned', () => {
    const params = checkSetup(
      '<div role="listitem" id="target"><p>Nothing here.</p></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass when role allows group and group has required child', () => {
    const params = checkSetup(
      '<div role="menu" id="target"><ul role="group"><li role="menuitem">Menuitem</li></ul></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should ignore hidden children inside the group', () => {
    const params = checkSetup(`
      <div role="menu" id="target">
        <ul role="group">
          <li style="display: none">hidden</li>
          <li aria-hidden="true">hidden</li>
          <li style="visibility: hidden" aria-hidden="true">hidden</li>
          <li role="menuitem">Menuitem</li>
        </ul>
      </div>
    `);
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail when role allows group and group does not have required child', () => {
    const params = checkSetup(
      '<div role="menu" id="target"><ul role="group"><li>Menuitem</li></ul></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail when role does not allow group', () => {
    const params = checkSetup(
      '<div role="list" id="target"><ul role="group"><li role="listitem">Item</li></ul></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should pass when role allows rowgroup and rowgroup has required child', () => {
    const params = checkSetup(
      '<div role="table" id="target"><ul role="rowgroup"><li role="row">Row</li></ul></div>'
    );
    assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail when role allows rowgroup and rowgroup does not have required child', () => {
    const params = checkSetup(
      '<div role="table" id="target"><ul role="rowgroup"><li>Row</li></ul></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  it('should fail when role does not allow rowgroup', () => {
    const params = checkSetup(
      '<div role="listbox" id="target"><ul role="rowgroup"><li role="option">Option</li></ul></div>'
    );
    assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
  });

  describe('options', () => {
    it('should not throw when options is incorrect', () => {
      const params = checkSetup('<div role="row" id="target"></div>');

      // Options: (incorrect)
      params[1] = ['menu'];
      assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

      // Options: (incorrect)
      params[1] = null;
      assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

      // Options: (incorrect)
      params[1] = 'menu';
      assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
    });

    describe('reviewEmpty', () => {
      it('should return undefined instead of false when the role is in options.reviewEmpty', () => {
        const params = checkSetup('<div role="grid" id="target"></div>', {
          reviewEmpty: []
        });
        assert.isFalse(requiredChildrenCheck.apply(checkContext, params));

        // Options:
        params[1] = {
          reviewEmpty: ['grid']
        };
        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return true if aria-busy preempts a reviewEmpty case', () => {
        const params = checkSetup(
          '<div role="grid" id="target" aria-busy="true"></div>',
          { reviewEmpty: ['grid'] }
        );
        assert.isTrue(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return undefined when the element has empty children', () => {
        const params = checkSetup(
          '<div role="listbox" id="target"><div></div></div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return false when the element has empty child with role', () => {
        const params = checkSetup(
          '<div role="listbox" id="target"><div role="grid"></div></div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return undefined when there is a empty text node', () => {
        const params = checkSetup(
          '<div role="listbox" id="target"> &nbsp; <!-- empty --> \n\t </div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return false when there is a non-empty text node', () => {
        const params = checkSetup(
          '<div role="listbox" id="target">  hello  </div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return undefined when the element has empty child with role=presentation', () => {
        const params = checkSetup(
          '<div role="listbox" id="target"><div role="presentation"></div></div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return false when role=none child has visible content', () => {
        const params = checkSetup(
          '<div role="listbox" id="target"><div role="none">hello</div></div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isFalse(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return undefined when role=none child has hidden content', () => {
        const params = checkSetup(
          `<div role="listbox" id="target">
            <div role="none">
              <h1 style="display:none">hello</h1>
              <h1 aria-hidden="true">hello</h1>
              <h1 style="visibility:hidden" aria-hidden="true">hello</h1>
            </div>
          </div>`,
          { reviewEmpty: ['listbox'] }
        );

        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return undefined when the element has empty child with role=none', () => {
        const params = checkSetup(
          '<div role="listbox" id="target"><div role="none"></div></div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return undefined when the element has hidden children', () => {
        const params = checkSetup(
          `<div role="menu" id="target">
            <div role="menuitem" hidden></div>
            <div role="none" hidden></div>
            <div role="list" hidden></div>
          </div>`,
          { reviewEmpty: ['menu'] }
        );
        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });

      it('should return undefined when the element has empty child and aria-label', () => {
        const params = checkSetup(
          '<div role="listbox" id="target" aria-label="listbox"><div></div></div>',
          { reviewEmpty: ['listbox'] }
        );
        assert.isUndefined(requiredChildrenCheck.apply(checkContext, params));
      });
    });
  });
});
