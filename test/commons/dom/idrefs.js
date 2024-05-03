function createContentIDR() {
  'use strict';
  let group = document.createElement('div');
  group.id = 'target';
  return group;
}

function makeShadowTreeIDR(node) {
  'use strict';
  let root = node.attachShadow({ mode: 'open' });
  let div = document.createElement('div');
  div.className = 'parent';
  div.setAttribute('target', 'target');
  root.appendChild(div);
  div.appendChild(createContentIDR());
}

describe('dom.idrefs', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should find referenced nodes by ID', function () {
    fixture.innerHTML =
      '<div aria-cats="target1 target2" id="start"></div>' +
      '<div id="target1"></div><div id="target2"></div>';

    let start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2')
      ];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });

  (shadowSupported ? it : xit)(
    'should find only referenced nodes within the current root: shadow DOM',
    function () {
      // shadow DOM v1 - note: v0 is compatible with this code, so no need
      // to specifically test this
      fixture.innerHTML = '<div target="target"><div id="target"></div></div>';
      makeShadowTreeIDR(fixture.firstChild);
      let start = fixture.firstChild.shadowRoot.querySelector('.parent');
      let expected = [fixture.firstChild.shadowRoot.getElementById('target')];

      assert.deepEqual(
        axe.commons.dom.idrefs(start, 'target'),
        expected,
        'should only find stuff in the shadow DOM'
      );
    }
  );

  (shadowSupported ? it : xit)(
    'should find only referenced nodes within the current root: document',
    function () {
      // shadow DOM v1 - note: v0 is compatible with this code, so no need
      // to specifically test this
      fixture.innerHTML =
        '<div target="target" class="parent"><div id="target"></div></div>';
      makeShadowTreeIDR(fixture.firstChild);
      let start = fixture.querySelector('.parent');
      let expected = [document.getElementById('target')];

      assert.deepEqual(
        axe.commons.dom.idrefs(start, 'target'),
        expected,
        'should only find stuff in the document'
      );
    }
  );

  it('should insert null if a reference is not found', function () {
    fixture.innerHTML =
      '<div aria-cats="target1 target2 target3" id="start"></div>' +
      '<div id="target1"></div><div id="target2"></div>';

    let start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2'),
        null
      ];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });

  it('should not fail when extra whitespace is used', function () {
    fixture.innerHTML =
      '<div aria-cats="    \ttarget1 \n  target2  target3 \n\t" id="start"></div>' +
      '<div id="target1"></div><div id="target2"></div>';

    let start = document.getElementById('start'),
      expected = [
        document.getElementById('target1'),
        document.getElementById('target2'),
        null
      ];

    assert.deepEqual(
      axe.commons.dom.idrefs(start, 'aria-cats'),
      expected,
      'Should find it!'
    );
  });
});
