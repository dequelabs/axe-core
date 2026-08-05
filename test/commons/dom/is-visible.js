describe('dom.isVisible', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let computedStyleStub;
  const flatTreeSetup = axe.testUtils.flatTreeSetup;

  afterEach(() => {
    document.getElementById('fixture').innerHTML = '';
    axe._tree = undefined;

    if (computedStyleStub) {
      computedStyleStub.restore();
      computedStyleStub = null;
    }
  });

  describe('default usage', () => {
    // Firefox returns `null` if accessed inside a hidden iframe
    it('should return false if computedStyle return null for whatever reason', () => {
      computedStyleStub = sinon.stub(window, 'getComputedStyle').returns(null);
      const el = document.createElement('div');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return true on statically-positioned, visible elements', () => {
      fixture.innerHTML = '<div id="target">Hello!</div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should return true on absolutely positioned elements that are on-screen', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should respect position: fixed', () => {
      fixture.innerHTML =
        '<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should properly calculate offsets according the offsetParent', () => {
      fixture.innerHTML = html`
        <div style="position: absolute; top: 400px; left: 400px;">
          <div
            id="target"
            style="position: absolute; top: -400px; left: -400px"
          >
            Hi
          </div>
        </div>
      `;
      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should return false if moved offscreen with left', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; left: -9999px">Hi</div>';
      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return false if moved offscreen with top', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; top: -9999px">Hi</div>';
      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return false on detached elements', () => {
      const el = document.createElement('div');
      el.innerHTML = 'I am not visible because I am detached!';

      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return true on a document', () => {
      assert.isTrue(axe.commons.dom.isVisible(document));
    });

    it('should return false on STYLE tag', () => {
      const vNode = queryFixture(
        '<style id="target"> @import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"; .green { background-color: green; } </style>'
      );
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
      assert.isFalse(actual);
    });

    it('should return false on NOSCRIPT tag', () => {
      const vNode = queryFixture(
        '<noscript id="target"><p class="invisible"><img src="/piwik/piwik.php?idsite=1" alt="" /></p></noscript>'
      );
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
      assert.isFalse(actual);
    });

    it('should return false on TEMPLATE tag', () => {
      const vNode = queryFixture(
        '<template id="target"><div>Name:</div></template>'
      );
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
      assert.isFalse(actual);
    });

    it('should return true if positioned statically but top/left is set', () => {
      fixture.innerHTML = html`
        <div
          id="target"
          style="top: -9999px; left: -9999px;
        right: -9999px; bottom: -9999px;"
        >
          Hi
        </div>
      `;
      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should not be affected by `aria-hidden`', () => {
      fixture.innerHTML =
        '<div id="target" aria-hidden="true">Hidden from screen readers</div>';

      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should not calculate position on parents', () => {
      fixture.innerHTML = html`
        <div style="position: absolute; top: -400px; left: -400px;">
          <div id="target" style="position: absolute; top: 500px; left: 500px">
            Hi
          </div>
        </div>
      `;

      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should know how `visibility` works', () => {
      fixture.innerHTML = html`
        <div style="visibility: hidden;">
          <div id="target" style="visibility: visible;">Hi</div>
        </div>
      `;

      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should detect clip rect hidden text technique', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        width: 1px; height: 1px;
        position: absolute;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div id="target" style="${clip}">Hi</div>`;

      el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should detect clip rect hidden text technique using position: fixed', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        width: 1px; height: 1px;
        position: fixed;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div id="target" style="${clip}">Hi</div>`;

      el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should detect when clip is not applied because of positioning', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        position: relative;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div id="target" style="${clip}">Hi</div>`;

      el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should detect clip rect hidden text technique on parent', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        width: 1px; height: 1px;
        position: absolute;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div style="${clip}">
        <div id="target">Hi</div>
      </div>`;

      el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should detect when clip is not applied because of positioning on parent', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        position: relative;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div style="${clip}">
        <div id="target">Hi</div>
      </div>`;

      el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isTrue(axe.commons.dom.isVisible(el));
    });

    it('should detect poorly hidden clip rects', () => {
      let el;

      const clip = `
        clip: rect(5px 1px 1px 5px);
        clip: rect(5px, 1px, 1px, 5px);
        width: 1px; height: 1px;
        position: absolute;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div id="target" style="${clip}">Hi</div>`;

      el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return false for display: none', () => {
      fixture.innerHTML = '<div id="target" style="display: none">Hello!</div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return false for opacity: 0', () => {
      fixture.innerHTML = '<div id="target" style="opacity: 0">Hello!</div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return false for opacity: 0', () => {
      fixture.innerHTML = '<div id="target" style="opacity: 0">Hello!</div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return false for 0 height scrollable region', () => {
      fixture.innerHTML =
        '<div style="overflow: scroll; height: 0"><div id="target">Hello!</div></div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should return false for 0 width scrollable region', () => {
      fixture.innerHTML =
        '<div style="overflow: scroll; width: 0"><div id="target">Hello!</div></div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('returns false for `AREA` without closest `MAP` element', () => {
      const vNode = queryFixture(
        '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>'
      );
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
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
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
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
      const actual = axe.commons.dom.isVisible(target);
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
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
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
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
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
      const actual = axe.commons.dom.isVisible(vNode.actualNode);
      assert.isTrue(actual);
    });

    it('should detect clip-path hidden text technique', () => {
      fixture.innerHTML =
        '<div id="target" style="clip-path: inset(50%);">Hi</div>';

      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

    it('should detect clip-path hidden text technique on parent', () => {
      fixture.innerHTML = html`
        <div style="clip-path: circle(0%);">
          <div id="target">Hi</div>
        </div>
      `;

      const el = document.getElementById('target');
      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });

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
      assert.isTrue(axe.commons.dom.isVisible(el.actualNode));
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
      assert.isFalse(axe.commons.dom.isVisible(el.actualNode));
    });
    it('should return false if element is visually hidden using position absolute, overflow hidden, and a very small height', () => {
      fixture.innerHTML =
        '<div id="target" style="position:absolute; height: 1px; overflow: hidden;">StickySticky</div>';
      const el = document.getElementById('target');

      flatTreeSetup(fixture);
      assert.isFalse(axe.commons.dom.isVisible(el));
    });
  });

  describe('screen readers', () => {
    // Firefox returns `null` if accessed inside a hidden iframe
    it('should return false if computedStyle return null for whatever reason', () => {
      computedStyleStub = sinon.stub(window, 'getComputedStyle').returns(null);
      const el = document.createElement('div');
      assert.isFalse(axe.commons.dom.isVisible(el, true));
    });

    it('should return true on staticly-positioned, visible elements', () => {
      fixture.innerHTML = '<div id="target">Hello!</div>';
      const el = document.getElementById('target');

      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return true on absolutely positioned elements that are on-screen', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>';
      const el = document.getElementById('target');

      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should respect position: fixed', () => {
      fixture.innerHTML =
        '<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>';
      const el = document.getElementById('target');

      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should properly calculate offsets according the offsetParent', () => {
      fixture.innerHTML = html`
        <div style="position: absolute; top: 400px; left: 400px;">
          <div
            id="target"
            style="position: absolute; top: -400px; left: -400px"
          >
            Hi
          </div>
        </div>
      `;
      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return true if moved offscreen with left', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; left: -9999px">Hi</div>';
      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return true if moved offscreen with top', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; top: -9999px">Hi</div>';
      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return true if moved offscreen with right', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; right: -9999px">Hi</div>';
      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return true if moved offscreen with bottom', () => {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; bottom: -9999px">Hi</div>';
      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return true if text is moved offscreen with text-indent', () => {
      fixture.innerHTML =
        '<div id="target" style="text-indent: -9999px">Hi</div>';
      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return false on detached elements', () => {
      const el = document.createElement('div');
      el.innerHTML = 'I am not visible because I am detached!';

      assert.isFalse(axe.commons.dom.isVisible(el, true));
    });

    it('should return true on a document', () => {
      assert.isTrue(axe.commons.dom.isVisible(document, true));
    });

    it('should return true if positioned staticly but top/left is set', () => {
      fixture.innerHTML = html`
        <div
          id="target"
          style="top: -9999px; left: -9999px;
        right: -9999px; bottom: -9999px;"
        >
          Hi
        </div>
      `;
      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should return false if `aria-hidden` is set', () => {
      fixture.innerHTML =
        '<div id="target" aria-hidden="true">Hidden from screen readers</div>';

      const el = document.getElementById('target');
      assert.isFalse(axe.commons.dom.isVisible(el, true));
    });

    it('should return false if `aria-hidden` is set on parent', () => {
      fixture.innerHTML =
        '<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>';

      const el = document.getElementById('target');
      assert.isFalse(axe.commons.dom.isVisible(el, true));
    });

    it('should not calculate position on parents', () => {
      fixture.innerHTML = html`
        <div style="position: absolute; top: -400px; left: -400px;">
          <div id="target" style="position: absolute; top: 500px; left: 500px">
            Hi
          </div>
        </div>
      `;

      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should know how `visibility` works', () => {
      fixture.innerHTML = html`
        <div style="visibility: hidden;">
          <div id="target" style="visibility: visible;">Hi</div>
        </div>
      `;

      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should detect clip rect hidden text technique', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        width: 1px; height: 1px;
        position: absolute;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div id="target" style="${clip}">Hi</div>`;

      el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should detect even when clip is not applied because of positioning', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        position: relative;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div id="target" style="${clip}">Hi</div>`;

      el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should detect clip rect hidden text technique on parent', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        width: 1px; height: 1px;
        position: absolute;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div style="${clip}">
        <div id="target">Hi</div>
      </div>`;

      el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should detect even when clip is not applied because of positioning on parent', () => {
      let el;

      const clip = `
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        position: relative;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div style="${clip}">
        <div id="target">Hi</div>
      </div>`;

      el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should detect poorly hidden clip rects', () => {
      let el;

      const clip = `
        clip: rect(5px 1px 1px 5px);
        clip: rect(5px, 1px, 1px, 5px);
        width: 1px; height: 1px;
        position: absolute;
        overflow: hidden;
      `;

      fixture.innerHTML = html`<div id="target" style="${clip}">Hi</div>`;

      el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should detect clip-path hidden text technique', () => {
      fixture.innerHTML =
        '<div id="target" style="clip-path: inset(50%);">Hi</div>';

      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });

    it('should detect clip-path hidden text technique on parent', () => {
      fixture.innerHTML = html`
        <div style="clip-path: circle(0%);">
          <div id="target">Hi</div>
        </div>
      `;

      const el = document.getElementById('target');
      assert.isTrue(axe.commons.dom.isVisible(el, true));
    });
  });

  describe('SerialVirtualNode', () => {
    it('should return true on statically-positioned, visible elements', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      assert.isTrue(axe.commons.dom.isVisible(vNode));
    });

    it('should return false on STYLE tag', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'style'
      });
      const actual = axe.commons.dom.isVisible(vNode);
      assert.isFalse(actual);
    });

    it('should return false on NOSCRIPT tag', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'noscript'
      });
      const actual = axe.commons.dom.isVisible(vNode);
      assert.isFalse(actual);
    });

    it('should return false on TEMPLATE tag', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'template'
      });
      const actual = axe.commons.dom.isVisible(vNode);
      assert.isFalse(actual);
    });

    it('should not be affected by `aria-hidden`', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-hidden': true
        }
      });
      assert.isTrue(axe.commons.dom.isVisible(vNode));
    });

    describe('screen readers', () => {
      it('should return false if `aria-hidden` is set', () => {
        const vNode = new axe.SerialVirtualNode({
          nodeName: 'div',
          attributes: {
            'aria-hidden': true
          }
        });
        assert.isFalse(axe.commons.dom.isVisible(vNode, true));
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
        assert.isFalse(axe.commons.dom.isVisible(vNode, true));
      });
    });
  });
});
