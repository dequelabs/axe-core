describe('page-no-duplicate', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkContext = new axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  var check = checks['page-no-duplicate-main'];

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  describe('options.selector', function () {
    it('throws if there is no selector', function () {
      assert.throws(function () {
        var params = checkSetup('<div id="target"></div>', undefined);
        assert.isFalse(check.evaluate.apply(checkContext, params));
      });
    });

    it('should return false if there is more than one element matching the selector', function () {
      var options = { selector: 'main' };
      var params = checkSetup(
        '<div><main id="target"></main><main id="dup"></main></div>',
        options
      );

      assert.isFalse(check.evaluate.apply(checkContext, params));
      assert.deepEqual(
        checkContext._relatedNodes,
        Array.from(fixture.querySelectorAll('#dup'))
      );
    });

    it('should return true if there is only one element matching the selector', function () {
      var options = { selector: 'main' };
      var params = checkSetup('<div role="main" id="target"></div>', options);
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should return true if there are no element matching the selector', function () {
      var options = { selector: 'footer' };
      var params = checkSetup(
        '<div><main id="target"></main><main></main></div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should return true if there is more than one element matching the selector but only one is visible', function () {
      var options = { selector: 'main' };
      var params = checkSetup(
        '<div><main id="target"></main><main id="dup" style="display:none;"></main></div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should return true if there is more than one element matching the selector but only one is visible to screenreaders', function () {
      var options = { selector: 'main' };
      var params = checkSetup(
        '<div><main id="target" aria-hidden="true"></main><main id="dup"></main></div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    (shadowSupported ? it : xit)(
      'should return false if there is a second matching element inside the shadow dom',
      function () {
        var options = { selector: 'main' };
        var div = document.createElement('div');
        div.innerHTML = '<div id="shadow"></div><main id="target"></main>';

        var shadow = div
          .querySelector('#shadow')
          .attachShadow({ mode: 'open' });
        shadow.innerHTML = '<main></main>';
        axe.testUtils.fixtureSetup(div);
        var vNode = axe.utils.querySelectorAll(axe._tree, '#target')[0];

        assert.isFalse(
          check.evaluate.call(checkContext, vNode.actualNode, options, vNode)
        );
        assert.deepEqual(checkContext._relatedNodes, [
          shadow.querySelector('main')
        ]);
      }
    );

    (shadowSupported ? it : xit)(
      'should return true if there is a second matching element inside the shadow dom but only one is visible to screenreaders',
      function () {
        var options = { selector: 'main' };
        var div = document.createElement('div');
        div.innerHTML =
          '<div id="shadow"></div><main id="target" aria-hidden="true"></main>';

        var shadow = div
          .querySelector('#shadow')
          .attachShadow({ mode: 'open' });
        shadow.innerHTML = '<main></main>';
        axe.testUtils.fixtureSetup(div);
        var vNode = axe.utils.querySelectorAll(axe._tree, '#target')[0];

        assert.isTrue(
          check.evaluate.call(checkContext, vNode.actualNode, options, vNode)
        );
        assert.deepEqual(checkContext._relatedNodes, [
          shadow.querySelector('main')
        ]);
      }
    );
  });

  describe('option.nativeScopeFilter', function () {
    it('should ignore element contained in a nativeScopeFilter match', function () {
      var options = {
        selector: 'footer',
        nativeScopeFilter: 'main'
      };
      var params = checkSetup(
        '<div><footer id="target"></footer>' +
          '<main><footer></footer></main>' +
          '</div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should not ignore element contained in a nativeScopeFilter match with their roles redefined', function () {
      var options = {
        selector: 'footer, [role="contentinfo"]',
        nativeScopeFilter: 'main'
      };
      var params = checkSetup(
        '<div><footer id="target"></footer>' +
          '<main><div role="contentinfo"></div></main>' +
          '</div>',
        options
      );
      assert.isFalse(check.evaluate.apply(checkContext, params));
    });

    it('should pass when there are two elements and the first is contained within a nativeSccopeFilter', function () {
      var options = {
        selector: 'footer, [role="contentinfo"]',
        nativeScopeFilter: 'article'
      };
      var params = checkSetup(
        '<article>' +
          '<footer id="target">Article footer</footer>' +
          '</article>' +
          '<footer>Body footer</footer>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    (shadowSupported ? it : xit)(
      'elements if its ancestor is outside the shadow DOM tree',
      function () {
        var options = {
          selector: 'footer',
          nativeScopeFilter: 'header'
        };

        var div = document.createElement('div');
        div.innerHTML =
          '<header id="shadow"></header><footer id="target"></footer>';
        div.querySelector('#shadow').attachShadow({ mode: 'open' }).innerHTML =
          '<footer></footer>';
        axe.testUtils.fixtureSetup(div);
        var vNode = axe.utils.querySelectorAll(axe._tree, '#target')[0];

        assert.isTrue(
          check.evaluate.call(checkContext, vNode.actualNode, options, vNode)
        );
      }
    );
  });
});
