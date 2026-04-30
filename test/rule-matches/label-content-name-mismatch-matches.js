describe('label-content-name-mismatch-matches tests', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const rule = axe.utils.getRule('label-content-name-mismatch');

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('returns false if given element has no role', () => {
    const vNode = queryFixture(
      '<div id="target" aria-label="what color is the sky?"></div>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element role is not supported with name from contents', () => {
    const vNode = queryFixture(
      '<div aria-label="choose your age" id="target" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20 %</div>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if implicit element role is overridden to a role that does not support name from contents', () => {
    const vNode = queryFixture(html`
      <div id="labelForStatusMsg">Status message</div>
      <button id="target" role="status" aria-labelledby="labelForStatusMsg">
        Your changes were automatically saved.
      </button>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element does not have accessible name attributes (`aria-label` or `aria-labelledby`)', () => {
    const vNode = queryFixture(
      '<button id="target" name="link">Until the very end.</button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element has empty accessible name via `aria-label`', () => {
    const vNode = queryFixture(
      '<button id="target" name="link" aria-label="">Until the very end.</button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true if element has accessible name via `aria-label`', () => {
    const vNode = queryFixture(
      '<button id="target" name="link" aria-label="Until">Until the very end.</button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true if element has accessible name via `aria-labelledby`', () => {
    const vNode = queryFixture(html`
      <div role="button" id="target" aria-labelledby="foo">some content</div>
      <div id="foo">Foo text</div>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false if element has empty accessible name (`aria-labelledby`)', () => {
    const vNode = queryFixture(html`
      <div role="button" id="target" aria-labelledby="foo">some content</div>
      <div id="foo"></div>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element has empty accessible name (`aria-labelledby`) because idref does not exist', () => {
    const vNode = queryFixture(html`
      <div role="button" id="target" aria-labelledby="doesNotExist">
        some content
      </div>
      <div id="idExists">Right Label</div>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true if element has accessible name (`aria-labelledby`) - multiple refs', () => {
    const vNode = queryFixture(html`
      <div role="button" id="target" aria-labelledby="bar baz foo">
        some content
      </div>
      <div id="foo">Foo</div>
      <div id="bar">Bar</div>
      <div id="baz">Baz</div>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false for non-widget role', () => {
    const vNode = queryFixture(
      '<a role="contentinfo" id="target" aria-label="some content">Content Information</a>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for non-widget role that does support name from content', () => {
    const vNode = queryFixture(
      '<div id="target" role="tooltip" aria-label="OK">Next</div>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for empty text content', () => {
    const vNode = queryFixture(
      '<button id="target" aria-label="close"></button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for non text content', () => {
    const vNode = queryFixture(
      '<button id="target" aria-label="close"><i class="fa fa-icon-close"></i></button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for hidden (non visible) text content', () => {
    const vNode = queryFixture(
      '<button id="target" aria-label="close"><span style="display:none">I am hidden</span></button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when visible text is combination of alphanumeric and emoji characters', () => {
    const vNode = queryFixture(
      '<button id="target" aria-label="I would like a burger">I would like a 🍔 </button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when visible text is combination of alphanumeric and punctuation characters', () => {
    const vNode = queryFixture(
      '<button id="target" aria-label="next page">next page &gt;</button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
