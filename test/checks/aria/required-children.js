describe('aria-required-children', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should detect missing sole required child', function () {
    var params = checkSetup(
      '<div role="list" id="target"><p>Nothing here.</p></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
    assert.deepEqual(checkContext._data, ['group', 'listitem']);
  });

  (shadowSupported ? it : xit)(
    'should detect missing sole required child in shadow tree',
    function () {
      fixture.innerHTML = '<div id="target" role="list"></div>';

      var target = document.querySelector('#target');
      var shadowRoot = target.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p>Nothing here.</p>';

      axe.testUtils.flatTreeSetup(fixture);
      var virtualTarget = axe.utils.getNodeFromTree(target);

      var params = [target, undefined, virtualTarget];
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
      assert.deepEqual(checkContext._data, ['group', 'listitem']);
    }
  );

  it('should detect multiple missing required children when one required', function () {
    var params = checkSetup(
      '<div role="grid" id="target"><p>Nothing here.</p></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
    assert.deepEqual(checkContext._data, ['rowgroup', 'row']);
  });

  (shadowSupported ? it : xit)(
    'should detect missing multiple required children in shadow tree when one required',
    function () {
      fixture.innerHTML = '<div role="grid" id="target"></div>';

      var target = document.querySelector('#target');
      var shadowRoot = target.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p>Nothing here.</p>';

      axe.testUtils.flatTreeSetup(fixture);
      var virtualTarget = axe.utils.getNodeFromTree(target);

      var params = [target, undefined, virtualTarget];
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
      assert.deepEqual(checkContext._data, ['rowgroup', 'row']);
    }
  );

  it('should pass all existing required children when all required', function () {
    var params = checkSetup(
      '<div id="target" role="menu"><li role="none"></li><li role="menuitem">Item 1</li><div role="menuitemradio">Item 2</div><div role="menuitemcheckbox">Item 3</div></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should return undefined when element is empty and is in reviewEmpty options', function () {
    var params = checkSetup('<div role="list" id="target"></div>', {
      reviewEmpty: ['list']
    });
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should return false when children do not have correct role and is in reviewEmpty options', function () {
    var params = checkSetup(
      '<div role="list" id="target"><div role="menuitem"></div></div>',
      { reviewEmpty: ['list'] }
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should return false when owned children do not have correct role and is in reviewEmpty options', function () {
    var params = checkSetup(
      '<div role="list" id="target" aria-owns="ownedchild"></div><div id="ownedchild" role="menuitem"></div>',
      { reviewEmpty: ['list'] }
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should fail when list does not have required children listitem', function () {
    var params = checkSetup(
      '<div id="target" role="list"><span>Item 1</span></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );

    assert.deepEqual(checkContext._data, ['group', 'listitem']);
  });

  it('should fail when list has intermediate child with role that is not a required role', function () {
    var params = checkSetup(
      '<div id="target" role="list"><div role="tabpanel"><div role="listitem">List item 1</div></div></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );

    var unallowed = axe.utils.querySelectorAll(
      axe._tree,
      '[role="tabpanel"]'
    )[0];
    assert.deepEqual(checkContext._data, { messageKey: 'unallowed' });
    assert.deepEqual(checkContext._relatedNodes, [unallowed]);
  });

  it('should fail when list has child with global aria attribute but no role', function () {
    var params = checkSetup(
      '<div id="target" role="list"><div aria-live="polite"><div role="listitem">List item 1</div></div></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );

    var unallowed = axe.utils.querySelectorAll(
      axe._tree,
      '[aria-live="polite"]'
    )[0];
    assert.deepEqual(checkContext._data, { messageKey: 'unallowed' });
    assert.deepEqual(checkContext._relatedNodes, [unallowed]);
  });

  it('should fail when list has child with tabindex but no role', function () {
    var params = checkSetup(
      '<div id="target" role="list"><div tabindex="0"><div role="listitem">List item 1</div></div></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );

    var unallowed = axe.utils.querySelectorAll(axe._tree, '[tabindex="0"]')[0];
    assert.deepEqual(checkContext._data, { messageKey: 'unallowed' });
    assert.deepEqual(checkContext._relatedNodes, [unallowed]);
  });

  it('should fail when nested child with role row does not have required child role cell', function () {
    var params = checkSetup(
      '<div  role="grid"><div role="row" id="target"><span>Item 1</span></div></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );

    assert.includeMembers(checkContext._data, ['cell']);
  });

  it('should pass one indirectly aria-owned child when one required', function () {
    var params = checkSetup(
      '<div role="grid" id="target" aria-owns="r"></div><div id="r"><div role="row">Nothing here.</div></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should not break if aria-owns points to non-existent node', function () {
    var params = checkSetup(
      '<div role="grid" id="target" aria-owns="nonexistent"></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass one existing aria-owned child when one required', function () {
    var params = checkSetup(
      '<div role="grid" id="target" aria-owns="r"></div><p id="r" role="row">Nothing here.</p>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should fail one existing aria-owned child when an intermediate child with role that is not a required role exists', function () {
    var params = checkSetup(
      '<div id="target" role="list" aria-owns="list"></div><div id="list"><div role="tabpanel"><div role="listitem"></div></div></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass one existing required child when one required (has explicit role of tab)', function () {
    var params = checkSetup(
      '<ul id="target" role="tablist"><li role="tab">Tab 1</li><li role="tab">Tab 2</li></ul>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass required child roles (grid contains row, which contains cell)', function () {
    var params = checkSetup(
      '<table id="target" role="grid"><tr role="row"><td role="cell">Item 1</td></tr></table>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass one existing required child when one required', function () {
    var params = checkSetup(
      '<div role="grid" id="target"><p role="row">Nothing here.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass one existing required child when one required because of implicit role', function () {
    var params = checkSetup(
      '<table id="target"><p role="row">Nothing here.</p></table>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass when a child with an implicit role is present', function () {
    var params = checkSetup(
      '<table role="grid" id="target"><tr><td>Nothing here.</td></tr></table>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass direct existing required children', function () {
    var params = checkSetup(
      '<div role="list" id="target"><p role="listitem">Nothing here.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass indirect required children', function () {
    var params = checkSetup(
      '<div role="list" id="target"><p>Just a regular ol p that contains a... <p role="listitem">Nothing here.</p></p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should return true when a role has no required owned', function () {
    var params = checkSetup(
      '<div role="listitem" id="target"><p>Nothing here.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass when role allows group and group has required child', function () {
    var params = checkSetup(
      '<div role="menu" id="target"><ul role="group"><li role="menuitem">Menuitem</li></ul></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should fail when role allows group and group does not have required child', function () {
    var params = checkSetup(
      '<div role="menu" id="target"><ul role="group"><li>Menuitem</li></ul></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should fail when role does not allow group', function () {
    var params = checkSetup(
      '<div role="table" id="target"><ul role="group"><li role="row">Option</li></ul></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should pass when role allows rowgroup and rowgroup has required child', function () {
    var params = checkSetup(
      '<div role="table" id="target"><ul role="rowgroup"><li role="row">Row</li></ul></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should fail when role allows rowgroup and rowgroup does not have required child', function () {
    var params = checkSetup(
      '<div role="table" id="target"><ul role="rowgroup"><li>Row</li></ul></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  it('should fail when role does not allow rowgroup', function () {
    var params = checkSetup(
      '<div role="listbox" id="target"><ul role="rowgroup"><li role="option">Option</li></ul></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-children')
        .apply(checkContext, params)
    );
  });

  describe('options', function () {
    it('should return undefined instead of false when the role is in options.reviewEmpty', function () {
      var params = checkSetup('<div role="grid" id="target"></div>', {
        reviewEmpty: []
      });
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );

      // Options:
      params[1] = {
        reviewEmpty: ['grid']
      };
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
    });

    it('should not throw when options is incorrect', function () {
      var params = checkSetup('<div role="menu" id="target"></div>');

      // Options: (incorrect)
      params[1] = ['menu'];
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );

      // Options: (incorrect)
      params[1] = null;
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );

      // Options: (incorrect)
      params[1] = 'menu';
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
    });

    it('should return undefined when the element has empty children', function () {
      var params = checkSetup(
        '<div role="listbox" id="target"><div></div></div>'
      );
      params[1] = {
        reviewEmpty: ['listbox']
      };
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
    });

    it('should return false when the element has empty child with role', function () {
      var params = checkSetup(
        '<div role="listbox" id="target"><div role="grid"></div></div>'
      );
      params[1] = {
        reviewEmpty: ['listbox']
      };
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
    });

    it('should return undefined when the element has empty child with role=presentation', function () {
      var params = checkSetup(
        '<div role="listbox" id="target"><div role="presentation"></div></div>'
      );
      params[1] = {
        reviewEmpty: ['listbox']
      };
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
    });

    it('should return undefined when the element has empty child with role=none', function () {
      var params = checkSetup(
        '<div role="listbox" id="target"><div role="none"></div></div>'
      );
      params[1] = {
        reviewEmpty: ['listbox']
      };
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
    });

    it('should return undefined when the element has empty child and aria-label', function () {
      var params = checkSetup(
        '<div role="listbox" id="target" aria-label="listbox"><div></div></div>'
      );
      params[1] = {
        reviewEmpty: ['listbox']
      };
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-required-children')
          .apply(checkContext, params)
      );
    });
  });
});
