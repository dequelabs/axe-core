describe('axe.utils.contains', () => {
  const html = axe.testUtils.html;
  const fixture = document.getElementById('fixture');
  const { fixtureSetup, createNestedShadowDom } = axe.testUtils;

  it('is true when the first node is an ancestor', () => {
    const tree = fixtureSetup(html`<section><img /></section>`);
    const node1 = axe.utils.querySelectorAll(tree, 'section')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
    assert.isTrue(axe.utils.contains(node1, node2));
  });

  it('is false when the first node is a descendant', () => {
    const tree = fixtureSetup(html`<section><img /></section>`);
    const node1 = axe.utils.querySelectorAll(tree, 'img')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'section')[0];
    assert.isFalse(axe.utils.contains(node1, node2));
  });

  it('is false when the nodes are siblings', () => {
    const tree = fixtureSetup(
      html`<section></section>
        <img />`
    );
    const node1 = axe.utils.querySelectorAll(tree, 'img')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'section')[0];
    assert.isFalse(axe.utils.contains(node1, node2));
    assert.isFalse(axe.utils.contains(node2, node1));
  });

  it('is true when the passed the same node', () => {
    const tree = fixtureSetup(html`<img />`);
    const node = axe.utils.querySelectorAll(tree, 'img')[0];
    assert.isTrue(axe.utils.contains(node, node));
  });

  it('is false when the nodes are cousins', () => {
    const tree = fixtureSetup(
      html`<section><input /></section>
        <img />`
    );
    const node1 = axe.utils.querySelectorAll(tree, 'input')[0];
    const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
    assert.isFalse(axe.utils.contains(node1, node2));
    assert.isFalse(axe.utils.contains(node2, node1));
  });

  describe('using fallbacks', () => {
    it('should first check DOMNode.contains', () => {
      let success = false;
      const node2 = { actualNode: 'not really a node but it doesnt matter' };
      const node1 = {
        actualNode: {
          contains: n2 => {
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
        html`<div id="shadowHost"></div>`,
        html`<section><img /></section>`
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
        html`<section id="shadowHost"></section>`,
        html`<div><img /></div>`
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
        html`<main id="shadowHost"></main>`,
        '<article> <div id="shadowHost"></div> </article>',
        '<section> <div id="shadowHost"></div> </section>',
        html`<div><img /></div>`
      );
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'main')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'img')[0];
      assert.isTrue(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });

    it('is false when the nodes are in adjacent trees', () => {
      createNestedShadowDom(
        fixture,
        '<div id="firstHost" class="shadowHost"></div>',
        html`<img />`
      );
      createNestedShadowDom(
        fixture,
        '<div id="secondHost" class="shadowHost"></div>',
        html`<input />`
      );
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'img')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'input')[0];

      assert.isFalse(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });

    it('works with slotted elements inside shadow DOM', () => {
      createNestedShadowDom(
        fixture,
        html`<div id="shadowHost"><img /></div>`,
        html`<section><slot /></section>`
      );
      const tree = axe.setup(fixture);
      const node1 = axe.utils.querySelectorAll(tree, 'section')[0];
      const node2 = axe.utils.querySelectorAll(tree, 'img')[0];

      assert.isTrue(axe.utils.contains(node1, node2));
      assert.isFalse(axe.utils.contains(node2, node1));
    });
  });
});
