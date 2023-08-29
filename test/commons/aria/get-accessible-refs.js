describe('aria.getAccessibleRefs', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var getAccessibleRefs = axe.commons.aria.getAccessibleRefs;
  var shadowSupport = axe.testUtils.shadowSupport.v1;

  function setLookup(attrs) {
    axe.configure({
      standards: {
        ariaAttrs: attrs
      }
    });
  }

  before(function () {
    axe._load({});
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe.reset();
  });

  it('returns empty array by default', function () {
    fixture.innerHTML = '<div id="foo"><div>';
    var node = document.getElementById('foo');
    assert.lengthOf(getAccessibleRefs(node), 0);
  });

  it('returns array of nodes for IDs used in aria IDREF attributes', function () {
    setLookup({ 'aria-foo': { type: 'idref' } });
    fixture.innerHTML = '<div id="ref" aria-foo="foo"></div><i id="foo"></i>';
    var node = document.getElementById('foo');
    var ref = document.getElementById('ref');
    assert.deepEqual(getAccessibleRefs(node), [ref]);
  });

  it('returns array of nodes for IDs used in aria IDREFS attributes', function () {
    setLookup({ 'aria-bar': { type: 'idrefs' } });
    fixture.innerHTML =
      '<div id="ref" aria-bar="foo bar"></div><i id="foo"></i><b id="bar"></b>';

    var node1 = document.getElementById('foo');
    var node2 = document.getElementById('bar');
    var ref = document.getElementById('ref');
    assert.deepEqual(getAccessibleRefs(node1), [ref]);
    assert.deepEqual(getAccessibleRefs(node2), [ref]);
  });

  it('returns array of nodes for IDs used in label[for] attributes', function () {
    setLookup({ 'aria-foo': { type: 'idref' } });
    fixture.innerHTML = '<label id="ref" for="baz">baz</label><input id="baz">';
    var node = document.getElementById('baz');
    var ref = document.getElementById('ref');
    assert.deepEqual(getAccessibleRefs(node), [ref]);
  });

  it('returns all nodes used in aria IDREF attributes', function () {
    setLookup({ 'aria-bar': { type: 'idrefs' } });
    fixture.innerHTML =
      '<div id="ref1" aria-bar="foo"><div id="ref2" aria-bar="foo"></div><i id="foo"></i>';

    var node = document.getElementById('foo');
    var ref1 = document.getElementById('ref1');
    var ref2 = document.getElementById('ref2');

    assert.deepEqual(getAccessibleRefs(node), [ref1, ref2]);
  });

  it('does not break on a custom .children property', function () {
    setLookup({ 'aria-foo': { type: 'idref' } });
    fixture.innerHTML = '<div id="ref" aria-foo="foo"></div><i id="foo"></i>';
    var node = document.getElementById('foo');
    var ref = document.getElementById('ref');

    Object.defineProperty(node, 'children', {
      value: ['#ref']
    });
    assert.deepEqual(getAccessibleRefs(node), [ref]);
  });

  describe('when JavaScript object names are used as IDs', function () {
    const ids = [
      'prototype',
      'constructor',
      '__proto__',
      'Element',
      'nodeName',
      'valueOf',
      'toString'
    ];
    for (const id of ids) {
      it(`does not break with id="${id}"`, function () {
        setLookup({ 'aria-bar': { type: 'idrefs' } });
        fixture.innerHTML = `<div id="ref" aria-bar="${ids.join(
          ' '
        )}"></div><i id="${id}"></i>`;

        var node = document.getElementById(id);
        var ref = document.getElementById('ref');
        assert.deepEqual(
          getAccessibleRefs(node),
          [ref],
          `Not equal for ID ${id}`
        );
      });
    }
  });

  (shadowSupport ? it : xit)('works inside shadow DOM', function () {
    setLookup({ 'aria-bar': { type: 'idref' } });
    fixture.innerHTML = '<div id="foo"></div>';

    var shadow = document.getElementById('foo').attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div id="ref" aria-bar="bar"></div><b id="bar"></b>';

    var node = shadow.getElementById('bar');
    var ref = shadow.getElementById('ref');
    assert.deepEqual(getAccessibleRefs(node), [ref]);
  });

  (shadowSupport ? it : xit)(
    'returns empty array for IDREFs inside shadow DOM',
    function () {
      setLookup({ 'aria-foo': { type: 'idrefs' } });
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      var node1 = document.getElementById('foo');
      var node2 = document.getElementById('bar');

      var shadow = node1.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div aria-foo="foo bar"><slot></slot></div>';

      assert.lengthOf(getAccessibleRefs(node1), 0);
      assert.lengthOf(getAccessibleRefs(node2), 0);
    }
  );

  (shadowSupport ? it : xit)(
    'returns empty array for IDREFs outside shadow DOM',
    function () {
      setLookup({ 'aria-bar': { type: 'idref' } });
      fixture.innerHTML =
        '<div id="foo" aria-bar="bar"><div aria-bar="bar"></div></div>';

      var shadow = document
        .getElementById('foo')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div id="bar"><slot></slot></div>';

      var node = shadow.getElementById('bar');
      assert.lengthOf(getAccessibleRefs(node), 0);
    }
  );

  (shadowSupport ? it : xit)('separates IDREFs by roots', function () {
    setLookup({ 'aria-bar': { type: 'idref' } });
    fixture.innerHTML =
      '<div id="foo"></div><div id="outside" aria-bar="foo"></div><div id="shadow"></div>';

    var shadow = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div id="foo"><div id="inside" aria-bar="foo"></div>';

    var outsideNode = document.getElementById('foo');
    var outsideRef = document.getElementById('outside');
    var insideNode = shadow.getElementById('foo');
    var insideRef = shadow.getElementById('inside');
    assert.deepEqual(getAccessibleRefs(outsideNode), [outsideRef]);
    assert.deepEqual(getAccessibleRefs(insideNode), [insideRef]);
  });
});
