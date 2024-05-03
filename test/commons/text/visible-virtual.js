describe('text.visible', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let visibleVirtual = axe.commons.text.visibleVirtual;

  afterEach(function () {
    document.getElementById('fixture').innerHTML = '';
  });

  describe('non-screen-reader', function () {
    it('should not return elements with visibility: hidden', function () {
      fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';
      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should handle implicitly recursive calls', function () {
      fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'HelloHi');
    });

    it('should handle explicitly recursive calls', function () {
      fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], null, false), 'HelloHi');
    });

    it('should handle non-recursive calls', function () {
      fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], null, true), 'Hello');
    });

    it('should know how visibility works', function () {
      fixture.innerHTML =
        'Hello <span style="visibility: hidden;">' +
        '<span style="visibility: visible;">Hi</span>' +
        '</span>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello Hi');
    });

    it('should not return elements with display: none', function () {
      fixture.innerHTML =
        'Hello<span style="display: none;"><span>Hi</span></span>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should trim the result', function () {
      fixture.innerHTML =
        '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello Hi');
    });

    it('should ignore script and style tags', function () {
      fixture.innerHTML =
        '<script> // hello </script><style> /*hello */</style>' + 'Hello';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    it('should not take into account position of parents', function () {
      fixture.innerHTML =
        '<div style="position: absolute; top: -9999px;">' +
        '<div style="position: absolute; top: 10000px;">Hello</div>' +
        '</div>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0]), 'Hello');
    });

    (shadowSupported ? it : xit)(
      'should correctly handle slotted elements',
      function () {
        function createContentSlotted() {
          let group = document.createElement('div');
          group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
          return group;
        }
        function makeShadowTree(node) {
          let root = node.attachShadow({ mode: 'open' });
          let div = document.createElement('div');
          root.appendChild(div);
          div.appendChild(createContentSlotted());
        }
        fixture.innerHTML = '<div><a>hello</a></div>';
        makeShadowTree(fixture.firstChild);
        let tree = axe.utils.getFlattenedTree(fixture.firstChild);
        assert.equal(visibleVirtual(tree[0]), 'Stuffhello');
      }
    );
  });

  describe('screen reader', function () {
    it('should not return elements with visibility: hidden', function () {
      fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should know how visibility works', function () {
      fixture.innerHTML =
        'Hello <span style="visibility: hidden;">' +
        '<span style="visibility: visible;">Hi</span>' +
        '</span>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello Hi');
    });

    it('should not return elements with display: none', function () {
      fixture.innerHTML =
        'Hello<span style="display: none;"><span>Hi</span></span>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should trim the result', function () {
      fixture.innerHTML =
        '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello Hi');
    });

    it('should ignore script and style tags', function () {
      fixture.innerHTML =
        '<script> // hello </script><style> /*hello */</style>' + 'Hello';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should not consider offscreen text as hidden (position)', function () {
      fixture.innerHTML =
        '<div style="position: absolute; top: -9999px;">' +
        '<div>Hello</div>' +
        '</div>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });

    it('should not consider offscreen text as hidden (text-indent)', function () {
      fixture.innerHTML = '<div style="text-indent: -9999px;">' + 'Hello</div>';

      let tree = axe.utils.getFlattenedTree(fixture);
      assert.equal(visibleVirtual(tree[0], true), 'Hello');
    });
  });
});
