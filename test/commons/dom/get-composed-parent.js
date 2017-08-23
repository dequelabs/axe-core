/* global xit */
describe('dom.getComposedParent', function () {
  'use strict';
  var getComposedParent = axe.commons.dom.getComposedParent;
  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns the parentNode normally', function () {
    fixture.innerHTML = '<div id="parent"><div id="target"></div></div>';

    var actual = getComposedParent(document.getElementById('target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, document.getElementById('parent'));
  });

  it('returns null from the documentElement', function () {
    assert.isNull(
      getComposedParent(document.documentElement)
    );
  });

  (shadowSupport ? it : xit)('skip the slot node for slotted content', function () {
    fixture.innerHTML = '<div id="shadow"><div id="target"></div></div>';
    var shadowRoot = document.getElementById('shadow').attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div id="grand-parent">' +
      '<slot id="parent"></slot>' +
    '</div>';

    var actual = getComposedParent(fixture.querySelector('#target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, shadowRoot.querySelector('#grand-parent'));
  });

  (shadowSupport ? it : xit)('understands explicitly slotted nodes', function () {
    fixture.innerHTML = '<div id="shadow"><div id="target" slot="bar"></div></div>';
    var shadowRoot = document.getElementById('shadow').attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div id="grand-parent">' +
      '<slot name="foo"></slot>' +
      '<div id="parent"><slot name="bar"></slot></div>' +
    '</div>';

    var actual = getComposedParent(fixture.querySelector('#target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, shadowRoot.querySelector('#parent'));
  });

  (shadowSupport ? it : xit)('returns elements within a shadow tree', function () {
    fixture.innerHTML = '<div id="shadow"> content </div>';
    var shadowRoot = document.getElementById('shadow').attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div id="parent">' +
      '<slot id="target"></slot>' +
    '</div>';

    var actual = getComposedParent(shadowRoot.querySelector('#target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, shadowRoot.querySelector('#parent'));
  });

  (shadowSupport ? it : xit)('returns the host when it reaches the shadow root', function () {
    fixture.innerHTML = '<div id="parent"> content </div>';
    var shadowRoot = document.getElementById('parent').attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div id="target"> <slot></slot> </div>';

    var actual = getComposedParent(shadowRoot.querySelector('#target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, fixture.querySelector('#parent'));
  });
});
