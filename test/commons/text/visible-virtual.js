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

    ['transparent', 'rgba(0, 0, 0, 0)', 'rgb(0 0 0 / 0%)'].forEach(color => {
      it(`should exclude text with color: ${color}`, () => {
        fixture.innerHTML = `Hello<span style="color: ${color}">Hi</span>`;
        const tree = axe.utils.getFlattenedTree(fixture);
        assert.equal(visibleVirtual(tree[0]), 'Hello');
      });
    });

    it('should include descendants that override transparent color', () => {
      fixture.innerHTML = html`
        <span style="color: transparent"
          >Hidden<span>Inherited</span
          ><span style="color: black">Visible</span></span
        >
      `;
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Visible');
    });

    it('should include partially transparent text', () => {
      fixture.innerHTML =
        '<span style="color: rgba(0, 0, 0, 0.5)">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should include transparent text painted by a shadow', () => {
      fixture.innerHTML =
        '<span style="color: transparent; text-shadow: 0 0 0 black">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should include transparent text with a visible fill', () => {
      fixture.innerHTML =
        '<span style="color: transparent; -webkit-text-fill-color: black">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should include transparent text painted by a stroke', () => {
      fixture.innerHTML =
        '<span style="color: transparent; -webkit-text-stroke: 1px black">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should exclude text with a transparent fill', () => {
      fixture.innerHTML =
        '<span style="color: black; -webkit-text-fill-color: transparent">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), '');
    });

    it('should exclude text with transparent shadows and stroke', () => {
      fixture.innerHTML =
        '<span style="color: transparent; text-shadow: 0 0 0 transparent; -webkit-text-stroke: 1px transparent">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), '');
    });

    it('should include transparent text with an offset shadow', () => {
      fixture.innerHTML =
        '<span style="color: transparent; text-shadow: 2px 2px 0 black">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should include text painted by a clipped background', () => {
      fixture.innerHTML =
        '<span style="color: transparent; background: linear-gradient(black, blue); background-clip: text">Hello</span>';
      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should include SVG text painted by its fill', () => {
      fixture.innerHTML = html`
        <svg width="200" height="40">
          <text x="0" y="20" style="color: transparent; fill: black">
            Hello
          </text>
        </svg>
      `;
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
  });

  describe('screen reader', () => {
    it('should include transparent text for screen readers and accessible names', () => {
      fixture.innerHTML = '<button style="color: transparent">Hello</button>';
      const tree = axe.testUtils.flatTreeSetup(fixture);
      const button = fixture.querySelector('button');
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
      assert.equal(axe.commons.text.accessibleText(button), 'Hello');
    });

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
