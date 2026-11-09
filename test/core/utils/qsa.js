function setShadowId(
  vNode,
  shadowId,
  root = document.createDocumentFragment()
) {
  vNode.shadowId = shadowId;
  sinon.stub(vNode.actualNode, 'getRootNode').returns(root);
  for (var i = 0; i < vNode.children.length; i++) {
    setShadowId(vNode.children[i], shadowId, root);
  }
}

function getTestDom() {
  const html = document.createElement('html');
  html.innerHTML =
    '<body>' +
    '<div class="first" data-a11yhero="faulkner">' +
    '<ul>' +
    '<li class="breaking"></li>' +
    '<li class="breaking"></li>' +
    '</ul>' +
    '</div>' +
    '<div id="one"></div>' +
    '<div class="second third">' +
    '<ul>' +
    '<li role="tab" id="one"></li>' +
    '<li role="button" id="one"></li>' +
    '</ul>' +
    '</div>' +
    '<span class="fourth">' +
    '<span>' +
    '<span>' +
    '<span></span>' +
    '<span></span>' +
    '</span>' +
    '</span>' +
    '</span>' +
    '</body>';

  // remove the head node
  const head = html.querySelector('head');
  if (head) {
    head.parentNode.removeChild(head);
  }

  const tree = axe.utils.getFlattenedTree(html);

  // setup shadowIds for testing
  const first = axe.utils.getNodeFromTree(html.querySelector('.first'));
  const second = axe.utils.getNodeFromTree(html.querySelector('.second'));
  setShadowId(first, 'a');
  setShadowId(second, 'b');
  const button = axe.utils.getNodeFromTree(
    html.querySelector('[role="button"]')
  );
  button.shadowId = 'c';
  button.actualNode.getRootNode.returns(document.createDocumentFragment());

  return tree;
}

describe('axe.utils.querySelectorAllFilter', () => {
  let dom;
  afterEach(() => {});

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
          const nodes = axe.utils.querySelectorAllFilter(dom, 'ul');

          // this would return 4 nodes if we were still using the
          // top-level cache
          const result = axe.utils.querySelectorAllFilter(nodes[0], 'li');
          assert.equal(result.length, 2);
        });
      }

      it('should find nodes using just the tag', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'li');
        assert.equal(result.length, 4);
      });
      it('should find nodes using parent selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'ul > li');
        assert.equal(result.length, 4);
      });
      it('should NOT find nodes using parent selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'div > li');
        assert.equal(result.length, 0);
      });
      it('should find nodes using nested parent selectors', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'span > span > span > span'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using hierarchical selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'div li');
        assert.equal(result.length, 4);
      });
      it('should find nodes using class selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '.breaking');
        assert.equal(result.length, 2);
      });
      it('should find nodes using hierarchical class selector', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          '.first .breaking'
        );
        assert.equal(result.length, 2);
      });
      it('should NOT find nodes using hierarchical class selector', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          '.second .breaking'
        );
        assert.equal(result.length, 0);
      });
      it('should find nodes using multiple class selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '.second.third');
        assert.equal(result.length, 1);
      });
      it('should find nodes using id', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '#one');
        assert.equal(result.length, 1);
      });

      // can only select shadow dom nodes when we're not using the
      // top-level node. but since the top-level node is the one
      // with the cache, this only works when we are testing the full
      // tree (i.e. without cache)
      if (describeName === 'without cache') {
        it('should find nodes using id, but not in shadow DOM', () => {
          const result = axe.utils.querySelectorAllFilter(
            dom[0].children[0],
            '#one'
          );
          assert.equal(result.length, 1);
        });
        it('should find nodes using id, within a shadow DOM', () => {
          const result = axe.utils.querySelectorAllFilter(
            dom[0].children[0].children[2],
            '#one'
          );
          assert.equal(result.length, 1);
        });
      }

      it('should find nodes using attribute', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '[role]');
        assert.equal(result.length, 2);
      });
      it('should find nodes using attribute with value', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '[role=tab]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using attribute with value', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '[role="button"]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using parent attribute with value', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          '[data-a11yhero="faulkner"] > ul'
        );
        assert.equal(result.length, 1);
      });
      it('should find nodes using hierarchical attribute with value', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          '[data-a11yhero="faulkner"] li'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with class', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'div:not(.first)');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching id', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'div:not(#one)');
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching attribute selector', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not([data-a11yhero])'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with matching attribute selector with value', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not([data-a11yhero=faulkner])'
        );
        assert.equal(result.length, 2);
      });
      it('should find nodes using :not selector with bogus attribute selector with value', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not([data-a11yhero=wilco])'
        );
        assert.equal(result.length, 3);
      });
      it('should find nodes using :not selector with bogus id', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not(#thangy)'
        );
        assert.equal(result.length, 3);
      });
      it('should find nodes using :not selector with attribute', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'div:not([id])');
        assert.equal(result.length, 2);
      });
      it('should find nodes hierarchically using :not selector', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not(.first) li'
        );
        assert.equal(result.length, 2);
      });
      it('should find same nodes hierarchically using more :not selector', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not(.first) li:not(.breaking)'
        );
        assert.equal(result.length, 2);
      });
      it('should NOT find nodes hierarchically using :not selector', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'div:not(.second) li:not(.breaking)'
        );
        assert.equal(result.length, 0);
      });
      it('should find nodes using ^= attribute selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '[class^="sec"]');
        assert.equal(result.length, 1);
      });
      it('should find nodes using $= attribute selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '[id$="ne"]');
        assert.equal(result.length, 3);
      });
      it('should find nodes using *= attribute selector', () => {
        const result = axe.utils.querySelectorAllFilter(dom, '[role*="t"]');
        assert.equal(result.length, 2);
      });
      it('should put it all together', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          '.first[data-a11yhero="faulkner"] > ul li.breaking'
        );
        assert.equal(result.length, 2);
      });
      it('should find an element only once', () => {
        const divs = axe.utils.querySelectorAllFilter(dom, 'div');
        const ones = axe.utils.querySelectorAllFilter(dom, '#one');
        const divOnes = axe.utils.querySelectorAllFilter(dom, 'div, #one');

        assert.isBelow(
          divOnes.length,
          divs.length + ones.length,
          'Elements matching both parts of a selector should not be included twice'
        );
      });
      it('should return nodes sorted by document position', () => {
        const result = axe.utils.querySelectorAllFilter(dom, 'ul, #one');
        assert.equal(result[0].actualNode.nodeName, 'UL');
        assert.equal(result[1].actualNode.nodeName, 'DIV');
        assert.equal(result[2].actualNode.nodeName, 'UL');
      });
      it('should filter the returned nodes when passed a filter function', () => {
        const result = axe.utils.querySelectorAllFilter(
          dom,
          'ul, #one',
          node => {
            return node.actualNode.nodeName !== 'UL';
          }
        );
        assert.equal(result[0].actualNode.nodeName, 'DIV');
        assert.equal(result.length, 1);
      });
    });
  }
});

describe('axe.utils.querySelectorAll', () => {
  let dom;
  afterEach(() => {});
  beforeEach(() => {
    dom = getTestDom();
  });
  it('should find nodes using just the tag', () => {
    const result = axe.utils.querySelectorAll(dom, 'li');
    assert.equal(result.length, 4);
  });

  it('should find nodes by ID without an actual DOM node', () => {
    const node = new axe.SerialVirtualNode({ nodeName: 'div', id: 'target' });
    const result = axe.utils.querySelectorAll(node, '#target');
    assert.deepEqual(result, [node]);
  });

  for (const useCache of [true, false]) {
    it(`should handle a clobbered getRootNode ${useCache ? 'with' : 'without'} cache`, () => {
      const form = document.createElement('form');
      form.innerHTML = '<input name="getRootNode" id="target">';
      const tree = axe.utils.getFlattenedTree(form);
      if (!useCache) {
        delete tree[0]._selectorMap;
      }

      for (const selector of ['#target', 'input']) {
        const result = axe.utils.querySelectorAll(tree, selector);
        assert.deepEqual(
          result.map(node => node.actualNode),
          [form.firstElementChild]
        );
      }
    });
  }
});

describe('axe.utils.querySelectorAll with slotted content', () => {
  const fixture = document.getElementById('fixture');
  const html = axe.testUtils.html;
  let tree;
  let target;

  beforeEach(() => {
    fixture.setHTMLUnsafe(html`
      <div id="host">
        <template shadowrootmode="open">
          <section id="shadow-ancestor">
            <slot></slot>
            <p id="target">Shadow content</p>
          </section>
        </template>
        <div id="target"><span id="descendant">Light content</span></div>
      </div>
    `);
    target = fixture.querySelector('#target');
    tree = axe.utils.getFlattenedTree(fixture);
  });

  for (const useCache of [true, false]) {
    describe(useCache ? 'with cache' : 'without cache', () => {
      beforeEach(() => {
        if (!useCache) {
          delete tree[0]._selectorMap;
        }
      });

      it('finds a slotted light DOM node by ID', () => {
        const result = axe.utils.querySelectorAll(tree, '#target');
        assert.deepEqual(
          result.map(node => node.actualNode),
          [target]
        );
      });

      it('finds descendants of slotted light DOM nodes by ID', () => {
        const result = axe.utils.querySelectorAll(tree, '#descendant');
        assert.deepEqual(
          result.map(node => node.actualNode),
          [target.firstElementChild]
        );
      });

      it('finds slotted nodes using a compound ID selector', () => {
        const result = axe.utils.querySelectorAll(tree, 'div#target');
        assert.deepEqual(
          result.map(node => node.actualNode),
          [target]
        );
      });

      it('finds slotted nodes below a matching ancestor', () => {
        const result = axe.utils.querySelectorAll(tree, '#host #target');
        assert.deepEqual(
          result.map(node => node.actualNode),
          [target]
        );
      });

      it('does not match ancestor IDs from another DOM root', () => {
        for (const selector of [
          '#shadow-ancestor #target',
          '#shadow-ancestor > #target',
          '#shadow-ancestor span'
        ]) {
          assert.deepEqual(axe.utils.querySelectorAll(tree, selector), []);
        }
      });

      it('applies the filter to slotted nodes', () => {
        const result = axe.utils.querySelectorAllFilter(
          tree,
          '#target',
          () => false
        );
        assert.deepEqual(result, []);
      });
    });
  }

  it('keeps ID lookups in the DOM root of a shadow query context', () => {
    const shadowRoot = fixture.querySelector('#host').shadowRoot;
    const context = axe.utils.getNodeFromTree(
      shadowRoot.querySelector('section')
    );
    const result = axe.utils.querySelectorAll(context, '#target');
    assert.deepEqual(
      result.map(node => node.actualNode),
      [shadowRoot.querySelector('#target')]
    );
  });
});
