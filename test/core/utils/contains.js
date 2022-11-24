describe('axe.utils.contains', () => {
  const fixture = document.getElementById('fixture');
  const { fixtureSetup, createNestedShadowDom } = axe.testUtils;

  it('is true when the first node is an ancestor', () => {
    const tree = fixtureSetup(`<section> <img> </section>`);
    const node1 = axe.utils.querySelectorAll(tree, 'section')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
    assert.isTrue(axe.utils.contains(node1, node2));
  });

  it('is false when the fitst node is a descendant', () => {
    const tree = fixtureSetup(`<section> <img> </section>`);
    const node1 = axe.utils.querySelectorAll(tree, 'img')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'section')[0];
    assert.isFalse(axe.utils.contains(node1, node2));
  });

  it('is false when the nodes are siblings', () => {
    const tree = fixtureSetup(`<section></section> <img>`);
    const node1 = axe.utils.querySelectorAll(tree, 'img')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'section')[0];
    assert.isFalse(axe.utils.contains(node1, node2));
    assert.isFalse(axe.utils.contains(node2, node1));
  });

  it('is true when the passed the same node', () => {
    const tree = fixtureSetup(`<img>`);
    const node = axe.utils.querySelectorAll(tree, 'img')[0];
    assert.isTrue(axe.utils.contains(node, node));
  });

  it('is false when the nodes are a cousins', () => {
    const tree = fixtureSetup(`<section> <input> </section> <img>`);
    const node1 = axe.utils.querySelectorAll(tree, 'input')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
    assert.isFalse(axe.utils.contains(node1, node2));
    assert.isFalse(axe.utils.contains(node2, node1));
  });

  describe.skip('using fallbacks', () => {
    it('should first check DOMNode.contains', () => {
      let success = false;
      const node2 = { actualNode: 'not really a node but it doesnt matter' };
      const node1 = {
        actualNode: {
          contains: function (n2) {
            success = true;
            assert.deepEqual(n2, node2.actualNode);
          },
          compareDocumentPosition: () => {
            success = false;
            assert.ok(false, 'should not be called');
          }
        }
      };

      axe.utils.contains(node1, node2);
      assert.isTrue(success);
    });

    it('should fallback to compareDocumentPosition', () => {
      let success = false;
      const node2 = { actualNode: 'not really a node but it doesnt matter' };
      const node1 = {
        actualNode: {
          compareDocumentPosition: function (n2) {
            success = true;
            assert.deepEqual(n2, node2.actualNode);
          }
        }
      };

      axe.utils.contains(node1, node2);
      assert.isTrue(success);
    });

    it('should compareDocumentPosition against bitwise & 16', () => {
      const node2 = { actualNode: 'not really a node but it doesnt matter' };
      const node1 = {
        actualNode: {
          compareDocumentPosition: () => {
            return 20;
          }
        }
      };

      assert.isTrue(axe.utils.contains(node1, node2));
    });

    it('should fallback to parent lookup', () => {
      const node1 = {};
      const node2 = {
        parent: node1
      };

      assert.isTrue(axe.utils.contains(node1, node2));
    });
  });

  describe('with shadow DOM', () => {
    it('works when nodes are in the same tree', () => {
      createNestedShadowDom(
        fixture,
        `<div id="shadowHost"></div>`,
        `<section> <img> </section>`
      );
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'section')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
      assert.isTrue(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });

    it('works when the nodes are in nested trees', () => {
      createNestedShadowDom(
        fixture,
        `<section id="shadowHost"></section>`,
        `<div> <img> </div>`
      );
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'section')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
      assert.isTrue(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });

    it('works when the nodes are in nested multiple layers deep', () => {
      createNestedShadowDom(
        fixture,
        `<main id="shadowHost"></main>`,
        '<article> <div id="shadowHost"></div> </article>',
        '<section> <div id="shadowHost"></div> </section>',
        `<div> <img> </div>`
      );
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'main')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
      assert.isTrue(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });

    it('is false when the nodes are in adjacent trees', () => {
      const section = createNestedShadowDom(
        fixture,
        `<section id="target"></section>`
      );
      createNestedShadowDom(section, `<img>`);
      createNestedShadowDom(section, `<input>`);
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'img')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'input')[0];

      assert.isFalse(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });

    it('works with slotted elements inside shadow DOM', () => {
      createNestedShadowDom(
        fixture,
        `<div id="shadowHost"> <img> </div>`,
        `<section> <slot /> </section>`
      );
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'section')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'img')[0];

      assert.isTrue(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });

    it('should work', () => {
      fixture.innerHTML = '<div class="outer"><div class="inner"></div></div>';
      const tree = axe.setup(fixture);
      const inner = axe.utils.querySelectorAll(tree, '.inner')[0];
      const outer = axe.utils.querySelectorAll(tree, '.outer')[0];

      assert.isTrue(axe.utils.contains(outer, inner));
      assert.isFalse(axe.utils.contains(inner, outer));
    });
  });
});
