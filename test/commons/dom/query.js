describe('query', () => {
  const { html } = axe.testUtils;
  const query = axe.commons.dom.query;
  let dom;

  function setShadowId(vNode, shadowId) {
    vNode.shadowId = shadowId;
    for (var i = 0; i < vNode.children.length; i++) {
      setShadowId(vNode.children[i], shadowId);
    }
  }

  function getTestDom() {
    const htmlEl = document.createElement('html');
    htmlEl.innerHTML = html`
      <body>
        <div class="first" data-a11yhero="faulkner">
          <ul>
            <li class="breaking"></li>
            <li class="breaking"></li>
          </ul>
        </div>
        <div id="one"></div>
        <div class="second third">
          <ul>
            <li role="tab" id="one"></li>
            <li role="button" id="one"></li>
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
      </body>
    `;

    // remove the head node
    const head = htmlEl.querySelector('head');
    if (head) {
      head.parentNode.removeChild(head);
    }

    const tree = axe.utils.getFlattenedTree(htmlEl);

    // setup shadowIds for testing
    const first = axe.utils.getNodeFromTree(htmlEl.querySelector('.first'));
    const second = axe.utils.getNodeFromTree(htmlEl.querySelector('.second'));
    const button = axe.utils.getNodeFromTree(
      htmlEl.querySelector('[role="button"]')
    );
    setShadowId(first, 'a');
    setShadowId(second, 'b');
    setShadowId(button, 'c');

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
          const nodes = query(dom, 'ul');

          // this would return 4 nodes if we were still using the
          // top-level cache
          const result = query(nodes[0], 'li');
          assert.equal(result.length, 2);
        });
      }

      it('should find nodes using just the tag', () => {
        const result = query(dom, 'li');
        assert.equal(result.length, 4);
      });
      it('should find nodes using parent selector', () => {
        const result = query(dom, 'ul > li');
        assert.equal(result.length, 4);
      });
      it('should NOT find nodes using parent selector', () => {
        const result = query(dom, 'div > li');
        assert.equal(result.length, 0);
      });
      it('should find nodes using nested parent selectors', () => {
        const result = query(dom, 'span > span > span > span');
        assert.equal(result.length, 2);
      });
      it('should find nodes using hierarchical selector', () => {
        const result = query(dom, 'div li');
        assert.equal(result.length, 4);
      });
      it('should find nodes using class selector', () => {
        const result = query(dom, '.breaking');
        assert.equal(result.length, 2);
      });
      it('should find nodes using hierarchical class selector', () => {
        const result = query(dom, '.first .breaking');
        assert.equal(result.length, 2);
      });
      it('should NOT find nodes using hierarchical class selector', () => {
        const result = query(dom, '.second .breaking');
        assert.equal(result.length, 0);
      });
      it('should find nodes using multiple class selector', () => {
        const result = query(dom, '.second.third');
        assert.equal(result.length, 1);
      });
      it('should find nodes using id', () => {
        const result = query(dom, '#one');
        assert.equal(result.length, 1);
      });

      // can only select shadow dom nodes when we're not using the
      // top-level node. but since the top-level node is the one
      // with the cache, this only works when we are testing the full
      // tree (i.e. without cache)
      if (describeName === 'without cache') {
        it('should find nodes using id, but not in shadow DOM', () => {
          const result = query(dom[0].children[0], '#one');
          assert.equal(result.length, 1);
        });
        it('should find nodes using id, within a shadow DOM', () => {
          const vNode = axe.utils.getNodeFromTree(
            dom[0].actualNode.querySelector('.second')
          );

          const result = query(vNode, '#one');
          assert.equal(result.length, 1);
        });
      }

      it('should find nodes using attribute', () => {
        const result = query(dom, '[role]');
        assert.equal(result.length, 2);
      });
      it('should find nodes using attribute with value', () => {
        const result = query(dom, '[role=tab]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using attribute with value', () => {
        const result = query(dom, '[role="button"]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using parent attribute with value', () => {
        const result = query(dom, '[data-a11yhero="faulkner"] > ul');
        assert.equal(result.length, 1);
      });
      it('should find nodes using hierarchical attribute with value', () => {
        const result = query(dom, '[data-a11yhero="faulkner"] li');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with class', () => {
        const result = query(dom, 'div:not(.first)');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching id', () => {
        const result = query(dom, 'div:not(#one)');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching attribute selector', () => {
        const result = query(dom, 'div:not([data-a11yhero])');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching attribute selector with value', () => {
        const result = query(dom, 'div:not([data-a11yhero=faulkner])');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with bogus attribute selector with value', () => {
        const result = query(dom, 'div:not([data-a11yhero=wilco])');
        assert.equal(result.length, 3);
      });
      it('should find nodes using :not selector with bogus id', () => {
        const result = query(dom, 'div:not(#thangy)');
        assert.equal(result.length, 3);
      });
      it('should find nodes using :not selector with attribute', () => {
        const result = query(dom, 'div:not([id])');
        assert.equal(result.length, 2);
      });
      it('should find nodes hierarchically using :not selector', () => {
        const result = query(dom, 'div:not(.first) li');
        assert.equal(result.length, 2);
      });
      it('should find same nodes hierarchically using more :not selector', () => {
        const result = query(dom, 'div:not(.first) li:not(.breaking)');
        assert.equal(result.length, 2);
      });
      it('should NOT find nodes hierarchically using :not selector', () => {
        const result = query(dom, 'div:not(.second) li:not(.breaking)');
        assert.equal(result.length, 0);
      });
      it('should find nodes using ^= attribute selector', () => {
        const result = query(dom, '[class^="sec"]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using $= attribute selector', () => {
        const result = query(dom, '[id$="ne"]');
        assert.equal(result.length, 3);
      });
      it('should find nodes using *= attribute selector', () => {
        const result = query(dom, '[role*="t"]');
        assert.equal(result.length, 2);
      });
      it('should put it all together', () => {
        const result = query(
          dom,
          '.first[data-a11yhero="faulkner"] > ul li.breaking'
        );
        assert.equal(result.length, 2);
      });
      it('should find an element only once', () => {
        const divs = query(dom, 'div');
        const ones = query(dom, '#one');
        const divOnes = query(dom, 'div, #one');

        assert.isBelow(
          divOnes.length,
          divs.length + ones.length,
          'Elements matching both parts of a selector should not be included twice'
        );
      });
      it('should return nodes sorted by document position', () => {
        const result = query(dom, 'ul, #one');
        assert.equal(result[0].actualNode.nodeName, 'UL');
        assert.equal(result[1].actualNode.nodeName, 'DIV');
        assert.equal(result[2].actualNode.nodeName, 'UL');
      });
      it('should filter the returned nodes when passed a filter function', () => {
        const result = query(dom, 'ul, #one', node => {
          return node.actualNode.nodeName !== 'UL';
        });
        assert.equal(result[0].actualNode.nodeName, 'DIV');
        assert.equal(result.length, 1);
      });
    });
  }
});
