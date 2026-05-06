describe('aria-required-parent', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  it('should detect missing required parent', function () {
    var params = checkSetup(
      '<div><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
    assert.deepEqual(checkContext._data, ['list']);
  });

  (shadowSupported ? it : xit)(
    'should detect missing required parent across shadow boundary',
    function () {
      fixture.innerHTML = '<div id="target"></div>';

      var shadowRoot = document
        .querySelector('#target')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

      axe.testUtils.flatTreeSetup(fixture);
      var shadowContent = shadowRoot.querySelector('#target');
      var virtualTarget = axe.utils.getNodeFromTree(shadowContent);

      var params = [shadowContent, undefined, virtualTarget];
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-parent')
          .apply(checkContext, params)
      );
      assert.deepEqual(checkContext._data, ['list']);
    }
  );

  it('should pass when required parent is present in an ancestral aria-owns context', function () {
    var snippet =
      '<div role="list"><div aria-owns="parent"></div></div>' +
      '<div id="parent"><p role="listitem" id="target">Nothing here.</p></div>';
    var params = checkSetup(snippet);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should fail when wrong role is present in an aria-owns context', function () {
    var params = checkSetup(
      '<div role="menu"><div aria-owns="target"></div></div>' +
        '<div><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
    assert.deepEqual(checkContext._data, ['list']);
  });

  it('should pass when required parent is present in an aria-owns context', function () {
    var params = checkSetup(
      '<div role="list" aria-owns="target"></div><div><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should pass when at least one required parent of multiple is present', function () {
    var params = checkSetup(
      '<div role="grid"><p role="row" id="target">Nothing here.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should pass when required parent is present', function () {
    var params = checkSetup(
      '<div role="list"><p role="listitem" id="target">Nothing here.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should fail when there is an intermediate role between the child and parent', function () {
    var params = checkSetup(
      '<div role="list"><div role="tabpanel"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should pass when intermediate node is role=presentation', function () {
    var params = checkSetup(
      '<div role="list"><div role="presentation"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should pass when intermediate node is role=group and required parent is present', function () {
    var params = checkSetup(
      '<ul role="menu"><li role="group"><button role="menuitem" id="target">Nothing here.</button></li></ul>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should fail when intermediate node is role=group but required parent is missing', function () {
    var params = checkSetup(
      '<ul role="none"><li role="group"><button role="menuitem" id="target">Nothing here.</button></li></ul>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
    assert.deepEqual(checkContext._data, ['menu', 'menubar']);
  });

  it('should fail when intermediate node is role=group but this not an allowed context', function () {
    var params = checkSetup(
      '<div role="menu"><div role="group"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  describe('group with ownGroupRoles', function () {
    it('should pass when the role and grand parent role is in ownGroupRoles', function () {
      var params = checkSetup(
        '<div role="tree">' +
          '<div role="treeitem">' +
          '<div role="group">' +
          '<div role="treeitem" id="target">' +
          '</div></div></div></div>',
        {
          ownGroupRoles: ['treeitem']
        }
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-required-parent')
          .apply(checkContext, params)
      );
    });

    it('should fail when the role and grand parent role is in ownGroupRoles', function () {
      var params = checkSetup(
        '<div role="menu">' +
          '<div role="menuitem">' +
          '<div role="group">' +
          '<div role="menuitem" id="target">' +
          '</div></div></div></div>',
        {
          ownGroupRoles: ['listitem']
        }
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-parent')
          .apply(checkContext, params)
      );
    });

    it('should fail when the role is not in a group', function () {
      var params = checkSetup(
        '<div role="list">' +
          '<div role="listitem">' +
          '<div role="none">' +
          '<div role="listitem" id="target">' +
          '</div></div></div></div>',
        {
          ownGroupRoles: ['listitem']
        }
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-parent')
          .apply(checkContext, params)
      );
    });
  });

  it('should pass when intermediate node is role=none', function () {
    var params = checkSetup(
      '<div role="list"><div role="none"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should pass when intermediate node is not owned by parent', function () {
    var params = checkSetup(
      '<div role="list" aria-owns="target"><div role="navigation"><p role="listitem" id="target">Nothing here.</p></div></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  it('should pass for multiple group and presentational roles', function () {
    var params = checkSetup(
      '<div role="tree"><div role="none"><div role="group"><div role="none"><div role="group"><div role="treeitem" id="target">Nothing here.</div></div></div></div></div></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-parent')
        .apply(checkContext, params)
    );
  });

  (shadowSupported ? it : xit)(
    'should pass when required parent is present across shadow boundary',
    function () {
      fixture.innerHTML = '<div role="list" id="parent"></div>';

      var shadowRoot = document
        .querySelector('#parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

      axe.testUtils.flatTreeSetup(fixture);
      var shadowContent = shadowRoot.querySelector('#target');
      var virtualTarget = axe.utils.getNodeFromTree(shadowContent);

      var params = [shadowContent, undefined, virtualTarget];
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-required-parent')
          .apply(checkContext, params)
      );
    }
  );

  (shadowSupported ? it : xit)(
    'should fail when aria-owns context crosses shadow boundary',
    function () {
      fixture.innerHTML =
        '<div id="parent"><div role="list" aria-owns="target"></div></div>';

      var shadowRoot = document
        .querySelector('#parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

      axe.testUtils.flatTreeSetup(fixture);
      var shadowContent = shadowRoot.querySelector('#target');
      var virtualTarget = axe.utils.getNodeFromTree(shadowContent);

      var params = [shadowContent, undefined, virtualTarget];
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-parent')
          .apply(checkContext, params)
      );
    }
  );
});
