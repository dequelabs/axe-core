describe('aria.isAccessibleRef', () => {
  const fixture = document.getElementById('fixture');
  const isAccessibleRef = axe.commons.aria.isAccessibleRef;
  const shadowSupport = axe.testUtils.shadowSupport.v1;

  function setLookup(attrs) {
    axe.configure({
      standards: {
        ariaAttrs: attrs
      }
    });
  }

  before(() => {
    axe._load({});
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe.reset();
  });

  it('returns false by default', () => {
    fixture.innerHTML = '<div id="foo"><div>';
    const node = document.getElementById('foo');
    assert.isFalse(isAccessibleRef(node));
  });

  it('returns true for IDs used in aria IDREF attributes', () => {
    setLookup({ 'aria-foo': { type: 'idref' } });
    fixture.innerHTML = '<div aria-foo="foo"></div><i id="foo"></i>';
    const node = document.getElementById('foo');
    assert.isTrue(isAccessibleRef(node));
  });

  it('returns true for IDs used in aria IDREFS attributes', () => {
    setLookup({ 'aria-bar': { type: 'idrefs' } });
    fixture.innerHTML =
      '<div aria-bar="foo bar"></div><i id="foo"></i><b id="bar"></b>';

    const node1 = document.getElementById('foo');
    const node2 = document.getElementById('bar');
    assert.isTrue(isAccessibleRef(node1));
    assert.isTrue(isAccessibleRef(node2));
  });

  it('returns true for IDs used in label[for] attributes', () => {
    setLookup({ 'aria-foo': { type: 'idref' } });
    fixture.innerHTML = '<label for="baz">baz</label><input id="baz">';
    const node = document.getElementById('baz');
    assert.isTrue(isAccessibleRef(node));
  });

  (shadowSupport ? it : xit)('works inside shadow DOM', () => {
    setLookup({ 'aria-bar': { type: 'idref' } });
    fixture.innerHTML = '<div id="foo"></div>';

    const shadow = document
      .getElementById('foo')
      .attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div aria-bar="bar"></div><b id="bar"></b>';

    const node = shadow.getElementById('bar');
    assert.isTrue(isAccessibleRef(node));
  });

  (shadowSupport ? it : xit)(
    'returns false for IDREFs inside shadow DOM',
    () => {
      setLookup({ 'aria-foo': { type: 'idrefs' } });
      fixture.innerHTML = '<div id="foo"><div id="bar"></div></div>';
      const node1 = document.getElementById('foo');
      const node2 = document.getElementById('bar');

      const shadow = node1.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div aria-foo="foo bar"><slot></slot></div>';

      assert.isFalse(isAccessibleRef(node1));
      assert.isFalse(isAccessibleRef(node2));
    }
  );

  (shadowSupport ? it : xit)(
    'returns false for IDREFs outside shadow DOM',
    () => {
      setLookup({ 'aria-bar': { type: 'idref' } });
      fixture.innerHTML =
        '<div id="foo" aria-bar="bar"><div aria-bar="bar"></div></div>';

      const shadow = document
        .getElementById('foo')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div id="bar"><slot></slot></div>';

      const node = shadow.getElementById('bar');
      assert.isFalse(isAccessibleRef(node));
    }
  );
});
