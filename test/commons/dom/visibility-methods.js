describe('dom.visibility-methods', function () {
  var queryFixture = axe.testUtils.queryFixture;
  var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  var nativelyHidden =
    axe._thisWillBeDeletedDoNotUse.commons.dom.nativelyHidden;
  var displayHidden = axe._thisWillBeDeletedDoNotUse.commons.dom.displayHidden;
  var visibilityHidden =
    axe._thisWillBeDeletedDoNotUse.commons.dom.visibilityHidden;
  var ariaHidden = axe._thisWillBeDeletedDoNotUse.commons.dom.ariaHidden;
  var opacityHidden = axe._thisWillBeDeletedDoNotUse.commons.dom.opacityHidden;
  var scrollHidden = axe._thisWillBeDeletedDoNotUse.commons.dom.scrollHidden;
  var overflowHidden =
    axe._thisWillBeDeletedDoNotUse.commons.dom.overflowHidden;
  var clipHidden = axe._thisWillBeDeletedDoNotUse.commons.dom.clipHidden;
  var areaHidden = axe._thisWillBeDeletedDoNotUse.commons.dom.areaHidden;

  describe('nativelyHidden', function () {
    var nativelyHiddenElements = ['style', 'script', 'noscript', 'template'];

    it('should return true for hidden elements', function () {
      nativelyHiddenElements.forEach(function (nodeName) {
        var vNode = new axe.VirtualNode(document.createElement(nodeName));
        assert.isTrue(nativelyHidden(vNode), (nodeName = ' is not hidden'));
      });
    });

    it('should return false for visible elements', function () {
      Object.keys(axe._audit.standards.htmlElms)
        .filter(function (nodeName) {
          return !nativelyHiddenElements.includes(nodeName);
        })
        .forEach(function (nodeName) {
          var vNode = new axe.VirtualNode(document.createElement(nodeName));
          assert.isFalse(nativelyHidden(vNode), nodeName + ' is not visible');
        });
    });
  });

  describe('displayHidden', function () {
    it('should return true for element with "display:none`', function () {
      var vNode = queryFixture(
        '<div id="target" style="display: none;"></div>'
      );
      assert.isTrue(displayHidden(vNode));
    });

    it('should return false for element with "display:block`', function () {
      var vNode = queryFixture(
        '<div id="target" style="display: block;"></div>'
      );
      assert.isFalse(displayHidden(vNode));
    });

    it('should return false for element without display', function () {
      var vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(displayHidden(vNode));
    });

    it('should return false for area element', function () {
      var vNode = queryFixture(
        '<map name="test">' +
          '<area id="target" href="#"/>' +
          '</map>' +
          '<img usemap="#test" src="img.png"/>'
      );
      assert.isFalse(displayHidden(vNode));
    });
  });

  describe('visibilityHidden', function () {
    it('should return true for element with "visibility:hidden`', function () {
      var vNode = queryFixture(
        '<div id="target" style="visibility: hidden;"></div>'
      );
      assert.isTrue(visibilityHidden(vNode));
    });

    it('should return true for element with "visibility:collapse`', function () {
      var vNode = queryFixture(
        '<div id="target" style="visibility: collapse;"></div>'
      );
      assert.isTrue(visibilityHidden(vNode));
    });

    it('should return false for element with "visibility:visible`', function () {
      var vNode = queryFixture(
        '<div id="target" style="visibility: visible;"></div>'
      );
      assert.isFalse(visibilityHidden(vNode));
    });

    it('should return false for element without visibility', function () {
      var vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(visibilityHidden(vNode));
    });

    it('should return false for if passed "isAncestor:true`', function () {
      var vNode = queryFixture(
        '<div id="target" style="visibility: hidden;"></div>'
      );
      assert.isFalse(visibilityHidden(vNode, { isAncestor: true }));
    });
  });

  describe('ariaHidden', function () {
    it('should return true for element with "aria-hidden=true`', function () {
      var vNode = queryFixture('<div id="target" aria-hidden="true"></div>');
      assert.isTrue(ariaHidden(vNode));
    });

    it('should return false for element with "aria-hidden=false`', function () {
      var vNode = queryFixture('<div id="target" aria-hidden="false"></div>');
      assert.isFalse(ariaHidden(vNode));
    });

    it('should return false for element without aria-hidden', function () {
      var vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(ariaHidden(vNode));
    });
  });

  describe('opacityHidden', function () {
    it('should return true for element with "opacity:0`', function () {
      var vNode = queryFixture('<div id="target" style="opacity: 0;"></div>');
      assert.isTrue(opacityHidden(vNode));
    });

    it('should return false for element with "opacity:0.1`', function () {
      var vNode = queryFixture('<div id="target" style="opacity: 0.1;"></div>');
      assert.isFalse(opacityHidden(vNode));
    });

    it('should return false for element without opacity', function () {
      var vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(opacityHidden(vNode));
    });
  });

  describe('scrollHidden', function () {
    it('should return true for element with scroll and "width:0`', function () {
      var vNode = queryFixture(
        '<div id="target" style="overflow-x: scroll; width: 0">scroll hidden</div>'
      );
      assert.isTrue(scrollHidden(vNode));
    });

    it('should return true for element with scroll and "height:0`', function () {
      var vNode = queryFixture(
        '<div id="target" style="overflow-y: scroll; height: 0">scroll hidden</div>'
      );
      assert.isTrue(scrollHidden(vNode));
    });

    it('should return false for element with scroll and width > 0', function () {
      var vNode = queryFixture(
        '<div id="target" style="overflow-x: scroll;">scroll hidden</div>'
      );
      assert.isFalse(scrollHidden(vNode));
    });

    it('should return false for element with scroll and height > 0', function () {
      var vNode = queryFixture(
        '<div id="target" style="overflow-y: scroll;">scroll hidden</div>'
      );
      assert.isFalse(scrollHidden(vNode));
    });

    it('should return false for element without scroll', function () {
      var vNode = queryFixture('<div id="target">scroll hidden</div>');
      assert.isFalse(scrollHidden(vNode));
    });
  });

  describe('overflowHidden', function () {
    it('should return true for element with "overflow:hidden" and "width:0`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and "height:0`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; height: 0">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and "width:1`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; width: 1px">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and "height:1`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; height: 1px">overflow hidden</div>'
      );
      assert.isTrue(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and width > 1', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; width: 2px">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return true for element with "overflow:hidden" and height > 1', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: hidden; height: 2px">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "position:fixed`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: fixed; overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "position:relative`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: relative; overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element without position', function () {
      var vNode = queryFixture(
        '<div id="target" style="overflow: hidden; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "overflow:visible`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: visible; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element with "overflow:auto`', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; overflow: auto; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });

    it('should return false for element without overflow', function () {
      var vNode = queryFixture(
        '<div id="target" style="position: absolute; width: 0">overflow hidden</div>'
      );
      assert.isFalse(overflowHidden(vNode));
    });
  });

  describe('clipHidden', function () {
    it('should return true for element with clip-path and inset >= 50%', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip-path: inset(50%);">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return false for element with clip-path and inset < 50%', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip-path: inset(49%);">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return true for element with clip-path and circle=0', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip-path: circle(0);">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return false for element with clip-path and circle > 0', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip-path: circle(1%);">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return true for element with clip and "position:absolute`', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px); position: absolute">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return true for element with clip and "position:fixed"', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px); position: fixed">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return true for element with clip using commas', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip: rect(1px, 1px, 1px, 1px); position: absolute">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return true for poorly hidden clip rects', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip: rect(5px 1px 1px 5px); position: absolute">Hello world</div>'
      );
      assert.isTrue(clipHidden(vNode));
    });

    it('should return false for element with clip and "position:relative"', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px); position: relative">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return false for element with clip and without position', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip: rect(1px 1px 1px 1px);">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });

    it('should return false for element without clip or clip-path', function () {
      var vNode = queryFixture('<div id="target">Hello world</div>');
      assert.isFalse(clipHidden(vNode));
    });

    it('should return false for element with visible clip', function () {
      var vNode = queryFixture(
        '<div id="target" style="clip: rect(5px 6px 7px 8px); position: relative">Hello world</div>'
      );
      assert.isFalse(clipHidden(vNode));
    });
  });

  describe('areaHidden', function () {
    it('should return true for element without map parent', function () {
      var vNode = queryFixture('<area id="target" />');
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true for map without a name', function () {
      var vNode = queryFixture('<map><area id="target" /></map>');
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true if map is in shadowDOM', function () {
      var vNode = shadowCheckSetup(
        '<map name="foo"><div id="shadow"></div></map>',
        '<area id="target" />'
      )[2];
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true if img does not use map', function () {
      var vNode = queryFixture('<map name="foo"><area id="target" /></map>');
      assert.isTrue(areaHidden(vNode));
    });

    it('should return true if img uses map but is hidden', function () {
      var vNode = queryFixture(
        '<map name="foo"><area id="target" /></map><img usemap="#foo" />'
      );
      assert.isTrue(
        areaHidden(vNode, function () {
          return false;
        })
      );
    });

    it('should return false if img uses map and is visible', function () {
      var vNode = queryFixture(
        '<map name="foo"><area id="target" /></map><img usemap="#foo" />'
      );
      assert.isFalse(
        areaHidden(vNode, function () {
          return true;
        })
      );
    });
  });
});
