describe('dom.isVisibleToScreenReaders', () => {
  const html = axe.testUtils.html;

  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const isVisibleToScreenReaders = axe.commons.dom.isVisibleToScreenReaders;

  function createContentHidden() {
    const group = document.createElement('div');
    group.innerHTML =
      '<label id="mylabel">Label</label><input aria-labelledby="mylabel" type="text" />';
    return group;
  }

  function makeShadowTreeHidden(node) {
    const root = node.attachShadow({ mode: 'open' });
    const div = document.createElement('div');
    div.className = 'parent';
    root.appendChild(div);
    div.appendChild(createContentHidden());
  }

  it('should return false on detached elements', () => {
    const el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';
    axe.testUtils.flatTreeSetup(el);
    assert.isFalse(isVisibleToScreenReaders(el));
  });

  it('should return true on body', () => {
    axe.testUtils.flatTreeSetup(document.body);
    const actual = isVisibleToScreenReaders(document.body);
    assert.isTrue(actual);
  });

  it('should return true on html', () => {
    axe.testUtils.flatTreeSetup(document.documentElement);
    const actual = isVisibleToScreenReaders(document.documentElement);
    assert.isTrue(actual);
  });

  it('should return true for visible element', () => {
    const vNode = queryFixture('<div id="target">Visible</div>');
    assert.isTrue(isVisibleToScreenReaders(vNode));
  });

  it('should return true for visible area element', () => {
    const vNode = queryFixture(html`
      <map name="map">
        <area id="target" href="#" />
      </map>
      <img usemap="#map" src="img.png" />
    `);
    assert.isTrue(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `aria-hidden` is set', () => {
    const vNode = queryFixture(
      '<div id="target" aria-hidden="true">Hidden from screen readers</div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `inert` is set', () => {
    const vNode = queryFixture(
      '<div id="target" inert>Hidden from screen readers</div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `display: none` is set', () => {
    const vNode = queryFixture(
      '<div id="target" style="display: none">Hidden from screen readers</div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `aria-hidden` is set on parent', () => {
    const vNode = queryFixture(
      '<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should know how `visibility` works', () => {
    const vNode = queryFixture(html`
      <div style="visibility: hidden;">
        <div id="target" style="visibility: visible;">Hi</div>
      </div>
    `);
    assert.isTrue(isVisibleToScreenReaders(vNode));
  });

  it('returns false for `AREA` without closest `MAP` element', () => {
    const vNode = queryFixture(
      '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>'
    );
    const actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  it('returns false for `AREA` with closest `MAP` with no name attribute', () => {
    const vNode = queryFixture(html`
      <map>
        <area
          id="target"
          role="link"
          shape="circle"
          coords="130,136,60"
          aria-label="MDN"
        />
      </map>
    `);
    const actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  it('returns false for `AREA` element that is inside shadowDOM', () => {
    fixture.innerHTML = '<div id="container"></div>';
    const container = fixture.querySelector('#container');
    const shadow = container.attachShadow({ mode: 'open' });
    shadow.innerHTML = html`
      <map name="infographic">
        <area
          id="target"
          role="link"
          shape="circle"
          coords="130,136,60"
          aria-label="MDN"
        />
      </map>
    `;
    axe.testUtils.flatTreeSetup(fixture);

    const target = shadow.querySelector('#target');
    const actual = isVisibleToScreenReaders(target);
    assert.isFalse(actual);
  });

  it('returns false for `AREA` with closest `MAP` with name but not referred by an `IMG` usemap attribute', () => {
    const vNode = queryFixture(html`
      <map name="infographic">
        <area
          id="target"
          role="link"
          shape="circle"
          coords="130,136,60"
          aria-label="MDN"
        />
      </map>
      <img usemap="#infographic-wrong-name" alt="MDN infographic" />
    `);
    const actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  it('returns false for `AREA` with `MAP` and used in `IMG` which is not visible', () => {
    const vNode = queryFixture(html`
      <map name="infographic">
        <area
          id="target"
          role="link"
          shape="circle"
          coords="130,136,60"
          aria-label="MDN"
        />
      </map>
      <img usemap="#infographic" alt="MDN infographic" style="display:none" />
    `);
    const actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  it('returns true for `AREA` with `MAP` and used in `IMG` which is visible', () => {
    const vNode = queryFixture(html`
      <map name="infographic">
        <area
          id="target"
          role="link"
          shape="circle"
          coords="130,136,60"
          aria-label="MDN"
        />
      </map>
      <img usemap="#infographic" alt="MDN infographic" />
    `);
    const actual = isVisibleToScreenReaders(vNode);
    assert.isTrue(actual);
  });

  it('not hidden: should work when the element is inside shadow DOM', () => {
    let tree, node;
    // shadow DOM v1 - note: v0 is compatible with this code, so no need
    // to specifically test this
    fixture.innerHTML = '<div></div>';
    makeShadowTreeHidden(fixture.firstChild);
    tree = axe.utils.getFlattenedTree(fixture.firstChild);
    node = axe.utils.querySelectorAll(tree, 'input')[0];
    assert.isTrue(isVisibleToScreenReaders(node));
  });

  it('hidden: should work when the element is inside shadow DOM', () => {
    let tree, node;
    // shadow DOM v1 - note: v0 is compatible with this code, so no need
    // to specifically test this
    fixture.innerHTML = '<div style="display:none"></div>';
    makeShadowTreeHidden(fixture.firstChild);
    tree = axe.utils.getFlattenedTree(fixture.firstChild);
    node = axe.utils.querySelectorAll(tree, 'input')[0];
    assert.isFalse(isVisibleToScreenReaders(node));
  });

  it('should work with hidden slotted elements', () => {
    function createContentSlotted() {
      const group = document.createElement('div');
      group.innerHTML =
        '<div id="target" style="display:none;">Stuff<slot></slot></div>';
      return group;
    }
    function makeShadowTree(node) {
      const root = node.attachShadow({ mode: 'open' });
      const div = document.createElement('div');
      root.appendChild(div);
      div.appendChild(createContentSlotted());
    }
    fixture.innerHTML = '<div><p><a>hello</a></p></div>';
    makeShadowTree(fixture.firstChild);
    const tree = axe.utils.getFlattenedTree(fixture.firstChild);
    const vNode = axe.utils.querySelectorAll(tree, 'a')[0];
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  describe('SerialVirtualNode', () => {
    it('should return false if `aria-hidden` is set', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-hidden': true
        }
      });
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });

    it('should return false if `aria-hidden` is set on parent', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const parentVNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-hidden': true
        }
      });
      parentVNode.children = [vNode];
      vNode.parent = parentVNode;
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });

    it('should return false if `inert` is set', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          inert: true
        }
      });
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });

    it('should return false if `inert` is set on parent', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const parentVNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          inert: true
        }
      });
      parentVNode.children = [vNode];
      vNode.parent = parentVNode;
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });
  });
});
