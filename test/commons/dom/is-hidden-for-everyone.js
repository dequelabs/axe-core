describe('dom.isHiddenForEveryone', () => {
  'use strict';

  const fixture = document.getElementById('fixture');
  const shadowSupported = axe.testUtils.shadowSupport.v1;
  const isHiddenForEveryone = axe.commons.dom.isHiddenForEveryone;
  const queryFixture = axe.testUtils.queryFixture;
  const contentVisibilitySupported = CSS.supports('content-visibility: hidden');

  function createContentSlotted(mainProps, targetProps) {
    const group = document.createElement('div');
    group.innerHTML =
      '<main style="' +
      mainProps +
      '"><p style="' +
      targetProps +
      '"></p></main>';
    return group;
  }

  function makeShadowTree(node, mainProps, targetProps) {
    const root = node.attachShadow({ mode: 'open' });
    const newNode = createContentSlotted(mainProps, targetProps);
    root.appendChild(newNode);
  }

  it('should return false on static-positioned, visible element', () => {
    const vNode = queryFixture('<div id="target">I am visible</div>');
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true on static-positioned, hidden element', () => {
    const vNode = queryFixture(
      '<div id="target" style="display:none">I am not visible</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false on absolutely positioned elements that are on-screen', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; left: 10px; right: 10px">I am visible</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false for off-screen and aria-hidden element', () => {
    const vNode = queryFixture(
      '<button id="target" aria-hidden=“true” style=“position:absolute: top:-999em”>I am visible</button>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false on fixed position elements that are on-screen', () => {
    const vNode = queryFixture(
      '<div id="target" style="position:fixed; bottom: 0; left: 0;">I am visible</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false for off-screen absolutely positioned element', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; left: -9999px">I am visible</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false for off-screen fixed positioned element', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: fixed; top: -9999px">I am visible</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true on detached elements', () => {
    const el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';
    axe.testUtils.flatTreeSetup(el);
    const actual = isHiddenForEveryone(el);
    assert.isTrue(actual);
  });

  it('should return false on body', () => {
    axe.testUtils.flatTreeSetup(document.body);
    const actual = isHiddenForEveryone(document.body);
    assert.isFalse(actual);
  });

  it('should return false on html', () => {
    axe.testUtils.flatTreeSetup(document.documentElement);
    const actual = isHiddenForEveryone(document.documentElement);
    assert.isFalse(actual);
  });

  it('should return false if static-position but top/left is set', () => {
    const vNode = queryFixture(
      '<div id="target" style="top: -9999px; left: -9999px; right: -9999px; bottom: -9999px;">I am visible</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false, and not be affected by `aria-hidden`', () => {
    const vNode = queryFixture(
      '<div id="target" aria-hidden="true">I am visible with css (although hidden to screen readers)</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true for STYLE node', () => {
    const vNode = queryFixture(
      "<style id='target'>body {font-size: 200%}</style>"
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return true for SCRIPT node', () => {
    const vNode = queryFixture(
      "<script id='target' type='text/javascript' src='temp.js'></script>"
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return true for if parent of element set to `display:none`', () => {
    const vNode = queryFixture(
      '<div style="display:none">' +
        '<div style="display:block">' +
        '<p id="target" style="display:block">I am not visible</p>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false for if parent of element set to `display:block`', () => {
    const vNode = queryFixture(
      '<div>' +
        '<div style="display:block">' +
        '<p id="target" style="display:block">I am visible</p>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  // `visibility` test
  it('should return true for element that has `visibility:hidden`', () => {
    const vNode = queryFixture(
      '<div id="target" style="visibility: hidden;">I am not visible</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', () => {
    const vNode = queryFixture(
      '<div style="visibility:hidden;">' +
        '<div style="visibility:visible;">' +
        '<div id="target">I am visible</div>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', () => {
    const vNode = queryFixture(
      '<div style="visibility:hidden">' +
        '<div style="visibility:hidden">' +
        '<div style="visibility:visible" id="target">I am visible</div>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true and as parent is set to `visibility:hidden`', () => {
    const vNode = queryFixture(
      '<div style="visibility: hidden;">' +
        '<div>' +
        '<div id="target">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  // mixing display and visibility
  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', () => {
    const vNode = queryFixture(
      '<div style="display:none;">' +
        '<div style="visibility:visible;">' +
        '<div id="target">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false and compute using both `display` and `visibility` set on element and parent(s)', () => {
    const vNode = queryFixture(
      '<div style="display:block;">' +
        '<div style="visibility:visible;">' +
        '<div id="target">I am visible</div>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', () => {
    const vNode = queryFixture(
      '<div style="display:block;">' +
        '<div style="visibility:visible;">' +
        '<div id="target" style="visibility:hidden">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', () => {
    const vNode = queryFixture(
      '<div style="visibility:hidden">' +
        '<div style="display:none;">' +
        '<div id="target" style="visibility:visible">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    const actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  describe('details', () => {
    it('should return true for element in closed details', () => {
      const vNode = queryFixture(`
        <details>
          <summary>Hello World</summary>
          <p id="target">Hidden</p>
        </details>
      `);
      const actual = isHiddenForEveryone(vNode);
      assert.isTrue(actual);
    });

    it('should return false for closed details', () => {
      const vNode = queryFixture(`
        <details id="target">
          <summary>Hello World</summary>
          <p>Hidden</p>
        </details>
      `);
      const actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    });

    it('should return false for summary element closed details', () => {
      const vNode = queryFixture(`
        <details>
          <summary id="target">Hello World</summary>
          <p>Hidden</p>
        </details>
      `);
      const actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    });

    it('should return false for element in open details', () => {
      const vNode = queryFixture(`
        <details open>
          <summary>Hello World</summary>
          <p id="target">Hidden</p>
        </details>
      `);
      const actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    });

    it('should return true for grandchild element in closed details', () => {
      const vNode = queryFixture(`
        <details>
          <summary>Hello World</summary>
          <div><p id="target">Hidden</p></div>
        </details>
      `);
      const actual = isHiddenForEveryone(vNode);
      assert.isTrue(actual);
    });

    it('should return true for grandchild summary in close details', () => {
      const vNode = queryFixture(`
        <details>
          <div><summary id="target">Hello World</summary></div>
          <div><p>Hidden</p></div>
        </details>
      `);
      const actual = isHiddenForEveryone(vNode);
      assert.isTrue(actual);
    });

    it('should return true for not first summary in close details', () => {
      const vNode = queryFixture(`
        <details>
          <summary>Hello World</summary>
          <summary id="target">Not summary</summary>
          <div><p>Hidden</p></div>
        </details>
      `);
      const actual = isHiddenForEveryone(vNode);
      assert.isTrue(actual);
    });
  });

  (shadowSupported ? it : it.skip)(
    'should return true if `display:none` inside shadowDOM',
    () => {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(fixture.firstChild, 'display:none;', '');
      const tree = axe.utils.getFlattenedTree(fixture.firstChild);
      const vNode = axe.utils.querySelectorAll(tree, 'p')[0];
      const actual = isHiddenForEveryone(vNode);
      assert.isTrue(actual);
    }
  );

  (shadowSupported ? it : xit)(
    'should return true as parent shadowDOM host is set to `visibility:hidden`',
    () => {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(fixture.firstChild, 'visibility:hidden', '');
      const tree = axe.utils.getFlattenedTree(fixture.firstChild);
      const vNode = axe.utils.querySelectorAll(tree, 'p')[0];
      const actual = isHiddenForEveryone(vNode);
      assert.isTrue(actual);
    }
  );

  (shadowSupported ? it : xit)(
    'should return false as parent shadowDOM host  set to `visibility:hidden` is overriden',
    () => {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(
        fixture.firstChild,
        'visibility:hidden',
        'visibility:visible'
      );
      const tree = axe.utils.getFlattenedTree(fixture.firstChild);
      const vNode = axe.utils.querySelectorAll(tree, 'p')[0];
      const actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    }
  );

  (contentVisibilitySupported ? it : xit)(
    'should return true for `content-visibility: hidden` parent',
    () => {
      const vNode = queryFixture(
        '<div style="content-visibility: hidden"><div id="target">Hidden</div></div>'
      );
      assert.isTrue(isHiddenForEveryone(vNode));
    }
  );

  (contentVisibilitySupported ? it : xit)(
    'should return false for `content-visibility: hidden`',
    () => {
      const vNode = queryFixture(
        '<div id="target" style="content-visibility: hidden"></div>'
      );
      assert.isFalse(isHiddenForEveryone(vNode));
    }
  );

  describe('SerialVirtualNode', () => {
    it('should return false on detached virtual nodes', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    });

    it('should return false for element in closed details', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const detailsVNode = new axe.SerialVirtualNode({
        nodeName: 'details'
      });
      vNode.parent = detailsVNode;
      detailsVNode.children = [vNode];

      const actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    });
  });
});
