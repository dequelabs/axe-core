describe('dom.getTabbableElements', function () {
  'use strict';

  let queryFixture = axe.testUtils.queryFixture;
  let injectIntoFixture = axe.testUtils.injectIntoFixture;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let getTabbableElementsFn = axe.commons.dom.getTabbableElements;

  it('returns tabbable elms when node contains tabbable element', function () {
    let virtualNode = queryFixture(
      '<div id="target">' +
        '<label>Enter description:' +
        '<textarea></textarea>' +
        '</label>' +
        '</div>'
    );
    let actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 1);
    assert.equal(actual[0].actualNode.nodeName.toUpperCase(), 'TEXTAREA');
  });

  it('returns empty [] when element does not contains tabbable element (using tabindex to take element out of tab-order)', function () {
    let virtualNode = queryFixture(
      '<div id="target">' + '<input tabindex="-1">' + '</div>'
    );
    let actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });

  it('returns empty [] when element contains disabled (tabbable) element', function () {
    let virtualNode = queryFixture(
      '<div id="target">' + '<button disabled>Submit Me</button>' + '</div>'
    );
    let actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });

  it('returns empty [] when element does not contain tabbable element', function () {
    let virtualNode = queryFixture(
      '<div id="target">' + '<p>Some text</p>' + '</div>'
    );
    let actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });

  (shadowSupported ? it : xit)(
    'returns tabbable elms when element contains tabbable element inside shadowDOM',
    function () {
      let fixture = injectIntoFixture('<div id="target"></div>`');
      let node = fixture.querySelector('#target');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<button>btn</button>';
      // re build tree after shadowDOM is constructed
      axe.setup(fixture);
      let virtualNode = axe.utils.getNodeFromTree(node);
      let actual = getTabbableElementsFn(virtualNode);
      assert.lengthOf(actual, 1);
      assert.equal(actual[0].actualNode.nodeName.toUpperCase(), 'BUTTON');
    }
  );

  (shadowSupported ? it : xit)(
    'returns empty [] when element contains disabled (tabbable) element inside shadowDOM',
    function () {
      let fixture = injectIntoFixture('<div id="target"></div>`');
      let node = fixture.querySelector('#target');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<button disabled>btn</button>';
      // re build tree after shadowDOM is constructed
      axe.setup(fixture);
      let virtualNode = axe.utils.getNodeFromTree(node);
      let actual = getTabbableElementsFn(virtualNode);
      assert.lengthOf(actual, 0);
    }
  );

  (shadowSupported ? it : xit)(
    'returns empty [] when element does not contain tabbable element inside shadowDOM',
    function () {
      let fixture = injectIntoFixture('<div id="target"></div>`');
      let node = fixture.querySelector('#target');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<p>I am not tabbable</p>';
      // re build tree after shadowDOM is constructed
      axe.setup(fixture);
      let virtualNode = axe.utils.getNodeFromTree(node);
      let actual = getTabbableElementsFn(virtualNode);
      assert.lengthOf(actual, 0);
    }
  );
});
