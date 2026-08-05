describe('dom.isHiddenWithCSS', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const isHiddenWithCSS = axe.commons.dom.isHiddenWithCSS;
  const origComputedStyle = window.getComputedStyle;
  const queryFixture = axe.testUtils.queryFixture;

  function createContentSlotted(mainProps, targetProps) {
    const group = document.createElement('div');
    group.innerHTML = `<main style="${mainProps}"><p style="${targetProps}"></p></main>`;
    return group;
  }

  function makeShadowTree(node, mainProps, targetProps) {
    const root = node.attachShadow({ mode: 'open' });
    const content = createContentSlotted(mainProps, targetProps);
    root.appendChild(content);
  }

  afterEach(() => {
    window.getComputedStyle = origComputedStyle;
    document.getElementById('fixture').innerHTML = '';
  });

  it('should throw an error if computedStyle returns null', () => {
    window.getComputedStyle = () => {
      return null;
    };
    const fakeNode = {
      nodeType: Node.ELEMENT_NODE,
      nodeName: 'div'
    };
    assert.throws(() => {
      isHiddenWithCSS(fakeNode);
    });
  });

  it('should return false on static-positioned, visible element', () => {
    fixture.innerHTML = '<div id="target">I am visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return true on static-positioned, hidden element', () => {
    fixture.innerHTML =
      '<div id="target" style="display:none">I am not visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false on absolutely positioned elements that are on-screen', () => {
    fixture.innerHTML =
      '<div id="target" style="position: absolute; left: 10px; right: 10px">I am visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for off-screen and aria-hidden element', () => {
    fixture.innerHTML =
      '<button id="target" aria-hidden=“true” style=“position:absolute: top:-999em”>I am visible</button>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false on fixed position elements that are on-screen', () => {
    fixture.innerHTML =
      '<div id="target" style="position:fixed; bottom: 0; left: 0;">I am visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for off-screen absolutely positioned element', () => {
    fixture.innerHTML =
      '<div id="target" style="position: absolute; left: -9999px">I am visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for off-screen fixed positioned element', () => {
    fixture.innerHTML =
      '<div id="target" style="position: fixed; top: -9999px">I am visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false on detached elements', () => {
    const el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false on a document', () => {
    const actual = isHiddenWithCSS(document);
    assert.isFalse(actual);
  });

  it('should return false if static-position but top/left is set', () => {
    fixture.innerHTML =
      '<div id="target" style="top: -9999px; left: -9999px; right: -9999px; bottom: -9999px;">I am visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false, and not be affected by `aria-hidden`', () => {
    fixture.innerHTML =
      '<div id="target" aria-hidden="true">I am visible with css (although hidden to screen readers)</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for STYLE node', () => {
    fixture.innerHTML = "<style id='target'>body {font-size: 200%}</style>";
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for SCRIPT node', () => {
    fixture.innerHTML =
      "<script id='target' type='text/javascript' src='temp.js'></script>";
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  // `display` test
  it('should return true for if parent of element set to `display:none`', () => {
    fixture.innerHTML = html`
      <div style="display:none">
        <div style="display:block">
          <p id="target">I am not visible</p>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return true for if parent of element set to `display:none`', () => {
    fixture.innerHTML = html`
      <div style="display:none">
        <div style="display:block">
          <p id="target" style="display:block">I am not visible</p>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false for if parent of element set to `display:block`', () => {
    fixture.innerHTML = html`
      <div>
        <div style="display:block">
          <p id="target" style="display:block">I am visible</p>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return true if `display:none` inside shadowDOM', () => {
    fixture.innerHTML = '<div></div>';
    makeShadowTree(fixture.firstChild, 'display:none;', '');
    const tree = axe.utils.getFlattenedTree(fixture.firstChild);
    const el = axe.utils.querySelectorAll(tree, 'p')[0];
    const actual = isHiddenWithCSS(el.actualNode);
    assert.isTrue(actual);
  });

  // `visibility` test
  it('should return true for element that has `visibility:hidden`', () => {
    fixture.innerHTML =
      '<div id="target" style="visibility: hidden;">I am not visible</div>';
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', () => {
    fixture.innerHTML = html`
      <div style="visibility:hidden;">
        <div style="visibility:visible;">
          <div id="target">I am visible</div>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', () => {
    fixture.innerHTML = html`
      <div style="visibility:hidden">
        <div style="visibility:hidden">
          <div style="visibility:visible" id="target">I am visible</div>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return true and as parent is set to `visibility:hidden`', () => {
    fixture.innerHTML = html`
      <div style="visibility: hidden;">
        <div>
          <div id="target">I am not visible</div>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return true as parent shadowDOM host is set to `visibility:hidden`', () => {
    fixture.innerHTML = '<div></div>';
    makeShadowTree(fixture.firstChild, 'visibility:hidden', '');
    const tree = axe.utils.getFlattenedTree(fixture.firstChild);
    const el = axe.utils.querySelectorAll(tree, 'p')[0];
    const actual = isHiddenWithCSS(el.actualNode);
    assert.isTrue(actual);
  });

  it('should return false as parent shadowDOM host  set to `visibility:hidden` is overriden', () => {
    fixture.innerHTML = '<div></div>';
    makeShadowTree(
      fixture.firstChild,
      'visibility:hidden',
      'visibility:visible'
    );
    const tree = axe.utils.getFlattenedTree(fixture.firstChild);
    const el = axe.utils.querySelectorAll(tree, 'p')[0];
    const actual = isHiddenWithCSS(el.actualNode);
    assert.isFalse(actual);
  });

  // mixing display and visibility
  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', () => {
    fixture.innerHTML = html`
      <div style="display:none;">
        <div style="visibility:visible;">
          <div id="target">I am not visible</div>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false and compute using both `display` and `visibility` set on element and parent(s)', () => {
    fixture.innerHTML = html`
      <div style="display:block;">
        <div style="visibility:visible;">
          <div id="target">I am visible</div>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', () => {
    fixture.innerHTML = html`
      <div style="display:block;">
        <div style="visibility:visible;">
          <div id="target" style="visibility:hidden">I am not visible</div>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', () => {
    fixture.innerHTML = html`
      <div style="visibility:hidden">
        <div style="display:none;">
          <div id="target" style="visibility:visible">I am not visible</div>
        </div>
      </div>
    `;
    const el = document.getElementById('target');
    const actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  describe('with virtual nodes', () => {
    it('returns false when virtual nodes are visible', () => {
      const vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(isHiddenWithCSS(vNode));
    });

    it('returns true when virtual nodes are hidden', () => {
      const vNode = queryFixture(
        '<div id="target" style="display:none"></div>'
      );
      assert.isTrue(isHiddenWithCSS(vNode));
    });
  });
});
