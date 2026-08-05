describe('autocomplete-appropriate', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const evaluate = axe.testUtils.getCheckEvaluate('autocomplete-appropriate');

  beforeEach(() => {
    axe._tree = undefined;
  });

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  function autocompleteCheckParams(term, type, options) {
    return checkSetup(
      `<input autocomplete="${term}" type=${type} id="target" />`,
      options
    );
  }

  it('returns true for non-select elements', () => {
    ['div', 'button', 'select', 'textarea'].forEach(tagName => {
      const elm = document.createElement(tagName);
      elm.setAttribute('autocomplete', 'foo');
      elm.setAttribute('type', 'email');
      const params = checkSetup(elm);

      assert.isTrue(
        evaluate.apply(checkContext, params),
        `failed for ${tagName}`
      );
    });
  });

  it('returns true if the input type is in the map', () => {
    const options = { foo: ['url'] };
    const params = autocompleteCheckParams('foo', 'url', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is not in the map', () => {
    const options = { foo: ['url'] };
    const params = autocompleteCheckParams('foo', 'email', options);
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is text and the term is undefined', () => {
    const options = {};
    const params = autocompleteCheckParams('foo', 'text', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is tel and the term is off', () => {
    const options = {};
    const params = autocompleteCheckParams('off', 'tel', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is url and the term is on', () => {
    const options = {};
    const params = autocompleteCheckParams('on', 'url', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is foobar and the term is undefined', () => {
    const options = {};
    const params = autocompleteCheckParams('foo', 'foobar', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is email and the term is username', () => {
    const options = {};
    const params = autocompleteCheckParams('username', 'email', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is text and the term maps to an empty array', () => {
    const options = { foo: [] };
    const params = autocompleteCheckParams('foo', 'text', options);
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is month and term is bday-month', () => {
    const options = {};
    const params = autocompleteCheckParams('bday-month', 'month', options);
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is MONTH (case-insensitive & sanitized) and term is bday-month', () => {
    const options = {};
    const params = autocompleteCheckParams(
      'bday-month',
      '   MONTH    ',
      options
    );
    assert.isFalse(evaluate.apply(checkContext, params));
  });
});
