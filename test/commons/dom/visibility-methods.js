describe('dom.visibility-methods', () => {
  const { queryFixture, shadowCheckSetup } = axe.testUtils;
  const {
    nativelyHidden,
    displayHidden,
    visibilityHidden,
    contentVisibiltyHidden,
    ariaHidden,
    opacityHidden,
    scrollHidden,
    overflowHidden,
    clipHidden,
    areaHidden
  } = axe._thisWillBeDeletedDoNotUse.commons.dom;
  const contentVisibilitySupported = CSS.supports('content-visibility: hidden');

  describe('nativelyHidden', () => {
    const nativelyHiddenElements = ['style', 'script', 'noscript', 'template'];

    it('should return true for hidden elements', () => {
      nativelyHiddenElements.forEach(nodeName => {
        const vNode = new axe.VirtualNode(document.createElement(nodeName));
        assert.isTrue(nativelyHidden(vNode), (nodeName = ' is not hidden'));
      });
    });

    it('should return false for visible elements', () => {
      Object.keys(axe._audit.standards.htmlElms)
        .filter(nodeName => {
          return !nativelyHiddenElements.includes(nodeName);
        })
        .forEach(nodeName => {
          const vNode = new axe.VirtualNode(document.createElement(nodeName));
          assert.isFalse(nativelyHidden(vNode), nodeName + ' is not visible');
        });
    });
  });

  describe('displayHidden', () => {
    it('should return true for element with "display:none`', () => {
      const vNode = queryFixture(
        '<div id="target" style="display: none;"></div>'
      );
      assert.isTrue(displayHidden(vNode));
    });

    it('should return false for element with "display:block`', () => {
      const vNode = queryFixture(
        '<div id="target" style="display: block;"></div>'
      );
      assert.isFalse(displayHidden(vNode));
    });

    it('should return false for element without display', () => {
      const vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(displayHidden(vNode));
    });

    it('should return false for area element', () => {
      const vNode = queryFixture(
        '<map name="test">' +
          '<area id="target" href="#"/>' +
          '</map>' +
          '<img usemap="#test" src="img.png"/>'
      );
      assert.isFalse(displayHidden(vNode));
    });
  });

  describe('visibilityHidden', () => {
    it('should return true for element with "visibility:hidden`', () => {
      const vNode = queryFixture(
        '<div id="target" style="visibility: hidden;"></div>'
      );
      assert.isTrue(visibilityHidden(vNode));
    });

    it('should return true for element with "visibility:collapse`', () => {
      const vNode = queryFixture(
        '<div id="target" style="visibility: collapse;"></div>'
      );
      assert.isTrue(visibilityHidden(vNode));
    });

    it('should return false for element with "visibility:visible`', () => {
      const vNode = queryFixture(
        '<div id="target" style="visibility: visible;"></div>'
      );
      assert.isFalse(visibilityHidden(vNode));
    });

    it('should return false for element without visibility', () => {
      const vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(visibilityHidden(vNode));
    });

    it('should return false for if passed "isAncestor:true`', () => {
      const vNode = queryFixture(
        '<div id="target" style="visibility: hidden;"></div>'
      );
      assert.isFalse(visibilityHidden(vNode, { isAncestor: true }));
    });
  });

  (contentVisibilitySupported ? describe : describe.skip)(
    'contentVisibiltyHidden',
    () => {
      it('should return true for element with "content-visibility:hidden` ancestor', () => {
        const vNode = queryFixture(
          '<div id="target" style="content-visibility: hidden;"></div>'
        );
        assert.isTrue(contentVisibiltyHidden(vNode, { isAncestor: true }));
      });

      it('should return false for element with "content-visibility: visible` ancestor', () => {
        const vNode = queryFixture(
          '<div id="target" style="content-visibility: visible;"></div>'
        );
        assert.isFalse(contentVisibiltyHidden(vNode, { isAncestor: true }));
      });

      it('should return false for element without content-visibility', () => {
        const vNode = queryFixture('<div id="target"></div>');
        assert.isFalse(contentVisibiltyHidden(vNode));
      });

      it('should return false for element with "content-visibility: hidden"', () => {
        const vNode = queryFixture(
          '<div id="target" style="content-visibility: hidden;">'
        );
        assert.isFalse(contentVisibiltyHidden(vNode, { isAncestor: false }));
      });
    }
  );

  describe('ariaHidden', () => {
    it('should return true for element with "aria-hidden=true`', () => {
      const vNode = queryFixture('<div id="target" aria-hidden="true"></div>');
      assert.isTrue(ariaHidden(vNode));
    });

    it('should return false for element with "aria-hidden=false`', () => {
      const vNode = queryFixture('<div id="target" aria-hidden="false"></div>');
      assert.isFalse(ariaHidden(vNode));
    });

    it('should return false for element without aria-hidden', () => {
      const vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(ariaHidden(vNode));
    });
  });

  describe('opacityHidden', () => {
    it('should return true for element with "opacity:0`', () => {
      const vNode = queryFixture('<div id="target" style="opacity: 0;"></div>');
      assert.isTrue(opacityHidden(vNode));
    });

    it('should return false for element with "opacity:0.1`', () => {
      const vNode = queryFixture(
        '<div id="target" style="opacity: 0.1;"></div>'
      );
      assert.isFalse(opacityHidden(vNode));
    });

    it('should return false for element without opacity', () => {
      const vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(opacityHidden(vNode));
    });
  });

  describe('scrollHidden', () => {
    it('should return true for element with scroll and "width:0`', () => {
      const vNode = queryFixture(
        '<div id="target" style="overflow-x: scroll; width: 0">scroll hidden</div>'
      );
      assert.isTrue(scrollHidden(vNode));
    });

    it('should return true for element with scroll and "height:0`', () => {
      const vNode = queryFixture(
        '<div id="target" style="overflow-y: scroll; height: 0">scroll hidden</div>'
      );
      assert.isTrue(scrollHidden(vNode));
    });

    it('should return false for element with scroll and width > 0', () => {
      const vNode = queryFixture(
        '<div id="target" style="overflow-x: scroll;">scroll hidden</div>'
      );
      assert.isFalse(scrollHidden(vNode));
    });

    it('should return false for element with scroll and height > 0', () => {
      const vNode = queryFixture(
        '<div id="target" style="overflow-y: scroll;">scroll hidden</div>'
      );
      assert.isFalse(scrollHidden(vNode));
    });

    it('should return false for element without scroll', () => {
      const vNode = queryFixture('<div id="target">scroll hidden</div>');
      assert.isFalse(scrollHidden(vNode));
    });
  });

  describe('overflowHidden', () => {
    it('should return true for element with "overflow:hidden" and "width:0`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and "height:0`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; height: 0">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and "width:1`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; width: 1px">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and "height:1`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; height: 1px">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and width > 1', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; width: 2px">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and height > 1', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; height: 2px">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "position:fixed`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: fixed; overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "position:relative`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: relative; overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element without position', () => {
      const vNode = queryFixture(
        '<div id="target" style="overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "overflow:visible`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: visible; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "overflow:auto`', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: auto; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element without overflow', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });
  });

  describe('clipHidden', () => {
    it('should return true for element with clip-path and inset >= 50%', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip-path: inset(50%);">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return false for element with clip-path and inset < 50%', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip-path: inset(49%);">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return true for element with clip-path and circle=0', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip-path: circle(0);">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return false for element with clip-path and circle > 0', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip-path: circle(1%);">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return true for element with clip and "position:absolute`', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px); position: absolute">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return true for element with clip and "position:fixed"', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px); position: fixed">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return true for element with clip using commas', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip: rect(1px, 1px, 1px, 1px); position: absolute">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return true for poorly hidden clip rects', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip: rect(5px 1px 1px 5px); position: absolute">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return false for element with clip and "position:relative"', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px); position: relative">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return false for element with clip and without position', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px);">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return false for element without clip or clip-path', () => {
      const vNode = queryFixture('<div id="target">Hello world</div>');
      assert.isFalse(clipHidden(vNode));
    });

    it('should return false for element with visible clip', () => {
      const vNode = queryFixture(
        '<div id="target" style="clip: rect(5px 6px 7px 8px); position: relative">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });
  });

  describe('areaHidden', () => {
    it('should return true for element without map parent', () => {
      const vNode = queryFixture('<area id="target" />');
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true for map without a name', () => {
      const vNode = queryFixture('<map><area id="target" /></map>');
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true if map is in shadowDOM', () => {
      const vNode = shadowCheckSetup(
        '<map name="foo"><div id="shadow"></div></map>',
        '<area id="target" />'
      )[2];
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true if img does not use map', () => {
      const vNode = queryFixture('<map name="foo"><area id="target" /></map>');
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true if img uses map but is hidden', () => {
      const vNode = queryFixture(
        '<map name="foo"><area id="target" /></map><img usemap="#foo" />'
      );
      assert.isTrue(
        areaHidden(vNode, () => {
          return false;
        })
      );
    });

    it('should return false if img uses map and is visible', () => {
      const vNode = queryFixture(
        '<map name="foo"><area id="target" /></map><img usemap="#foo" />'
      );
      assert.isFalse(
        areaHidden(vNode, () => {
          return true;
        })
      );
    });
  });
});
