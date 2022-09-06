describe('dom.isHiddenForEveryone', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var isHiddenForEveryone = axe.commons.dom.isHiddenForEveryone;
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

  it('should return false on static-positioned, visible element', function () {
    var vNode = queryFixture('<div id="target">I am visible</div>');
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true on static-positioned, hidden element', function () {
    var vNode = queryFixture(
      '<div id="target" style="display:none">I am not visible</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false on absolutely positioned elements that are on-screen', function () {
    var vNode = queryFixture(
      '<div id="target" style="position: absolute; left: 10px; right: 10px">I am visible</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false for off-screen and aria-hidden element', function () {
    var vNode = queryFixture(
      '<button id="target" aria-hidden=“true” style=“position:absolute: top:-999em”>I am visible</button>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false on fixed position elements that are on-screen', function () {
    var vNode = queryFixture(
      '<div id="target" style="position:fixed; bottom: 0; left: 0;">I am visible</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false for off-screen absolutely positioned element', function () {
    var vNode = queryFixture(
      '<div id="target" style="position: absolute; left: -9999px">I am visible</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false for off-screen fixed positioned element', function () {
    var vNode = queryFixture(
      '<div id="target" style="position: fixed; top: -9999px">I am visible</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true on detached elements', function () {
    var el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';
    axe.testUtils.flatTreeSetup(el);
    var actual = isHiddenForEveryone(el);
    assert.isTrue(actual);
  });

  it('should return false on body', function () {
    axe.testUtils.flatTreeSetup(document.body);
    var actual = isHiddenForEveryone(document.body);
    assert.isFalse(actual);
  });

  it('should return false on html', function () {
    axe.testUtils.flatTreeSetup(document.documentElement);
    var actual = isHiddenForEveryone(document.documentElement);
    assert.isFalse(actual);
  });

  it('should return false if static-position but top/left is set', function () {
    var vNode = queryFixture(
      '<div id="target" style="top: -9999px; left: -9999px; right: -9999px; bottom: -9999px;">I am visible</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false, and not be affected by `aria-hidden`', function () {
    var vNode = queryFixture(
      '<div id="target" aria-hidden="true">I am visible with css (although hidden to screen readers)</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true for STYLE node', function () {
    var vNode = queryFixture(
      "<style id='target'>body {font-size: 200%}</style>"
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return true for SCRIPT node', function () {
    var vNode = queryFixture(
      "<script id='target' type='text/javascript' src='temp.js'></script>"
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  // `display` test
  it('should return true for if parent of element set to `display:none`', function () {
    var vNode = queryFixture(
      '<div style="display:none">' +
        '<div style="display:block">' +
        '<p id="target">I am not visible</p>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return true for if parent of element set to `display:none`', function () {
    var vNode = queryFixture(
      '<div style="display:none">' +
        '<div style="display:block">' +
        '<p id="target" style="display:block">I am not visible</p>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false for if parent of element set to `display:block`', function () {
    var vNode = queryFixture(
      '<div>' +
        '<div style="display:block">' +
        '<p id="target" style="display:block">I am visible</p>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  // `visibility` test
  it('should return true for element that has `visibility:hidden`', function () {
    var vNode = queryFixture(
      '<div id="target" style="visibility: hidden;">I am not visible</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', function () {
    var vNode = queryFixture(
      '<div style="visibility:hidden;">' +
        '<div style="visibility:visible;">' +
        '<div id="target">I am visible</div>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return false and compute how `visibility` of self and parent is configured', function () {
    var vNode = queryFixture(
      '<div style="visibility:hidden">' +
        '<div style="visibility:hidden">' +
        '<div style="visibility:visible" id="target">I am visible</div>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true and as parent is set to `visibility:hidden`', function () {
    var vNode = queryFixture(
      '<div style="visibility: hidden;">' +
        '<div>' +
        '<div id="target">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  // mixing display and visibility
  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', function () {
    var vNode = queryFixture(
      '<div style="display:none;">' +
        '<div style="visibility:visible;">' +
        '<div id="target">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return false and compute using both `display` and `visibility` set on element and parent(s)', function () {
    var vNode = queryFixture(
      '<div style="display:block;">' +
        '<div style="visibility:visible;">' +
        '<div id="target">I am visible</div>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isFalse(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', function () {
    var vNode = queryFixture(
      '<div style="display:block;">' +
        '<div style="visibility:visible;">' +
        '<div id="target" style="visibility:hidden">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  it('should return true and compute using both `display` and `visibility` set on element and parent(s)', function () {
    var vNode = queryFixture(
      '<div style="visibility:hidden">' +
        '<div style="display:none;">' +
        '<div id="target" style="visibility:visible">I am not visible</div>' +
        '</div>' +
        '</div>'
    );
    var actual = isHiddenForEveryone(vNode);
    assert.isTrue(actual);
  });

  (shadowSupported ? it : it.skip)(
    'should return true if `display:none` inside shadowDOM',
    function () {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(fixture.firstChild, 'display:none;', '');
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var vNode = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = isHiddenForEveryone(vNode);
      assert.isTrue(actual);
    }
  );

  (shadowSupported ? it : xit)(
    'should return true as parent shadowDOM host is set to `visibility:hidden`',
    function () {
      fixture.innerHTML = '<div></div>';
      makeShadowTree(fixture.firstChild, 'visibility:hidden', '');
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var vNode = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = isHiddenForEveryone(vNode);
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
      var vNode = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    }
  );

  describe('SerialVirtualNode', function () {
    it('should return false on detached virtual nodes', function () {
      var vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      var actual = isHiddenForEveryone(vNode);
      assert.isFalse(actual);
    });
  });
});
