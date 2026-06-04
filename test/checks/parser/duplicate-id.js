describe('duplicate-id', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if there is only one element with an ID', () => {
    fixture.innerHTML = '<div id="target"></div>';
    const node = fixture.querySelector('#target');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
    assert.equal(checkContext._data, node.id);
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('should return false if there are multiple elements with an ID', () => {
    fixture.innerHTML = '<div id="target"></div><div id="target"></div>';
    const node = fixture.querySelector('#target');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
    assert.equal(checkContext._data, node.id);
    assert.deepEqual(checkContext._relatedNodes, [node.nextSibling]);
  });

  it('should return remove duplicates', () => {
    assert.deepEqual(
      checks['duplicate-id'].after([
        { data: 'a' },
        { data: 'b' },
        { data: 'b' }
      ]),
      [{ data: 'a' }, { data: 'b' }]
    );
  });

  it('should ignore empty ids', () => {
    fixture.innerHTML =
      '<div data-testelm="1" id=""></div><div data-testelm="2"  id=""></div>';
    const node = fixture.querySelector('[data-testelm="1"]');

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
  });

  it('should allow overwrote ids', () => {
    fixture.innerHTML = html`
      <form data-testelm="1" id="target">
        <label
          >mylabel
          <input name="id" />
        </label>
      </form>
    `;
    const node = fixture.querySelector('[data-testelm="1"]');

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
  });

  it('should find duplicate IDs in the same shadow DOM', () => {
    const div = document.createElement('div');
    div.id = 'target';
    const shadow = div.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<span id="target"></span><p id="target">text</p>';
    const node = shadow.querySelector('span');
    fixture.appendChild(div);

    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(checkContext._relatedNodes, [shadow.querySelector('p')]);
  });

  it('should ignore duplicate IDs if they are in different document roots', () => {
    const node = document.createElement('div');
    node.id = 'target';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<span id="target"></span>';
    fixture.appendChild(node);

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
    assert.lengthOf(checkContext._relatedNodes, 0);
  });

  it('should ignore same IDs outside shadow trees', () => {
    const div = document.createElement('div');
    div.id = 'target';
    const shadow = div.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<span id="target"></span>';
    const node = shadow.querySelector('#target');
    fixture.appendChild(div);

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
    assert.lengthOf(checkContext._relatedNodes, 0);
  });

  it('should compare slotted content with the light DOM', () => {
    const node = document.createElement('div');
    node.id = 'target';
    node.innerHTML = '<p id="target">text</p>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<span id="target"><slot></slot></span>';
    fixture.appendChild(node);

    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-id').call(checkContext, node)
    );
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(checkContext._relatedNodes, [node.querySelector('p')]);
  });
});
