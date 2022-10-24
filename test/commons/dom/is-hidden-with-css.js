describe('dom.isHiddenWithCSS', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var isHiddenWithCSS = axe.commons.dom.isHiddenWithCSS;
  var origComputedStyle = window.getComputedStyle;
  var queryFixture = axe.testUtils.queryFixture;

  function createContentSlotted(mainProps, targetProps) {
    var group = document.createElement('div');
    group.innerHTML =
      '<main style="' +
      mainProps +
      '"><p style="' +
      targetProps +
      '"></p></main>';
    return group;
  }

  function makeShadowTree(node, mainProps, targetProps) {
    var root = node.attachShadow({ mode: 'open' });
    var node = createContentSlotted(mainProps, targetProps);
    root.appendChild(node);
  }

  afterEach(function () {
    window.getComputedStyle = origComputedStyle;
    document.getElementById('fixture').innerHTML = '';
  });

  it('should throw an error if computedStyle returns null', function () {
    window.getComputedStyle = function () {
      return null;
    };
    var fakeNode = {
      nodeType: Node.ELEMENT_NODE,
      nodeName: 'div'
    };
    assert.throws(function () {
      isHiddenWithCSS(fakeNode);
    });
  });

  it('should return false on static-positioned, visible element', function () {
    fixture.innerHTML = '<div id="target">I am visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return true on static-positioned, hidden element', function () {
    fixture.innerHTML =
      '<div id="target" style="display:none">I am not visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false on absolutely positioned elements that are on-screen', function () {
    fixture.innerHTML =
      '<div id="target" style="position: absolute; left: 10px; right: 10px">I am visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for off-screen and aria-hidden element', function () {
    fixture.innerHTML =
      '<button id="target" aria-hidden=“true” style=“position:absolute: top:-999em”>I am visible</button>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false on fixed position elements that are on-screen', function () {
    fixture.innerHTML =
      '<div id="target" style="position:fixed; bottom: 0; left: 0;">I am visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for off-screen absolutely positioned element', function () {
    fixture.innerHTML =
      '<div id="target" style="position: absolute; left: -9999px">I am visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for off-screen fixed positioned element', function () {
    fixture.innerHTML =
      '<div id="target" style="position: fixed; top: -9999px">I am visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false on detached elements', function () {
    var el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false on a document', function () {
    var actual = isHiddenWithCSS(document);
    assert.isFalse(actual);
  });

  it('should return false if static-position but top/left is set', function () {
    fixture.innerHTML =
      '<div id="target" style="top: -9999px; left: -9999px; right: -9999px; bottom: -9999px;">I am visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false, and not be affected by `aria-hidden`', function () {
    fixture.innerHTML =
      '<div id="target" aria-hidden="true">I am visible with css (although hidden to screen readers)</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for STYLE node', function () {
    fixture.innerHTML = "<style id='target'>body {font-size: 200%}</style>";
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false for SCRIPT node', function () {
    fixture.innerHTML =
      "<script id='target' type='text/javascript' src='temp.js'></script>";
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  // `display` test
  it('should return true for if parent of element set to `display:none`', function () {
    fixture.innerHTML =
      '<div style="display:none">' +
      '<div style="display:block">' +
      '<p id="target">I am not visible</p>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return true for if parent of element set to `display:none`', function () {
    fixture.innerHTML =
      '<div style="display:none">' +
      '<div style="display:block">' +
      '<p id="target" style="display:block">I am not visible</p>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false for if parent of element set to `display:block`', function () {
    fixture.innerHTML =
      '<div>' +
      '<div style="display:block">' +
      '<p id="target" style="display:block">I am visible</p>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  (shadowSupported ? it : it.skip)(
    'should return true if `display:none` inside shadowDOM',
    function () {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(fixture.firstChild, 'display:none;', '');
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var el = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = isHiddenWithCSS(el.actualNode);
      assert.isTrue(actual);
    }
  );

  // `visibility` test
  it('should return true for element that has `visibility:hidden`', function () {
    fixture.innerHTML =
      '<div id="target" style="visibility: hidden;">I am not visible</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', function () {
    fixture.innerHTML =
      '<div style="visibility:hidden;">' +
      '<div style="visibility:visible;">' +
      '<div id="target">I am visible</div>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', function () {
    fixture.innerHTML =
      '<div style="visibility:hidden">' +
      '<div style="visibility:hidden">' +
      '<div style="visibility:visible" id="target">I am visible</div>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return true and as parent is set to `visibility:hidden`', function () {
    fixture.innerHTML =
      '<div style="visibility: hidden;">' +
      '<div>' +
      '<div id="target">I am not visible</div>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  (shadowSupported ? it : xit)(
    'should return true as parent shadowDOM host is set to `visibility:hidden`',
    function () {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(fixture.firstChild, 'visibility:hidden', '');
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var el = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = isHiddenWithCSS(el.actualNode);
      assert.isTrue(actual);
    }
  );

  (shadowSupported ? it : xit)(
    'should return false as parent shadowDOM host  set to `visibility:hidden` is overriden',
    function () {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(
        fixture.firstChild,
        'visibility:hidden',
        'visibility:visible'
      );
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var el = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = isHiddenWithCSS(el.actualNode);
      assert.isFalse(actual);
    }
  );

  // mixing display and visibility
  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', function () {
    fixture.innerHTML =
      '<div style="display:none;">' +
      '<div style="visibility:visible;">' +
      '<div id="target">I am not visible</div>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return false and compute using both `display` and `visibility` set on element and parent(s)', function () {
    fixture.innerHTML =
      '<div style="display:block;">' +
      '<div style="visibility:visible;">' +
      '<div id="target">I am visible</div>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isFalse(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', function () {
    fixture.innerHTML =
      '<div style="display:block;">' +
      '<div style="visibility:visible;">' +
      '<div id="target" style="visibility:hidden">I am not visible</div>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', function () {
    fixture.innerHTML =
      '<div style="visibility:hidden">' +
      '<div style="display:none;">' +
      '<div id="target" style="visibility:visible">I am not visible</div>' +
      '</div>' +
      '</div>';
    var el = document.getElementById('target');
    var actual = isHiddenWithCSS(el);
    assert.isTrue(actual);
  });

  describe('with virtual nodes', function () {
    it('returns false when virtual nodes are visible', function () {
      var vNode = queryFixture('<div id="target"></div>');
      assert.isFalse(isHiddenWithCSS(vNode));
    });

    it('returns true when virtual nodes are hidden', function () {
      var vNode = queryFixture('<div id="target" style="display:none"></div>');
      assert.isTrue(isHiddenWithCSS(vNode));
    });
  });
});
