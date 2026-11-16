describe('dom.queryDom', () => {
  const { html, injectIntoFixture } = axe.testUtils;
  const queryDom = axe.commons.dom.queryDom;
  let dom;

  function setShadowId(vNode, shadowId) {
    vNode.shadowId = shadowId;
    for (var i = 0; i < vNode.children.length; i++) {
      setShadowId(vNode.children[i], shadowId);
    }
  }

  function getTestDom() {
    const fixture = injectIntoFixture(
      html`
        <section>
          <div class="first" data-shadow-id="a" data-a11yhero="faulkner">
            <ul>
              <li class="breaking"></li>
              <li class="breaking"></li>
            </ul>
          </div>
          <div id="one"></div>
          <div class="second third" data-shadow-id="b">
            <ul>
              <li role="tab" id="one"></li>
              <li role="button" data-shadow-id="c" id="one"></li>
            </ul>
          </div>
          <span class="fourth">
            <span>
              <span>
                <span></span>
                <span></span>
              </span>
            </span>
          </span>
          <main class="fifth" id="shadow">
            <template shadowrootmode="open">
              <button><slot></slot></button>
              <button id="in-shadow"></button>
            </template>
            <span></span>
          </main>
        </section>
      `,
      { shadow: true }
    );

    const tree = axe.utils.getFlattenedTree(fixture.firstElementChild);

    // setup shadowIds for testing
    fixture.querySelectorAll('[data-shadow-id]').forEach(node => {
      setShadowId(
        axe.utils.getNodeFromTree(node),
        node.getAttribute('data-shadow-id')
      );
    });

    return tree;
  }

  const tests = ['without cache', 'with cache'];
  for (var i = 0; i < tests.length; i++) {
    var describeName = tests[i];
    describe(describeName, () => {
      afterEach(() => {});

      if (describeName === 'without cache') {
        beforeEach(() => {
          dom = getTestDom();

          // prove we're using the DOM by deleting the cache
          delete dom[0]._selectorMap;
        });

        it('should not have a primed cache', () => {
          assert.isUndefined(dom[0]._selectorMap);
        });
      } else {
        beforeEach(() => {
          dom = getTestDom();

          // prove we're using the cache by deleting all the children
          dom[0].children = [];
        });

        it('should not use the cache if not using the top-level node', () => {
          const nodes = queryDom(dom, 'ul');

          // this would return 4 nodes if we were still using the
          // top-level cache
          const result = queryDom(nodes[0], 'li');
          assert.equal(result.length, 2);
        });
      }

      it('should find nodes using just the tag', () => {
        const result = queryDom(dom, 'li');
        assert.equal(result.length, 4);
      });

      it('should find nodes using parent selector', () => {
        const result = queryDom(dom, 'ul > li');
        assert.equal(result.length, 4);
      });

      it('should NOT find nodes using parent selector', () => {
        const result = queryDom(dom, 'div > li');
        assert.equal(result.length, 0);
      });

      it('should find nodes using nested parent selectors', () => {
        const result = queryDom(dom, 'span > span > span > span');
        assert.equal(result.length, 2);
      });

      it('should find nodes using hierarchical selector', () => {
        const result = queryDom(dom, 'div li');
        assert.equal(result.length, 4);
      });

      it('should find nodes using class selector', () => {
        const result = queryDom(dom, '.breaking');
        assert.equal(result.length, 2);
      });

      it('should find nodes using hierarchical class selector', () => {
        const result = queryDom(dom, '.first .breaking');
        assert.equal(result.length, 2);
      });

      it('should NOT find nodes using hierarchical class selector', () => {
        const result = queryDom(dom, '.second .breaking');
        assert.equal(result.length, 0);
      });

      it('should find nodes using multiple class selector', () => {
        const result = queryDom(dom, '.second.third');
        assert.equal(result.length, 1);
      });

      it('should find nodes using id', () => {
        const result = queryDom(dom, '#one');
        assert.equal(result.length, 1);
      });

      it('should find nodes using id, but not in shadow DOM', () => {
        const result = queryDom(dom, '#one');
        assert.equal(result.length, 1);
      });

      it('should find nodes using id, within a shadow DOM', () => {
        const vNode = axe.utils.getNodeFromTree(
          dom[0].actualNode.querySelector('.second')
        );

        const result = queryDom(vNode, '#one');
        assert.equal(result.length, 1);
      });

      it('should find light DOM nodes in shadow DOM using class', () => {
        const result = queryDom(dom, '.fifth span');
        assert.equal(result.length, 1);
      });

      it('should find light DOM nodes in shadow DOM using id', () => {
        const result = queryDom(dom, '#shadow span');
        assert.equal(result.length, 1);
      });

      it('should NOT find node across shadow DOM boundary using id', () => {
        const result = queryDom(dom, '.fifth #in-shadow');
        assert.equal(result.length, 0);
      });

      it('should NOT find node across shadow DOM boundary using pseudo selector and id', () => {
        const result = queryDom(dom, ':is(#in-shadow)');
        assert.equal(result.length, 0);
      });

      it('should find nodes using attribute', () => {
        const result = queryDom(dom, '[role]');
        assert.equal(result.length, 2);
      });

      it('should find nodes using attribute with value', () => {
        const result = queryDom(dom, '[role=tab]');
        assert.equal(result.length, 1);
      });

      it('should find nodes using attribute with value', () => {
        const result = queryDom(dom, '[role="button"]');
        assert.equal(result.length, 1);
      });

      it('should find nodes using parent attribute with value', () => {
        const result = queryDom(dom, '[data-a11yhero="faulkner"] > ul');
        assert.equal(result.length, 1);
      });

      it('should find nodes using hierarchical attribute with value', () => {
        const result = queryDom(dom, '[data-a11yhero="faulkner"] li');
        assert.equal(result.length, 2);
      });

      it('should find nodes using :not selector with class', () => {
        const result = queryDom(dom, 'div:not(.first)');
        assert.equal(result.length, 2);
      });

      it('should find nodes using :not selector with matching id', () => {
        const result = queryDom(dom, 'div:not(#one)');
        assert.equal(result.length, 2);
      });

      it('should find nodes using :not selector with matching attribute selector', () => {
        const result = queryDom(dom, 'div:not([data-a11yhero])');
        assert.equal(result.length, 2);
      });

      it('should find nodes using :not selector with matching attribute selector with value', () => {
        const result = queryDom(dom, 'div:not([data-a11yhero=faulkner])');
        assert.equal(result.length, 2);
      });

      it('should find nodes using :not selector with bogus attribute selector with value', () => {
        const result = queryDom(dom, 'div:not([data-a11yhero=wilco])');
        assert.equal(result.length, 3);
      });

      it('should find nodes using :not selector with bogus id', () => {
        const result = queryDom(dom, 'div:not(#thangy)');
        assert.equal(result.length, 3);
      });

      it('should find nodes using :not selector with attribute', () => {
        const result = queryDom(dom, 'div:not([id])');
        assert.equal(result.length, 2);
      });

      it('should find nodes hierarchically using :not selector', () => {
        const result = queryDom(dom, 'div:not(.first) li');
        assert.equal(result.length, 2);
      });

      it('should find same nodes hierarchically using more :not selector', () => {
        const result = queryDom(dom, 'div:not(.first) li:not(.breaking)');
        assert.equal(result.length, 2);
      });

      it('should NOT find nodes hierarchically using :not selector', () => {
        const result = queryDom(dom, 'div:not(.second) li:not(.breaking)');
        assert.equal(result.length, 0);
      });

      it('should find nodes using ^= attribute selector', () => {
        const result = queryDom(dom, '[class^="sec"]');
        assert.equal(result.length, 1);
      });

      it('should find nodes using $= attribute selector', () => {
        const result = queryDom(dom, '[id$="ne"]');
        assert.equal(result.length, 3);
      });

      it('should find nodes using *= attribute selector', () => {
        const result = queryDom(dom, '[role*="t"]');
        assert.equal(result.length, 2);
      });

      it('should put it all together', () => {
        const result = queryDom(
          dom,
          '.first[data-a11yhero="faulkner"] > ul li.breaking'
        );
        assert.equal(result.length, 2);
      });

      it('should find an element only once', () => {
        const divs = queryDom(dom, 'div');
        const ones = queryDom(dom, '#one');
        const divOnes = queryDom(dom, 'div, #one');

        assert.isBelow(
          divOnes.length,
          divs.length + ones.length,
          'Elements matching both parts of a selector should not be included twice'
        );
      });

      it('should return nodes sorted by document position', () => {
        const result = queryDom(dom, 'ul, #one');
        assert.equal(result[0].actualNode.nodeName, 'UL');
        assert.equal(result[1].actualNode.nodeName, 'DIV');
        assert.equal(result[2].actualNode.nodeName, 'UL');
      });

      it('should filter the returned nodes when passed a filter function', () => {
        const result = queryDom(dom, 'ul, #one', node => {
          return node.actualNode.nodeName !== 'UL';
        });
        assert.equal(result[0].actualNode.nodeName, 'DIV');
        assert.equal(result.length, 1);
      });
    });
  }
});
