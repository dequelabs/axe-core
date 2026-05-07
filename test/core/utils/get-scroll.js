describe('axe.utils.getScroll', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('is a function', () => {
    assert.isFunction(axe.utils.getScroll);
  });

  it('returns undefined when element is not scrollable', () => {
    const target = queryFixture(
      '<section id="target">This element is not scrollable</section>'
    );
    const actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when element does not overflow', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px;">
        <div style="height: 10px; width: 10px; background-color: pink;">
          <p>Content</p>
        </div>
      </div>
    `);
    const actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when element overflow is hidden', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px; overflow: hidden">
        <div style="height: 2000px; width: 100px; background-color: pink;">
          <p>Content</p>
        </div>
      </div>
    `);
    const actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when element overflow is clip', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px; overflow: clip">
        <div style="height: 2000px; width: 100px; background-color: pink;">
          <p>Content</p>
        </div>
      </div>
    `);
    const actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns scroll offset when element overflow is auto', () => {
    const target = queryFixture(html`
      <div id="target" style="height: 200px; width: 200px; overflow: auto">
        <div style="height: 10px; width: 2000px; background-color: red;">
          <p>Content</p>
        </div>
      </div>
    `);
    const actual = axe.utils.getScroll(target.actualNode);
    assert.isDefined(actual);
    assert.hasAllKeys(actual, ['elm', 'top', 'left']);
    assert.equal(actual.top, 0);
    assert.equal(actual.left, 0);
  });

  it('returns undefined when element overflow is visible', () => {
    const target = queryFixture(
      '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: visible;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
    );
    const actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns scroll offset when element overflow is scroll', () => {
    const target = queryFixture(
      '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: scroll;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
    );
    const actual = axe.utils.getScroll(target.actualNode);
    assert.isDefined(actual);
    assert.hasAllKeys(actual, ['elm', 'top', 'left']);
    assert.equal(actual.top, 0);
    assert.equal(actual.left, 0);
  });

  describe('shadowDOM - axe.utils.getScroll', () => {
    before(function () {
      if (!shadowSupported) {
        this.skip();
      }
    });

    it('returns undefined when shadowDOM element does not overflow', () => {
      fixture.innerHTML = '<div></div>';

      const root = fixture.firstChild.attachShadow({ mode: 'open' });
      const slotted = document.createElement('div');
      slotted.innerHTML =
        '<p id="target" style="width: 12em; height: 2em; border: dotted;">Sed.</p>';
      root.appendChild(slotted);
      const tree = axe.utils.getFlattenedTree(fixture.firstChild);
      const target = axe.utils.querySelectorAll(tree, 'p')[0];
      const actual = axe.utils.getScroll(target.actualNode);
      assert.isUndefined(actual);
    });

    it('returns scroll offset when shadowDOM element has overflow', () => {
      fixture.innerHTML = '<div></div>';

      const root = fixture.firstChild.attachShadow({ mode: 'open' });
      const slotted = document.createElement('div');
      slotted.innerHTML =
        '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: auto;">This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence.</p>';
      root.appendChild(slotted);
      const tree = axe.utils.getFlattenedTree(fixture.firstChild);
      const target = axe.utils.querySelectorAll(tree, 'p')[0];
      const actual = axe.utils.getScroll(target.actualNode);
      assert.isDefined(actual);
      assert.hasAllKeys(actual, ['elm', 'top', 'left']);
      assert.equal(actual.top, 0);
      assert.equal(actual.left, 0);
    });
  });
});
