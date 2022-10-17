describe('aria.getOwnedVirtual', function () {
  'use strict';
  var aria = axe.commons.aria;
  var fixtureSetup = axe.testUtils.fixtureSetup;

  it('returns a list of children in order', function () {
    fixtureSetup(
      '<div id="target">' +
        '<h1>heading 1</h1>' +
        '<h2>heading 2</h2>' +
        '<h3>heading 3</h3>' +
        '</div>'
    );
    var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    var owned = aria.getOwnedVirtual(target);
    assert.lengthOf(owned, 3);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
  });

  it('adds aria-owned reffed elements to the children', function () {
    fixtureSetup(
      '<div id="target" aria-owns="hdr3 hdr4">' +
        '<h1>heading 1</h1>' +
        '<h2>heading 2</h2>' +
        '</div>' +
        '<h4 id="hdr4">heading 4</h4>' +
        '<h3 id="hdr3">heading 3</h3>'
    );
    var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    var owned = aria.getOwnedVirtual(target);
    assert.lengthOf(owned, 4);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
    assert.equal(owned[3].actualNode.nodeName.toUpperCase(), 'H4');
  });

  it('ignores whitespace-only aria-owned', function () {
    fixtureSetup(
      '<div id="target" aria-owns="  ">' +
        '<h1>heading 1</h1>' +
        '<h2>heading 2</h2>' +
        '<h3>heading 3</h3>' +
        '</div>'
    );
    var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    var owned = aria.getOwnedVirtual(target);
    assert.lengthOf(owned, 3);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
  });

  it('ignores broken aria-owned refs', function () {
    fixtureSetup(
      '<div id="target" aria-owns="nonexisting reference">' +
        '<h1>heading 1</h1>' +
        '<h2>heading 2</h2>' +
        '<h3>heading 3</h3>' +
        '</div>'
    );
    var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    var owned = aria.getOwnedVirtual(target);
    assert.lengthOf(owned, 3);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
  });

  it('includes text nodes', function () {
    fixtureSetup(
      '<div id="target" aria-owns="nonexisting reference">' +
        'text 1' +
        '<h1>heading 1</h1>' +
        'text 2' +
        '<h2>heading 2</h2>' +
        ' \t\n' +
        '</div>'
    );
    var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    var owned = aria.getOwnedVirtual(target);

    assert.lengthOf(owned, 5);
    assert.equal(owned[0].actualNode.textContent, 'text 1');
    assert.equal(owned[1].actualNode.textContent, 'heading 1');
    assert.equal(owned[2].actualNode.textContent, 'text 2');
    assert.equal(owned[3].actualNode.textContent, 'heading 2');
    assert.equal(owned[4].actualNode.textContent, ' \t\n');
  });

  it('returns an empty array if there are no owned elements', function () {
    fixtureSetup('<div id="target" aria-owns="nonexisting reference"></div>');
    var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    var owned = aria.getOwnedVirtual(target);
    assert.lengthOf(owned, 0);
  });
});
