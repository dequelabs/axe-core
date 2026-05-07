describe('scrollable-region-focusable-matches', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const shadowSupported = axe.testUtils.shadowSupport.v1;
  const rule = axe.utils.getRule('scrollable-region-focusable');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns false when element is not scrollable', () => {
    const target = queryFixture(
      '<section id="target">This element is not scrollable</section>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false when element has no visible children', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px;">
        <div style="display:none; height: 2000px; width: 100px;">
          <p>Content</p>
        </div>
      </div>
    `);
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false when element does not overflow', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px; overflow: auto;">
        <div style="height: 10px; width: 100x;">Content</div>
      </div>
    `);
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false when element is not scrollable (overflow=hidden)', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px; overflow: hidden">
        <div style="height: 2000px; width: 100px; background-color: pink;">
          <p>Content</p>
        </div>
      </div>
    `);
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns true when element is scrollable (overflow=auto)', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px; overflow: auto">
        <div style="height: 10px; width: 2000px; background-color: red;">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium
          </p>
        </div>
      </div>
    `);
    const actual = rule.matches(target.actualNode, target);
    assert.isTrue(actual);
  });

  it('returns false when element overflow is visible', () => {
    const target = queryFixture(
      '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: visible;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns true when element overflow is scroll', () => {
    const target = queryFixture(
      '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: scroll;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isTrue(actual);
  });

  it('returns false when element overflow is scroll but has no content', () => {
    const target = queryFixture(
      '<div id="target" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><div style="height: 15rem"></div></div>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false when element has combobox ancestor', () => {
    const target = queryFixture(
      '<div role="combobox"><ul id="target" role="listbox" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><li role="option" style="height: 15rem">Option</li></ul></div>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false when element is owned by combobox', () => {
    const target = queryFixture(
      '<input role="combobox" aria-owns="foo target"/><ul id="target" role="listbox" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><li role="option" style="height: 15rem">Option</li></ul>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false when element is controlled by combobox', () => {
    const target = queryFixture(
      '<input role="combobox" aria-controls="foo target"/><ul id="target" role="listbox" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><li role="option" style="height: 15rem">Option</li></ul>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false for combobox with tree', () => {
    const target = queryFixture(
      '<div role="combobox"><ul id="target" role="tree" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><li role="option" style="height: 15rem">Option</li></ul></div>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false for combobox with grid', () => {
    const target = queryFixture(
      '<div role="combobox"><ul id="target" role="grid" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><li role="option" style="height: 15rem">Option</li></ul></div>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false for combobox with dialog', () => {
    const target = queryFixture(
      '<div role="combobox"><ul id="target" role="dialog" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><li role="option" style="height: 15rem">Option</li></ul></div>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns true for combobox with non-valid role', () => {
    const target = queryFixture(
      '<div role="combobox"><ul id="target" role="section" style="width: 12em; height: 2em; border: dotted; overflow: scroll;"><li role="option" style="height: 15rem">Option</li><li role="option" style="height: 15rem">Option</li><li role="option" style="height: 15rem">Option</li><li role="option" style="height: 15rem">Option</li></ul></div>'
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isTrue(actual);
  });

  it('returns false when all text is visible without scrolling', () => {
    const target = queryFixture(
      html`<div id="target" style="width: 300px; overflow-y: auto">
        <p style="width: 600px">Contents</p>
      </div>`
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns false when all visible content is visible without scrolling', () => {
    const target = queryFixture(
      html`<div id="target" style="width: 300px; overflow-y: auto">
        <img src="#" width="100" height="100" />
      </div>`
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isFalse(actual);
  });

  it('returns true when any visible text is not visible without scrolling', () => {
    const target = queryFixture(
      html`<div id="target" style="width: 300px; overflow-y: auto">
        <p style="width: 600px">Contents</p>
        <p style="width: 600px">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
      </div>`
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isTrue(actual);
  });

  it('returns true when any visible content is not visible without scrolling', () => {
    const target = queryFixture(
      html`<div id="target" style="width: 300px; overflow-y: auto">
        <p width="600px">Contents</p>
        <img src="#" width="600" height="600" />
      </div>`
    );
    const actual = rule.matches(target.actualNode, target);
    assert.isTrue(actual);
  });

  describe('shadowDOM - scrollable-region-focusable-matches', () => {
    before(function () {
      if (!shadowSupported) {
        this.skip();
      }
    });

    afterEach(() => {
      axe._tree = undefined;
    });

    it('returns false when shadowDOM element does not overflow', () => {
      fixture.innerHTML = '<div></div>';

      const root = fixture.firstChild.attachShadow({ mode: 'open' });
      const slotted = document.createElement('div');
      slotted.innerHTML =
        '<p id="target" style="width: 12em; height: 2em; border: dotted;">Sed.</p>';
      root.appendChild(slotted);
      const tree = (axe._tree = axe.utils.getFlattenedTree(fixture.firstChild));
      const target = axe.utils.querySelectorAll(tree, 'p')[0];
      const actual = rule.matches(target.actualNode, target);
      assert.isFalse(actual);
    });

    it('returns true when shadowDOM element has overflow', () => {
      fixture.innerHTML = '<div></div>';

      const root = fixture.firstChild.attachShadow({ mode: 'open' });
      const slotted = document.createElement('div');
      slotted.innerHTML =
        '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: auto;">This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence.</p>';
      root.appendChild(slotted);
      const tree = (axe._tree = axe.utils.getFlattenedTree(fixture.firstChild));
      const target = axe.utils.querySelectorAll(tree, 'p')[0];
      const actual = rule.matches(target.actualNode, target);
      assert.isTrue(actual);
    });
  });
});
