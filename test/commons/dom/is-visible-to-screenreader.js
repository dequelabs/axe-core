describe('dom.isVisibleToScreenReaders', function () {
  'use strict';

  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let isVisibleToScreenReaders = axe.commons.dom.isVisibleToScreenReaders;

  function createContentHidden() {
    let group = document.createElement('div');
    group.innerHTML =
      '<label id="mylabel">Label</label><input aria-labelledby="mylabel" type="text" />';
    return group;
  }

  function makeShadowTreeHidden(node) {
    let root = node.attachShadow({ mode: 'open' });
    let div = document.createElement('div');
    div.className = 'parent';
    root.appendChild(div);
    div.appendChild(createContentHidden());
  }

  it('should return false on detached elements', function () {
    let el = document.createElement('div');
    el.innerHTML = 'I am not visible because I am detached!';
    axe.testUtils.flatTreeSetup(el);
    assert.isFalse(isVisibleToScreenReaders(el));
  });

  it('should return true on body', function () {
    axe.testUtils.flatTreeSetup(document.body);
    let actual = isVisibleToScreenReaders(document.body);
    assert.isTrue(actual);
  });

  it('should return true on html', function () {
    axe.testUtils.flatTreeSetup(document.documentElement);
    let actual = isVisibleToScreenReaders(document.documentElement);
    assert.isTrue(actual);
  });

  it('should return true for visible element', function () {
    let vNode = queryFixture('<div id="target">Visible</div>');
    assert.isTrue(isVisibleToScreenReaders(vNode));
  });

  it('should return true for visible area element', function () {
    let vNode = queryFixture(
      '<map name="map">' +
        '<area id="target" href="#" />' +
        '</map>' +
        '<img usemap="#map" src="img.png" />'
    );
    assert.isTrue(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `aria-hidden` is set', function () {
    let vNode = queryFixture(
      '<div id="target" aria-hidden="true">Hidden from screen readers</div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `inert` is set', function () {
    let vNode = queryFixture(
      '<div id="target" inert>Hidden from screen readers</div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `display: none` is set', function () {
    let vNode = queryFixture(
      '<div id="target" style="display: none">Hidden from screen readers</div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should return false if `aria-hidden` is set on parent', function () {
    let vNode = queryFixture(
      '<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>'
    );
    assert.isFalse(isVisibleToScreenReaders(vNode));
  });

  it('should know how `visibility` works', function () {
    let vNode = queryFixture(
      '<div style="visibility: hidden;">' +
        '<div id="target" style="visibility: visible;">Hi</div>' +
        '</div>'
    );
    assert.isTrue(isVisibleToScreenReaders(vNode));
  });

  it('returns false for `AREA` without closest `MAP` element', function () {
    let vNode = queryFixture(
      '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>'
    );
    let actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  it('returns false for `AREA` with closest `MAP` with no name attribute', function () {
    let vNode = queryFixture(
      '<map>' +
        '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
        '</map>'
    );
    let actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  (shadowSupported ? it : xit)(
    'returns false for `AREA` element that is inside shadowDOM',
    function () {
      fixture.innerHTML = '<div id="container"></div>';
      let container = fixture.querySelector('#container');
      let shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<map name="infographic">' +
        '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
        '</map>';
      axe.testUtils.flatTreeSetup(fixture);

      let target = shadow.querySelector('#target');
      let actual = isVisibleToScreenReaders(target);
      assert.isFalse(actual);
    }
  );

  it('returns false for `AREA` with closest `MAP` with name but not referred by an `IMG` usemap attribute', function () {
    let vNode = queryFixture(
      '<map name="infographic">' +
        '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
        '</map>' +
        '<img usemap="#infographic-wrong-name" alt="MDN infographic" />'
    );
    let actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  it('returns false for `AREA` with `MAP` and used in `IMG` which is not visible', function () {
    let vNode = queryFixture(
      '<map name="infographic">' +
        '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
        '</map>' +
        '<img usemap="#infographic" alt="MDN infographic" style="display:none"/>'
    );
    let actual = isVisibleToScreenReaders(vNode);
    assert.isFalse(actual);
  });

  it('returns true for `AREA` with `MAP` and used in `IMG` which is visible', function () {
    let vNode = queryFixture(
      '<map name="infographic">' +
        '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
        '</map>' +
        '<img usemap="#infographic" alt="MDN infographic" />'
    );
    let actual = isVisibleToScreenReaders(vNode);
    assert.isTrue(actual);
  });

  (shadowSupported ? it : xit)(
    'not hidden: should work when the element is inside shadow DOM',
    function () {
      let tree, node;
      // shadow DOM v1 - note: v0 is compatible with this code, so no need
      // to specifically test this
      fixture.innerHTML = '<div></div>';
      makeShadowTreeHidden(fixture.firstChild);
      tree = axe.utils.getFlattenedTree(fixture.firstChild);
      node = axe.utils.querySelectorAll(tree, 'input')[0];
      assert.isTrue(isVisibleToScreenReaders(node));
    }
  );

  (shadowSupported ? it : xit)(
    'hidden: should work when the element is inside shadow DOM',
    function () {
      let tree, node;
      // shadow DOM v1 - note: v0 is compatible with this code, so no need
      // to specifically test this
      fixture.innerHTML = '<div style="display:none"></div>';
      makeShadowTreeHidden(fixture.firstChild);
      tree = axe.utils.getFlattenedTree(fixture.firstChild);
      node = axe.utils.querySelectorAll(tree, 'input')[0];
      assert.isFalse(isVisibleToScreenReaders(node));
    }
  );

  (shadowSupported ? it : xit)(
    'should work with hidden slotted elements',
    function () {
      function createContentSlotted() {
        let group = document.createElement('div');
        group.innerHTML =
          '<div id="target" style="display:none;">Stuff<slot></slot></div>';
        return group;
      }
      function makeShadowTree(node) {
        let root = node.attachShadow({ mode: 'open' });
        let div = document.createElement('div');
        root.appendChild(div);
        div.appendChild(createContentSlotted());
      }
      fixture.innerHTML = '<div><p><a>hello</a></p></div>';
      makeShadowTree(fixture.firstChild);
      let tree = axe.utils.getFlattenedTree(fixture.firstChild);
      let vNode = axe.utils.querySelectorAll(tree, 'a')[0];
      assert.isFalse(isVisibleToScreenReaders(vNode));
    }
  );

  describe('SerialVirtualNode', function () {
    it('should return false if `aria-hidden` is set', function () {
      let vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-hidden': true
        }
      });
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });

    it('should return false if `aria-hidden` is set on parent', function () {
      let vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      let parentVNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-hidden': true
        }
      });
      parentVNode.children = [vNode];
      vNode.parent = parentVNode;
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });

    it('should return false if `inert` is set', function () {
      let vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          inert: true
        }
      });
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });

    it('should return false if `inert` is set on parent', function () {
      let vNode = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      let parentVNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          inert: true
        }
      });
      parentVNode.children = [vNode];
      vNode.parent = parentVNode;
      assert.isFalse(isVisibleToScreenReaders(vNode));
    });
  });
});
