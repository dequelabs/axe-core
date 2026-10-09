describe('text.visible', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const visibleVirtual = axe.commons.text.visibleVirtual;
  const fontApiSupport = !!document.fonts;

  before(done => {
    if (!fontApiSupport) {
      done();
      return;
    }
    const materialFont = new FontFace(
      'Material Icons',
      'url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)'
    );
    materialFont.load().then(() => {
      document.fonts.add(materialFont);
      done();
    });
  });

  afterEach(() => {
    document.getElementById('fixture').innerHTML = '';
  });

  describe('non-screen-reader', () => {
    it('should not return elements with visibility: hidden', () => {
      fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should handle implicitly recursive calls', () => {
      fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'HelloHi');
    });

    it('should handle explicitly recursive calls', () => {
      fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], null, false), 'HelloHi');
    });

    it('should handle non-recursive calls', () => {
      fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], null, true), 'Hello');
    });

    it('should know how visibility works', () => {
      fixture.innerHTML = html`
        Hello
        <span style="visibility: hidden;">
          <span style="visibility: visible;">Hi</span>
        </span>
      `;

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello Hi');
    });

    it('should not return elements with display: none', () => {
      fixture.innerHTML =
        'Hello<span style="display: none;"><span>Hi</span></span>';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should trim the result', () => {
      fixture.innerHTML =
        '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello Hi');
    });

    it('should ignore script and style tags', () => {
      fixture.innerHTML = html`
        <script>
          // hello
        </script>
        <style>
          /*hello */
        </style>
        Hello
      `;

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should not take into account position of parents', () => {
      fixture.innerHTML = html`
        <div style="position: absolute; top: -9999px;">
          <div style="position: absolute; top: 10000px;">Hello</div>
        </div>
      `;

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should correctly handle slotted elements', () => {
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
      assert.equal(visibleVirtual(tree[0]), 'Stuffhello');
    });

    it('should treat <br> elements as a space', () => {
      fixture.innerHTML = '<button>button<br>label</button>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'button label');
    });

    it('should keep a whitespace-only element as a word separator', () => {
      fixture.innerHTML =
        '<a><span>Download</span><span> </span><span>specification</span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Download specification');
    });

    it('should keep whitespace at the edge of a child element', () => {
      fixture.innerHTML = '<a><span>Hello </span><span>world</span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello world');
    });

    it('should collapse whitespace between elements', () => {
      fixture.innerHTML =
        '<span>Hello   &nbsp;\u00A0</span><span>  &nbsp;\r\n   </span>' +
        '<span>     \n \n &nbsp; \nHi</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello Hi');
    });

    it('should separate the text of adjacent block elements', () => {
      fixture.innerHTML = '<a><p>Product</p><p>Details</p></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Product Details');
    });

    it('should separate the text of a block element from inline text', () => {
      fixture.innerHTML = '<a><span>Product</span><div>Details</div>Page</a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Product Details Page');
    });

    it('should separate the text of nested block elements', () => {
      fixture.innerHTML =
        '<a><div><h3>Product</h3></div><span><p>Details</p></span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Product Details');
    });

    it('should separate the text of list items and table cells', () => {
      fixture.innerHTML =
        '<ul><li>Product</li><li>Details</li></ul>' +
        '<table><tr><td>Product</td><td>Details</td></tr></table>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Product Details Product Details');
    });

    it('should not separate the text of block elements displayed inline', () => {
      fixture.innerHTML =
        '<a><div style="display: inline">A</div>' +
        '<div style="display: inline-block">C</div>' +
        '<div style="display: contents">T</div></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'ACT');
    });

    it('should not separate the text of ruby annotations', () => {
      fixture.innerHTML = '<a><ruby>漢<rt>kan</rt>字<rt>ji</rt></ruby></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), '漢kan字ji');
    });

    it('should not separate the text of phrasing elements displayed as blocks', () => {
      fixture.innerHTML =
        '<a><span style="display: block">Product</span>' +
        '<span style="display: block">Details</span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'ProductDetails');
    });

    it('should not separate text around a block element with no visible text', () => {
      fixture.innerHTML =
        '<a><span>Product</span><div></div>' +
        '<div style="display: none">Hidden</div><span>Details</span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'ProductDetails');
    });

    it('should separate the text of block elements with hidden siblings', () => {
      fixture.innerHTML =
        '<a><p>Product</p><p style="visibility: hidden">Hidden</p>' +
        '<p>Details</p></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Product Details');
    });

    it('should separate the text of block elements in shadow DOM', () => {
      const vNode = axe.testUtils.queryShadowFixture(
        '<a id="target"><span id="shadow"></span></a>',
        '<p>Product</p><p>Details</p>'
      );
      assert.equal(visibleVirtual(vNode), 'Product Details');
    });

    it('should separate the text of slotted block elements', () => {
      const vNode = axe.testUtils.queryShadowFixture(
        '<a id="target"><span id="shadow"><p>Product</p><p>Details</p></span></a>',
        '<span><slot></slot></span>'
      );
      assert.equal(visibleVirtual(vNode), 'Product Details');
    });

    it('should separate the text of block elements without an actual node', () => {
      const link = new axe.SerialVirtualNode({ nodeName: 'a' });
      link.children = ['Product', 'Details'].map(word => {
        const paragraph = new axe.SerialVirtualNode({ nodeName: 'p' });
        const text = new axe.SerialVirtualNode({
          nodeName: '#text',
          nodeType: 3,
          nodeValue: word
        });
        paragraph.parent = link;
        paragraph.children = [text];
        text.parent = paragraph;
        return paragraph;
      });
      assert.equal(visibleVirtual(link), 'Product Details');
    });

    it('should not separate the text of block elements when not recursing', () => {
      fixture.innerHTML = 'Product<p>Hidden</p>Details';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], false, true), 'ProductDetails');
    });
  });

  describe('screen reader', () => {
    it('should not return elements with visibility: hidden', () => {
      fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should know how visibility works', () => {
      fixture.innerHTML = html`
        Hello
        <span style="visibility: hidden;">
          <span style="visibility: visible;">Hi</span>
        </span>
      `;

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello Hi');
    });

    it('should not return elements with display: none', () => {
      fixture.innerHTML =
        'Hello<span style="display: none;"><span>Hi</span></span>';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should trim the result', () => {
      fixture.innerHTML =
        '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello Hi');
    });

    it('should keep a whitespace-only element as a word separator', () => {
      fixture.innerHTML =
        '<a><span>Download</span><span> </span><span>specification</span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Download specification');
    });

    it('should keep whitespace at the edge of a child element', () => {
      fixture.innerHTML = '<a><span>Hello </span><span>world</span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello world');
    });

    it('should collapse whitespace between elements', () => {
      fixture.innerHTML =
        '<span>Hello   &nbsp;\u00A0</span><span>  &nbsp;\r\n   </span>' +
        '<span>     \n \n &nbsp; \nHi</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello Hi');
    });

    it('should separate the text of adjacent block elements', () => {
      fixture.innerHTML = '<a><p>Product</p><p>Details</p></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Product Details');
    });

    it('should not separate the text of block elements displayed inline', () => {
      fixture.innerHTML =
        '<a><div style="display: inline">A</div>' +
        '<div style="display: inline-block">C</div>' +
        '<div style="display: contents">T</div></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'ACT');
    });

    it('should not separate the text of phrasing elements displayed as blocks', () => {
      fixture.innerHTML =
        '<a><span style="display: block">Product</span>' +
        '<span style="display: block">Details</span></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'ProductDetails');
    });

    it('should separate the text of block elements around aria-hidden content', () => {
      fixture.innerHTML =
        '<a><p>Product</p><p aria-hidden="true">Hidden</p><p>Details</p></a>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Product Details');
    });

    it('should ignore script and style tags', () => {
      fixture.innerHTML = html`
        <script>
          // hello
        </script>
        <style>
          /*hello */
        </style>
        Hello
      `;

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should not consider offscreen text as hidden (position)', () => {
      fixture.innerHTML = html`
        <div style="position: absolute; top: -9999px;">
          <div>Hello</div>
        </div>
      `;

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should not consider offscreen text as hidden (text-indent)', () => {
      fixture.innerHTML = html`
        <div style="text-indent: -9999px;">Hello</div>
      `;

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });
  });

  describe('options', () => {
    (fontApiSupport ? it : it.skip)(
      'should exclude icon ligature text when ignoreIconLigature is true',
      () => {
        fixture.innerHTML =
          '<button>next page <span style="font-family: \'Material Icons\'">delete</span></button>';
        const tree = axe.utils.getFlattenedTree(fixture);
        assert.equal(
          visibleVirtual(tree[0], false, false, {
            ignoreIconLigature: true,
            pixelThreshold: 0.1,
            occurrenceThreshold: 3
          }),
          'next page'
        );
      }
    );

    (fontApiSupport ? it : it.skip)(
      'should not exclude icon ligature text when ignoreIconLigature is false',
      () => {
        fixture.innerHTML =
          '<button>next page <span style="font-family: \'Material Icons\'">delete</span></button>';
        const tree = axe.utils.getFlattenedTree(fixture);
        assert.equal(
          visibleVirtual(tree[0], false, false, {
            ignoreIconLigature: false,
            pixelThreshold: 0.1,
            occurrenceThreshold: 3
          }),
          'next page delete'
        );
      }
    );
  });
});
