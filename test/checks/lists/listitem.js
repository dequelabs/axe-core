describe('listitem', function () {
  'use strict';

  var shadowSupport = axe.testUtils.shadowSupport;
  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('listitem');

  afterEach(function () {
    checkContext.reset();
  });

  it('should pass if the listitem has a parent <ol>', function () {
    var params = checkSetup('<ol><li id="target">My list item</li></ol>');
    var result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ul>', function () {
    var params = checkSetup('<ul><li id="target">My list item</li></ul>');
    var result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=list', function () {
    var params = checkSetup(
      '<div role="list"><li id="target">My list item</li></div>'
    );
    var result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=none', function () {
    var params = checkSetup(
      '<ul role="none"><li id="target">My list item</li></ul>'
    );
    var result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=presentation', function () {
    var params = checkSetup(
      '<ul role="presentation"><li id="target">My list item</li></ul>'
    );
    var result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should fail if the listitem has an incorrect parent', function () {
    var params = checkSetup('<div><li id="target">My list item</li></div>');
    var result = checkEvaluate.apply(checkContext, params);
    assert.isFalse(result);
  });

  it('should fail if the listitem has a parent <ol> with changed role', function () {
    var params = checkSetup(
      '<ol role="menubar"><li id="target">My list item</li></ol>'
    );
    var result = checkEvaluate.apply(checkContext, params);
    assert.isFalse(result);
    assert.equal(checkContext._data.messageKey, 'roleNotValid');
  });

  it('should pass if the listitem has a parent <ol> with an invalid role', function () {
    var params = checkSetup(
      '<ol role="invalid-role"><li id="target">My list item</li></ol>'
    );
    var result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ol> with an abstract role', function () {
    var params = checkSetup(
      '<ol role="section"><li id="target">My list item</li></ol>'
    );
    var result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  (shadowSupport.v1 ? it : xit)(
    'should return true in a shadow DOM pass',
    function () {
      var node = document.createElement('div');
      node.innerHTML = '<li id="target">My list item </li>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<ul><slot></slot></ul>';
      fixtureSetup(node);
      var target = node.querySelector('#target');
      var virtualTarget = axe.utils.getNodeFromTree(target);
      var result = checkEvaluate.apply(checkContext, [
        target,
        {},
        virtualTarget
      ]);
      assert.isTrue(result);
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return false in a shadow DOM fail',
    function () {
      var node = document.createElement('div');
      node.innerHTML = '<li id="target">My list item </li>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div><slot></slot></div>';
      fixtureSetup(node);
      var target = node.querySelector('#target');
      var virtualTarget = axe.utils.getNodeFromTree(target);
      var result = checkEvaluate.apply(checkContext, [
        target,
        {},
        virtualTarget
      ]);
      assert.isFalse(result);
    }
  );

  (shadowSupport.v1 ? describe : describe.skip)(
    'custom elements with shadow DOM',
    function () {
      it('should return true when <li> in custom element shadow DOM is inside a <ul>', function () {
        var item = document.createElement('my-list-item');
        item.attachShadow({ mode: 'open' }).innerHTML =
          '<li><slot></slot></li>';
        item.textContent = 'Item 1';

        var host = document.createElement('div');
        host.appendChild(item);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<ul><slot></slot></ul>';

        fixtureSetup(host);
        var target = item.shadowRoot.querySelector('li');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isTrue(result);
      });

      it('should return false when <li> in custom element shadow DOM is not inside a list', function () {
        var item = document.createElement('my-list-item');
        item.attachShadow({ mode: 'open' }).innerHTML =
          '<li><slot></slot></li>';
        item.textContent = 'Item 1';

        var host = document.createElement('div');
        host.appendChild(item);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<div><slot></slot></div>';

        fixtureSetup(host);
        var target = item.shadowRoot.querySelector('li');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isFalse(result);
      });

      it('should return true when <li> in custom element shadow DOM is inside a role="list"', function () {
        var item = document.createElement('my-list-item');
        item.attachShadow({ mode: 'open' }).innerHTML =
          '<li><slot></slot></li>';
        item.textContent = 'Item 1';

        var host = document.createElement('div');
        host.appendChild(item);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<div role="list"><slot></slot></div>';

        fixtureSetup(host);
        var target = item.shadowRoot.querySelector('li');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isTrue(result);
      });

      it('should return false when custom element has no shadow root', function () {
        var item = document.createElement('my-list-item');
        item.innerHTML = '<li id="target">Item 1</li>';

        var host = document.createElement('div');
        host.appendChild(item);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<ul><slot></slot></ul>';

        fixtureSetup(host);
        var target = item.querySelector('#target');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isFalse(result);
      });

      it('should return true when <li> in custom element shadow DOM is inside a <ol>', function () {
        var item = document.createElement('my-list-item');
        item.attachShadow({ mode: 'open' }).innerHTML =
          '<li><slot></slot></li>';
        item.textContent = 'Item 1';

        var host = document.createElement('div');
        host.appendChild(item);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<ol><slot></slot></ol>';

        fixtureSetup(host);
        var target = item.shadowRoot.querySelector('li');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isTrue(result);
      });

      it('should return false when custom element parent has a non-list role', function () {
        var item = document.createElement('my-list-item');
        item.attachShadow({ mode: 'open' }).innerHTML =
          '<li><slot></slot></li>';
        item.textContent = 'Item 1';

        var host = document.createElement('div');
        host.appendChild(item);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<ul role="menubar"><slot></slot></ul>';

        fixtureSetup(host);
        var target = item.shadowRoot.querySelector('li');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isFalse(result);
      });

      it('should stop walking at a custom element with an explicit role', function () {
        var item = document.createElement('my-list-item');
        item.setAttribute('role', 'listitem');
        item.attachShadow({ mode: 'open' }).innerHTML =
          '<li><slot></slot></li>';
        item.textContent = 'Item 1';

        var host = document.createElement('div');
        host.appendChild(item);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<div><slot></slot></div>';

        fixtureSetup(host);
        var target = item.shadowRoot.querySelector('li');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isFalse(result);
      });

      it('should return true when <li> is nested inside multiple custom elements', function () {
        var item = document.createElement('my-list-item');
        item.attachShadow({ mode: 'open' }).innerHTML =
          '<li><slot></slot></li>';
        item.textContent = 'Item 1';

        var wrapper = document.createElement('my-wrapper');
        wrapper.attachShadow({ mode: 'open' }).innerHTML = '<slot></slot>';
        wrapper.appendChild(item);

        var host = document.createElement('div');
        host.appendChild(wrapper);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<ul><slot></slot></ul>';

        fixtureSetup(host);
        var target = item.shadowRoot.querySelector('li');
        var virtualTarget = axe.utils.getNodeFromTree(target);
        var result = checkEvaluate.apply(checkContext, [
          target,
          {},
          virtualTarget
        ]);
        assert.isTrue(result);
      });
    }
  );
});
