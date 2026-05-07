describe('gather-internals.walkTree', () => {
  const { walkTree, elementInternalsMap, _reset, getAncestry } =
    globalThis._gatherInternals;
  const html = axe.testUtils.html;
  const fixture = axe.testUtils.fixture;

  afterEach(() => {
    _reset();
  });

  it('should find internals on node', () => {
    fixture.innerHTML = html`<testutils-element></testutils-element>`;

    walkTree();
    assert.lengthOf(Object.keys(elementInternalsMap), 1);

    const internals = Object.values(elementInternalsMap)[0];
    assert.equal(internals.role, 'button');
  });

  it('should find internals in nested node', () => {
    fixture.innerHTML = html` <div>
      <div>
        <testutils-element></testutils-element>
      </div>
    </div>`;

    walkTree();
    assert.lengthOf(Object.keys(elementInternalsMap), 1);

    const internals = Object.values(elementInternalsMap)[0];
    assert.equal(internals.role, 'button');
  });

  it('should find all internals', () => {
    fixture.innerHTML = html` <div>
      <div>
        <testutils-element></testutils-element>
      </div>
      <div>
        <div>
          <div>
            <testutils-element with-role="input"></testutils-element>
          </div>
        </div>
      </div>
    </div>`;

    walkTree();
    assert.lengthOf(Object.keys(elementInternalsMap), 2);

    const internals = Object.values(elementInternalsMap);
    assert.equal(internals[0].role, 'button');
    assert.equal(internals[1].role, 'input');
  });

  it('should find internals in shadow root', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html`
      <div>
        <testutils-element></testutils-element>
      </div>
    `;
    fixture.append(host);

    walkTree();
    assert.lengthOf(Object.keys(elementInternalsMap), 1);

    const internals = Object.values(elementInternalsMap)[0];
    assert.equal(internals.role, 'button');
  });

  it('should set the key as the ancestry', () => {
    fixture.innerHTML = html`<testutils-element></testutils-element>`;
    const node = fixture.querySelector('testutils-element');
    const ancestry = getAncestry(node);

    walkTree();
    const key = Object.keys(elementInternalsMap)[0];
    assert.equal(key, ancestry);
  });

  it('should resole idref property as ancestry', () => {
    fixture.innerHTML = html`<testutils-element>
      <div id="child"></div>
    </testutils-element>`;
    const node = fixture.querySelector('testutils-element');
    const activeChild = fixture.querySelector('div');
    node._internals.ariaActiveDescendantElement = activeChild;
    const ancestry = getAncestry(activeChild);

    walkTree();

    const internals = Object.values(elementInternalsMap)[0];
    assert.equal(internals.ariaActiveDescendantElement, ancestry);
  });

  it('should resole idrefs property as ancestry', () => {
    fixture.innerHTML = html`
      <div id="label1">hello</div>
      <div id="label2">world</div>
      <testutils-element></testutils-element>
    `;
    const node = fixture.querySelector('testutils-element');
    const label1 = fixture.querySelector('#label1');
    const label2 = fixture.querySelector('#label2');
    node._internals.ariaLabelledByElements = [label1, label2];
    const ancestry1 = getAncestry(label1);
    const ancestry2 = getAncestry(label2);

    walkTree();

    const internals = Object.values(elementInternalsMap)[0];
    assert.deepEqual(internals.ariaLabelledByElements, [ancestry1, ancestry2]);
  });
});
