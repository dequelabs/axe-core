function createContentIDR() {
  const group = document.createElement('div');
  group.id = 'target';
  return group;
}

function makeShadowTreeIDR(node) {
  const root = node.attachShadow({ mode: 'open' });
  const div = document.createElement('div');
  div.className = 'parent';
  div.setAttribute('target', 'target');
  root.appendChild(div);
  div.appendChild(createContentIDR());
}

describe('dom.idrefs', () => {
  const fixture = document.getElementById('fixture');
  const shadowSupported = axe.testUtils.shadowSupport.v1;
  const idrefs = axe.commons.dom.idrefs;

  it('should find referenced nodes by ID', () => {
    fixture.innerHTML =
      '<div aria-cats="target1 target2" id="start"></div>' +
      '<div id="target1"></div><div id="target2"></div>';

    const start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2')
      ];

    assert.deepEqual(idrefs(start, 'aria-cats'), expected, 'Should find it!');
  });

  (shadowSupported ? it : xit)(
    'should find only referenced nodes within the current root: shadow DOM',
    () => {
      // shadow DOM v1 - note: v0 is compatible with this code, so no need
      // to specifically test this
      fixture.innerHTML = '<div target="target"><div id="target"></div></div>';
      makeShadowTreeIDR(fixture.firstChild);
      const start = fixture.firstChild.shadowRoot.querySelector('.parent');
      const expected = [fixture.firstChild.shadowRoot.getElementById('target')];

      assert.deepEqual(
        idrefs(start, 'target'),
        expected,
        'should only find stuff in the shadow DOM'
      );
    }
  );

  (shadowSupported ? it : xit)(
    'should find only referenced nodes within the current root: document',
    () => {
      // shadow DOM v1 - note: v0 is compatible with this code, so no need
      // to specifically test this
      fixture.innerHTML =
        '<div target="target" class="parent"><div id="target"></div></div>';
      makeShadowTreeIDR(fixture.firstChild);
      const start = fixture.querySelector('.parent');
      const expected = [document.getElementById('target')];

      assert.deepEqual(
        idrefs(start, 'target'),
        expected,
        'should only find stuff in the document'
      );
    }
  );

  it('should insert null if a reference is not found', () => {
    fixture.innerHTML =
      '<div aria-cats="target1 target2 target3" id="start"></div>' +
      '<div id="target1"></div><div id="target2"></div>';

    const start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2'),
        null
      ];

    assert.deepEqual(idrefs(start, 'aria-cats'), expected, 'Should find it!');
  });

  it('should not fail when extra whitespace is used', () => {
    fixture.innerHTML =
      '<div aria-cats="    \ttarget1 \n  target2  target3 \n\t" id="start"></div>' +
      '<div id="target1"></div><div id="target2"></div>';

    const start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2'),
        null
      ];

    assert.deepEqual(idrefs(start, 'aria-cats'), expected, 'Should find it!');
  });

  describe('SerialVirtualNode', () => {
    it('should find referenced nodes by ID', () => {
      const root = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const start = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-cats': 'target1 target2'
        }
      });
      const target1 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target1'
      });
      const target2 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target2'
      });

      root.parent = null;
      root.children = [start, target1, target2];

      start.parent = root;
      target1.parent = root;
      target2.parent = root;

      assert.deepEqual(
        idrefs(start, 'aria-cats'),
        [target1, target2],
        'Should find it!'
      );
    });

    it('should throw for elements in shadow DOM', () => {
      const root = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const outsideTarget = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target'
      });
      const host = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const shadowParent = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          target: 'target'
        }
      });
      const shadowTarget = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target'
      });

      root.parent = null;
      root.children = [outsideTarget, host];

      outsideTarget.parent = root;

      host.parent = root;
      host.children = [shadowParent, shadowTarget];

      shadowParent.parent = host;
      shadowParent.shadowId = 'abc123';

      shadowTarget.parent = host;
      shadowTarget.shadowId = 'abc123';

      assert.throws(() => {
        idrefs(shadowParent, 'target');
      });
    });

    it('should find only referenced nodes within the current root: document', () => {
      const root = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const outsideTarget = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target'
      });
      const start = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          target: 'target'
        }
      });
      const host = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const shadowParent = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          target: 'target'
        }
      });
      const shadowTarget = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target'
      });

      root.parent = null;
      root.children = [outsideTarget, start, host];

      outsideTarget.parent = root;
      start.parent = root;

      host.parent = root;
      host.children = [shadowParent, shadowTarget];

      shadowParent.parent = host;
      shadowParent.shadowId = 'abc123';

      shadowTarget.parent = host;
      shadowTarget.shadowId = 'abc123';

      assert.deepEqual(
        idrefs(start, 'target'),
        [outsideTarget],
        'should only find stuff in the document'
      );
    });

    it('should insert null if a reference is not found', () => {
      const root = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const start = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-cats': 'target1 target2 target3'
        }
      });
      const target1 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target1'
      });
      const target2 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target2'
      });

      root.parent = null;
      root.children = [start, target1, target2];

      start.parent = root;
      target1.parent = root;
      target2.parent = root;

      assert.deepEqual(
        idrefs(start, 'aria-cats'),
        [target1, target2, null],
        'Should find it!'
      );
    });

    it('should not fail when extra whitespace is used', () => {
      const root = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const start = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-cats': '    \ttarget1 \n  target2  target3 \n\t'
        }
      });
      const target1 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target1'
      });
      const target2 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target2'
      });

      root.parent = null;
      root.children = [start, target1, target2];

      start.parent = root;
      target1.parent = root;
      target2.parent = root;

      assert.deepEqual(
        idrefs(start, 'aria-cats'),
        [target1, target2, null],
        'Should find it!'
      );
    });

    it('should throw if in disconnected tree', () => {
      const root = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      const start = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-cats': 'target1 target2'
        }
      });
      const target1 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target1'
      });
      const target2 = new axe.SerialVirtualNode({
        nodeName: 'div',
        id: 'target2'
      });

      root.parent = undefined;
      root.children = [start, target1, target2];

      start.parent = root;
      target1.parent = root;
      target2.parent = root;

      assert.throws(() => {
        idrefs(start, 'aria-cats');
      });
    });
  });
});
