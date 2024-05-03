describe('aria.isAccessibleRef', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let isAccessibleRef = axe.commons.aria.isAccessibleRef;
  let shadowSupport = axe.testUtils.shadowSupport.v1;

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

  it('returns false by default', function () {
    fixture.innerHTML = '<div id="foo"><div>';
    let node = document.getElementById('foo');
    assert.isFalse(isAccessibleRef(node));
  });

  it('returns true for IDs used in aria IDREF attributes', function () {
    setLookup({ 'aria-foo': { type: 'idref' } });
    fixture.innerHTML = '<div aria-foo="foo"></div><i id="foo"></i>';
    let node = document.getElementById('foo');
    assert.isTrue(isAccessibleRef(node));
  });

  it('returns true for IDs used in aria IDREFS attributes', function () {
    setLookup({ 'aria-bar': { type: 'idrefs' } });
    fixture.innerHTML =
      '<div aria-bar="foo bar"></div><i id="foo"></i><b id="bar"></b>';

    let node1 = document.getElementById('foo');
    let node2 = document.getElementById('bar');
    assert.isTrue(isAccessibleRef(node1));
    assert.isTrue(isAccessibleRef(node2));
  });

  it('returns true for IDs used in label[for] attributes', function () {
    setLookup({ 'aria-foo': { type: 'idref' } });
    fixture.innerHTML = '<label for="baz">baz</label><input id="baz">';
    let node = document.getElementById('baz');
    assert.isTrue(isAccessibleRef(node));
  });

  (shadowSupport ? it : xit)('works inside shadow DOM', function () {
    setLookup({ 'aria-bar': { type: 'idref' } });
    fixture.innerHTML = '<div id="foo"></div>';

    let shadow = document.getElementById('foo').attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div aria-bar="bar"></div><b id="bar"></b>';

    let node = shadow.getElementById('bar');
    assert.isTrue(isAccessibleRef(node));
  });

  (shadowSupport ? it : xit)(
    'returns false for IDREFs inside shadow DOM',
    function () {
      setLookup({ 'aria-foo': { type: 'idrefs' } });
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      let node1 = document.getElementById('foo');
      let node2 = document.getElementById('bar');

      let shadow = node1.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div aria-foo="foo bar"><slot></slot></div>';

      assert.isFalse(isAccessibleRef(node1));
      assert.isFalse(isAccessibleRef(node2));
    }
  );

  (shadowSupport ? it : xit)(
    'returns false for IDREFs outside shadow DOM',
    function () {
      setLookup({ 'aria-bar': { type: 'idref' } });
      fixture.innerHTML =
        '<div id="foo" aria-bar="bar"><div aria-bar="bar"></div></div>';

      let shadow = document
        .getElementById('foo')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div id="bar"><slot></slot></div>';

      let node = shadow.getElementById('bar');
      assert.isFalse(isAccessibleRef(node));
    }
  );
});
