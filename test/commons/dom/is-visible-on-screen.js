describe('dom.isVisibleOnScreen', () => {
  const html = axe.testUtils.html;

  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const isIE11 = axe.testUtils.isIE11;
  const isVisibleOnScreen = axe.commons.dom.isVisibleOnScreen;

  it('should return true on statically-positioned, visible elements', () => {
    const vNode = queryFixture('<div id="target">Hello!</div>');

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should return true on absolutely positioned elements that are on-screen', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>'
    );

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should respect position: fixed', () => {
    const vNode = queryFixture(
      '<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>'
    );

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should properly calculate offsets according the offsetParent', () => {
    const vNode = queryFixture(html`
      <div style="position: absolute; top: 400px; left: 400px;">
        <div id="target" style="position: absolute; top: -400px; left: -400px">
          Hi
        </div>
      </div>
    `);
    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should return false if moved offscreen with left', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; left: -9999px">Hi</div>'
    );
    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should return false if moved offscreen with top', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; top: -9999px">Hi</div>'
    );
    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should return false on detached elements', () => {
    const el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';
    axe.testUtils.flatTreeSetup(el);
    assert.isFalse(isVisibleOnScreen(el));
  });

  it('should return true on body', () => {
    axe.testUtils.flatTreeSetup(document.body);
    const actual = isVisibleOnScreen(document.body);
    assert.isTrue(actual);
  });

  it('should return true on html', () => {
    axe.testUtils.flatTreeSetup(document.documentElement);
    const actual = isVisibleOnScreen(document.documentElement);
    assert.isTrue(actual);
  });

  it('should return false on STYLE tag', () => {
    const vNode = queryFixture(
      '<style id="target"> @import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"; .green { background-color: green; } </style>'
    );
    const actual = isVisibleOnScreen(vNode);
    assert.isFalse(actual);
  });

  it('should return false on NOSCRIPT tag', () => {
    const vNode = queryFixture(
      '<noscript id="target"><p class="invisible"><img src="/piwik/piwik.php?idsite=1" alt="" /></p></noscript>'
    );
    const actual = isVisibleOnScreen(vNode);
    assert.isFalse(actual);
  });

  it('should return false on TEMPLATE tag', () => {
    const vNode = queryFixture(
      '<template id="target"><div>Name:</div></template>'
    );
    const actual = isVisibleOnScreen(vNode);
    assert.isFalse(actual);
  });

  it('should return true if positioned statically but top/left is set', () => {
    const vNode = queryFixture(html`
      <div
        id="target"
        style="top: -9999px; left: -9999px;
      right: -9999px; bottom: -9999px;"
      >
        Hi
      </div>
    `);
    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should not be affected by `aria-hidden`', () => {
    const vNode = queryFixture(
      '<div id="target" aria-hidden="true">Hidden from screen readers</div>'
    );

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should not calculate position on parents', () => {
    const vNode = queryFixture(html`
      <div style="position: absolute; top: -400px; left: -400px;">
        <div id="target" style="position: absolute; top: 500px; left: 500px">
          Hi
        </div>
      </div>
    `);

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should know how `visibility` works', () => {
    const vNode = queryFixture(html`
      <div style="visibility: hidden;">
        <div id="target" style="visibility: visible;">Hi</div>
      </div>
    `);

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should detect clip rect hidden text technique', () => {
    const clip = `
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      width: 1px; height: 1px;
      position: absolute;
      overflow: hidden;
    `;

    const vNode = queryFixture(html`<div id="target" style="${clip}">Hi</div>`);

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should detect clip rect hidden text technique using position: fixed', () => {
    const clip = `
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      width: 1px; height: 1px;
      position: fixed;
      overflow: hidden;
    `;

    const vNode = queryFixture(html`<div id="target" style="${clip}">Hi</div>`);

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should detect when clip is not applied because of positioning', () => {
    const clip = `
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      position: relative;
      overflow: hidden;
    `;

    const vNode = queryFixture(html`<div id="target" style="${clip}">Hi</div>`);

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should detect clip rect hidden text technique on parent', () => {
    const clip = `
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      width: 1px; height: 1px;
      position: absolute;
      overflow: hidden;
    `;

    const vNode = queryFixture(
      html`<div style="${clip}">
        <div id="target">Hi</div>
      </div>`
    );

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should detect when clip is not applied because of positioning on parent', () => {
    const clip = `
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      position: relative;
      overflow: hidden;
    `;

    const vNode = queryFixture(
      html`<div style="${clip}">
        <div id="target">Hi</div>
      </div>`
    );

    assert.isTrue(isVisibleOnScreen(vNode));
  });

  it('should detect poorly hidden clip rects', () => {
    const clip = `
      clip: rect(5px 1px 1px 5px);
      clip: rect(5px, 1px, 1px, 5px);
      width: 1px; height: 1px;
      position: absolute;
      overflow: hidden;
    `;

    const vNode = queryFixture(html`<div id="target" style="${clip}">Hi</div>`);

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should return false for display: none', () => {
    const vNode = queryFixture(
      '<div id="target" style="display: none">Hello!</div>'
    );

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should return false for opacity: 0', () => {
    const vNode = queryFixture(
      '<div id="target" style="opacity: 0">Hello!</div>'
    );

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should return false for 0 height scrollable region', () => {
    const vNode = queryFixture(
      '<div style="overflow: scroll; height: 0"><div id="target">Hello!</div></div>'
    );

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should return false for 0 width scrollable region', () => {
    const vNode = queryFixture(
      '<div style="overflow: scroll; width: 0"><div id="target">Hello!</div></div>'
    );

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('returns false for `AREA` without closest `MAP` element', () => {
    const vNode = queryFixture(
      '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>'
    );
    const actual = isVisibleOnScreen(vNode);
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
    const actual = isVisibleOnScreen(vNode);
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
    const actual = isVisibleOnScreen(target);
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
    const actual = isVisibleOnScreen(vNode);
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
    const actual = isVisibleOnScreen(vNode);
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
    const actual = isVisibleOnScreen(vNode);
    assert.isTrue(actual);
  });

  // IE11 either only supports clip paths defined by url() or not at all,
  // MDN and caniuse.com give different results...
  (isIE11 ? it.skip : it)(
    'should detect clip-path hidden text technique',
    () => {
      const vNode = queryFixture(
        '<div id="target" style="clip-path: inset(50%);">Hi</div>'
      );

      assert.isFalse(isVisibleOnScreen(vNode));
    }
  );

  (isIE11 ? it.skip : it)(
    'should detect clip-path hidden text technique on parent',
    () => {
      const vNode = queryFixture(html`
        <div style="clip-path: circle(0%);">
          <div id="target">Hi</div>
        </div>
      `);

      assert.isFalse(isVisibleOnScreen(vNode));
    }
  );

  it('should correctly handle visible slotted elements', () => {
    function createContentSlotted() {
      const group = document.createElement('div');
      group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
      return group;
    }
    function makeShadowTree(node) {
      const root = node.attachShadow({ mode: 'open' });
      const div = document.createElement('div');
      root.appendChild(div);
      div.appendChild(createContentSlotted());
    }
    fixture.innerHTML = '<div><a>hello</a></div>';
    makeShadowTree(fixture.firstChild);
    const tree = axe.utils.getFlattenedTree(fixture.firstChild);
    const el = axe.utils.querySelectorAll(tree, 'a')[0];
    assert.isTrue(isVisibleOnScreen(el.actualNode));
  });
  it('should correctly handle hidden slotted elements', () => {
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
    const el = axe.utils.querySelectorAll(tree, 'a')[0];
    assert.isFalse(isVisibleOnScreen(el.actualNode));
  });

  it('should return false for screen reader only technique', () => {
    const vNode = queryFixture(
      '<div id="target" style="position: absolute; width: 1px; height: 1x; margin: -1px; padding: 0; border: 0; overflow: hidden;">Visually Hidden</div>'
    );

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  it('should return false for element outside "overflow:hidden"', () => {
    const vNode = queryFixture(
      '<div style="overflow: hidden; height: 100px;"><div id="target" style="margin-top: 200px;">Visually Hidden</div></div>'
    );

    assert.isFalse(isVisibleOnScreen(vNode));
  });

  describe('SerialVirtualNode', () => {
    it('should return true on statically-positioned, visible elements', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      assert.isTrue(isVisibleOnScreen(vNode));
    });

    it('should return false on STYLE tag', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'style'
      });
      const actual = isVisibleOnScreen(vNode);
      assert.isFalse(actual);
    });

    it('should return false on NOSCRIPT tag', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'noscript'
      });
      const actual = isVisibleOnScreen(vNode);
      assert.isFalse(actual);
    });

    it('should return false on TEMPLATE tag', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'template'
      });
      const actual = isVisibleOnScreen(vNode);
      assert.isFalse(actual);
    });

    it('should not be affected by `aria-hidden`', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-hidden': true
        }
      });
      assert.isTrue(isVisibleOnScreen(vNode));
    });
  });
});
