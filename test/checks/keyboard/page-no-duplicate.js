describe('page-no-duplicate', () => {
  const fixture = document.getElementById('fixture');
  const checkContext = new axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const shadowSupported = axe.testUtils.shadowSupport.v1;

  const check = checks['page-no-duplicate-main'];

  afterEach(() => {
    checkContext.reset();
  });

  describe('options.selector', () => {
    it('throws if there is no selector', () => {
      assert.throws(() => {
        const params = checkSetup('<div id="target"></div>', undefined);
        assert.isFalse(check.evaluate.apply(checkContext, params));
      });
    });

    it('should return false if there is more than one element matching the selector', () => {
      const options = { selector: 'main' };
      const params = checkSetup(
        '<div><main id="target"></main><main id="dup"></main></div>',
        options
      );

      assert.isFalse(check.evaluate.apply(checkContext, params));
      assert.deepEqual(
        checkContext._relatedNodes,
        Array.from(fixture.querySelectorAll('#dup'))
      );
    });

    it('should return true if there is only one element matching the selector', () => {
      const options = { selector: 'main' };
      const params = checkSetup('<div role="main" id="target"></div>', options);
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should return true if there are no element matching the selector', () => {
      const options = { selector: 'footer' };
      const params = checkSetup(
        '<div><main id="target"></main><main></main></div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should return true if there is more than one element matching the selector but only one is visible', () => {
      const options = { selector: 'main' };
      const params = checkSetup(
        '<div><main id="target"></main><main id="dup" style="display:none;"></main></div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should return true if there is more than one element matching the selector but only one is visible to screenreaders', () => {
      const options = { selector: 'main' };
      const params = checkSetup(
        '<div><main id="target" aria-hidden="true"></main><main id="dup"></main></div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    (shadowSupported ? it : xit)(
      'should return false if there is a second matching element inside the shadow dom',
      () => {
        const options = { selector: 'main' };
        const div = document.createElement('div');
        div.innerHTML = '<div id="shadow"></div><main id="target"></main>';

        const shadow = div
          .querySelector('#shadow')
          .attachShadow({ mode: 'open' });
        shadow.innerHTML = '<main></main>';
        axe.testUtils.fixtureSetup(div);
        const vNode = axe.utils.querySelectorAll(axe._tree, '#target')[0];

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
      () => {
        const options = { selector: 'main' };
        const div = document.createElement('div');
        div.innerHTML =
          '<div id="shadow"></div><main id="target" aria-hidden="true"></main>';

        const shadow = div
          .querySelector('#shadow')
          .attachShadow({ mode: 'open' });
        shadow.innerHTML = '<main></main>';
        axe.testUtils.fixtureSetup(div);
        const vNode = axe.utils.querySelectorAll(axe._tree, '#target')[0];

        assert.isTrue(
          check.evaluate.call(checkContext, vNode.actualNode, options, vNode)
        );
        assert.deepEqual(checkContext._relatedNodes, [
          shadow.querySelector('main')
        ]);
      }
    );
  });

  describe('option.nativeScopeFilter', () => {
    it('should ignore element contained in a nativeScopeFilter match', () => {
      const options = {
        selector: 'footer',
        nativeScopeFilter: 'main'
      };
      const params = checkSetup(
        '<div><footer id="target"></footer>' +
          '<main><footer></footer></main>' +
          '</div>',
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should not ignore element contained in a nativeScopeFilter match with their roles redefined', () => {
      const options = {
        selector: 'footer, [role="contentinfo"]',
        nativeScopeFilter: 'main'
      };
      const params = checkSetup(
        '<div><footer id="target"></footer>' +
          '<main><div role="contentinfo"></div></main>' +
          '</div>',
        options
      );
      assert.isFalse(check.evaluate.apply(checkContext, params));
    });

    it('should pass when there are two elements and the first is contained within a nativeSccopeFilter', () => {
      const options = {
        selector: 'footer, [role="contentinfo"]',
        nativeScopeFilter: 'article'
      };
      const params = checkSetup(
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
      () => {
        const options = {
          selector: 'footer',
          nativeScopeFilter: 'header'
        };

        const div = document.createElement('div');
        div.innerHTML =
          '<header id="shadow"></header><footer id="target"></footer>';
        div.querySelector('#shadow').attachShadow({ mode: 'open' }).innerHTML =
          '<footer></footer>';
        axe.testUtils.fixtureSetup(div);
        const vNode = axe.utils.querySelectorAll(axe._tree, '#target')[0];

        assert.isTrue(
          check.evaluate.call(checkContext, vNode.actualNode, options, vNode)
        );
      }
    );
  });

  describe('options.role', () => {
    it('should pass when element does not match the role', () => {
      const options = {
        selector: 'footer',
        role: 'contentinfo'
      };
      const params = checkSetup(
        `<div>
          <footer id="target"></footer>
          <div role="main">
            <footer></footer>
          </div>
        </div>`,
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    it('should fail when element matches the role', () => {
      const options = {
        selector: 'footer',
        role: 'contentinfo'
      };
      const params = checkSetup(
        `<div>
          <footer id="target"></footer>
          <div>
            <footer id="fail"></footer>
          </div>
        </div>`,
        options
      );
      assert.isFalse(check.evaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._relatedNodes, [
        fixture.querySelector('#fail')
      ]);
    });

    it('should pass when there are two elements and the first does not match the role', () => {
      const options = {
        selector: 'footer, [role="contentinfo"]',
        role: 'contentinfo'
      };
      const params = checkSetup(
        `<article>
          <footer id="target">Article footer</footer>
        </article>
        <footer>Body footer</footer>`,
        options
      );
      assert.isTrue(check.evaluate.apply(checkContext, params));
    });

    (shadowSupported ? it : xit)(
      "should pass if element's ancestor is outside the shadow DOM tree",
      () => {
        const options = {
          selector: 'footer',
          role: 'contentinfo'
        };

        const div = document.createElement('div');
        div.innerHTML =
          '<article id="shadow"></article><footer id="target"></footer>';
        div.querySelector('#shadow').attachShadow({ mode: 'open' }).innerHTML =
          '<footer></footer>';
        axe.testUtils.fixtureSetup(div);
        const vNode = axe.utils.querySelectorAll(axe._tree, '#target')[0];

        assert.isTrue(
          check.evaluate.call(checkContext, vNode.actualNode, options, vNode)
        );
      }
    );
  });
});
