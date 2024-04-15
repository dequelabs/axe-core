describe('text.visible', () => {
  'use strict';

  const fixture = document.getElementById('fixture');
  const shadowSupported = axe.testUtils.shadowSupport.v1;
  const visibleVirtual = axe.commons.text.visibleVirtual;

  const fontApiSupport = !!document.fonts;

  before(done => {
    if (!fontApiSupport) {
      done();
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
      fixture.innerHTML =
        'Hello <span style="visibility: hidden;">' +
        '<span style="visibility: visible;">Hi</span>' +
        '</span>';

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
      fixture.innerHTML =
        '<script> // hello </script><style> /*hello */</style>' + 'Hello';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should not take into account position of parents', () => {
      fixture.innerHTML =
        '<div style="position: absolute; top: -9999px;">' +
        '<div style="position: absolute; top: 10000px;">Hello</div>' +
        '</div>';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    (fontApiSupport ? it : it.skip)(
      'returns visible text including ligature icon',
      () => {
        fixture.innerHTML =
          'next page <span style="font-family: \'Material Icons\'">delete</span>';

        const tree = axe.utils.getFlattenedTree(fixture);
        assert.equal(visibleVirtual(tree[0]), 'next page delete');
      }
    );

    (fontApiSupport ? it : it.skip)(
      'returns visible text excluding ligature icon when passed ignoreIconLigature option',
      () => {
        fixture.innerHTML =
          'next page <span style="font-family: \'Material Icons\'">delete</span>';

        const tree = axe.utils.getFlattenedTree(fixture);
        assert.equal(
          visibleVirtual(tree[0], false, false, {
            ignoreIconLigature: true
          }),
          'next page'
        );
      }
    );

    (shadowSupported ? it : xit)(
      'should correctly handle slotted elements',
      () => {
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
      }
    );
  });

  describe('screen reader', () => {
    it('should not return elements with visibility: hidden', () => {
      fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should know how visibility works', () => {
      fixture.innerHTML =
        'Hello <span style="visibility: hidden;">' +
        '<span style="visibility: visible;">Hi</span>' +
        '</span>';

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

    it('should ignore script and style tags', () => {
      fixture.innerHTML =
        '<script> // hello </script><style> /*hello */</style>' + 'Hello';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should not consider offscreen text as hidden (position)', () => {
      fixture.innerHTML =
        '<div style="position: absolute; top: -9999px;">' +
        '<div>Hello</div>' +
        '</div>';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should not consider offscreen text as hidden (text-indent)', () => {
      fixture.innerHTML = '<div style="text-indent: -9999px;">' + 'Hello</div>';

      const tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });
  });
});
