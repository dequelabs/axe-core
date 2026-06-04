describe('no-naming-method-matches', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const rule = axe.utils.getRule('aria-toggle-field-name');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns false for node `a[href]`', () => {
    const vNode = queryFixture('<a href="# role="checkbox" id="target"></a>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for node `map area[href]`', () => {
    const vNode = queryFixture(
      '<map><area id="target" href="#" role="checkbox"></map>'
    );
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is either INPUT, SELECT or TEXTAREA', () => {
    ['input', 'select', 'textarea'].forEach(node => {
      const vNode = queryFixture(
        `<${node} role="menuitemcheckbox" id="target"><${node}>`
      );
      const actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when node is IMG', () => {
    const vNode = queryFixture('<img id="target" role="menuitemradio">');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is not SVG', () => {
    const vNode = queryFixture('<svg id="target"></svg>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is BUTTON', () => {
    const vNode = queryFixture('<button id="target"></button>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false when node is SUMMARY', () => {
    const vNode = queryFixture('<summary id="target"></summary>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for INPUT of type `BUTTON`, `SUBMIT` or `RESET`', () => {
    ['button', 'submit', 'reset'].forEach(type => {
      const vNode = queryFixture(
        html`<input id="target" role="radio" type="${type}" />`
      );
      const actual = rule.matches(null, vNode);
      assert.isFalse(actual);
    });
  });

  it('returns false when role=`combobox` has a child input', () => {
    const vNode = queryFixture(
      '<div id="target" role="combobox"><input type="text"/></div>'
    );
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns false for the listbox popup of a role=`combobox`', () => {
    const vNode = queryFixture(html`
      <div role="combobox" aria-controls="target"></div>
      <div id="target" role="listbox"></div>
    `);
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });

  it('returns true for the dialog popup of a role=`combobox`', () => {
    const vNode = queryFixture(html`
      <div role="combobox" aria-controls="target"></div>
      <div id="target" role="dialog"></div>
    `);
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for a div with role=`button`', () => {
    const vNode = queryFixture('<div id="target" role="button"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });
});
