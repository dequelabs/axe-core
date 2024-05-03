/* global xit */
describe('dom.getComposedParent', function () {
  'use strict';
  let getComposedParent = axe.commons.dom.getComposedParent;
  let fixture = document.getElementById('fixture');
  let shadowSupport = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns the parentNode normally', function () {
    fixture.innerHTML = '<div id="parent"><div id="target"></div></div>';

    let actual = getComposedParent(document.getElementById('target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, document.getElementById('parent'));
  });

  it('returns null from the documentElement', function () {
    assert.isNull(getComposedParent(document.documentElement));
  });

  (shadowSupport ? it : xit)(
    'skip the slot node for slotted content',
    function () {
      fixture.innerHTML = '<div id="shadow"><div id="target"></div></div>';
      let shadowRoot = document
        .getElementById('shadow')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<div id="grand-parent">' + '<slot id="parent"></slot>' + '</div>';

      let actual = getComposedParent(fixture.querySelector('#target'));
      assert.instanceOf(actual, Node);
      assert.equal(actual, shadowRoot.querySelector('#grand-parent'));
    }
  );

  (shadowSupport ? it : xit)(
    'understands explicitly slotted nodes',
    function () {
      fixture.innerHTML =
        '<div id="shadow"><div id="target" slot="bar"></div></div>';
      let shadowRoot = document
        .getElementById('shadow')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<div id="grand-parent">' +
        '<slot name="foo"></slot>' +
        '<div id="parent"><slot name="bar"></slot></div>' +
        '</div>';

      let actual = getComposedParent(fixture.querySelector('#target'));
      assert.instanceOf(actual, Node);
      assert.equal(actual, shadowRoot.querySelector('#parent'));
    }
  );

  (shadowSupport ? it : xit)(
    'returns elements within a shadow tree',
    function () {
      fixture.innerHTML = '<div id="shadow"> content </div>';
      let shadowRoot = document
        .getElementById('shadow')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<div id="parent">' + '<slot id="target"></slot>' + '</div>';

      let actual = getComposedParent(shadowRoot.querySelector('#target'));
      assert.instanceOf(actual, Node);
      assert.equal(actual, shadowRoot.querySelector('#parent'));
    }
  );

  (shadowSupport ? it : xit)(
    'returns the host when it reaches the shadow root',
    function () {
      fixture.innerHTML = '<div id="parent"> content </div>';
      let shadowRoot = document
        .getElementById('parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<div id="target"> <slot></slot> </div>';

      let actual = getComposedParent(shadowRoot.querySelector('#target'));
      assert.instanceOf(actual, Node);
      assert.equal(actual, fixture.querySelector('#parent'));
    }
  );
});
