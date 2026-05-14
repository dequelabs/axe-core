describe('gather-internals.walkTree', () => {
  const { walkTree, elementInternalsMap, _reset, getAncestry } =
    globalThis._gatherInternals;
  const html = axe.testUtils.html;
  const fixture = axe.testUtils.fixture;
  const ariaProps = [
    'ariaAtomic',
    'ariaAutoComplete',
    'ariaBrailleLabel',
    'ariaBrailleRoleDescription',
    'ariaBusy',
    'ariaChecked',
    'ariaColCount',
    'ariaColIndex',
    'ariaColIndexText',
    'ariaColSpan',
    'ariaCurrent',
    'ariaDescription',
    'ariaDisabled',
    'ariaExpanded',
    'ariaHasPopup',
    'ariaHidden',
    'ariaInvalid',
    'ariaKeyShortcuts',
    'ariaLabel',
    'ariaLevel',
    'ariaLive',
    'ariaModal',
    'ariaMultiline',
    'ariaMultiSelectable',
    'ariaOrientation',
    'ariaPlaceholder',
    'ariaPosInSet',
    'ariaPressed',
    'ariaReadOnly',
    'ariaRelevant',
    'ariaRequired',
    'ariaRoleDescription',
    'ariaRowCount',
    'ariaRowIndex',
    'ariaRowIndexText',
    'ariaRowSpan',
    'ariaSelected',
    'ariaSetSize',
    'ariaSort',
    'ariaValueMax',
    'ariaValueMin',
    'ariaValueNow',
    'ariaValueText',
    'role'
  ];
  const idrefProps = ['ariaActiveDescendantElement'];
  const idrefsProps = [
    'ariaControlsElements',
    'ariaDescribedByElements',
    'ariaDetailsElements',
    'ariaErrorMessageElements',
    'ariaFlowToElements',
    'ariaLabelledByElements',
    'ariaOwnsElements'
  ];
  let axeInitial;

  before(() => {
    axeInitial = globalThis.axe;

    // the `form` and `labels` properties are only readable (and won't throw) if the
    // element is form associated
    customElements.define(
      'gather-internals-element',
      class GatherInternalsElement extends HTMLElement {
        static formAssociated = true;

        constructor() {
          super();
          this._internals = this.attachInternals();
        }
      }
    );
  });

  afterEach(() => {
    _reset();
  });

  after(() => {
    globalThis.axe = axeInitial;
  });

  it('sets the array with expected properties', () => {
    fixture.innerHTML = html`<testutils-element></testutils-element>`;

    walkTree();

    assert.isTrue(Array.isArray(elementInternalsMap));
    assert.lengthOf(elementInternalsMap, 1);
    assert.hasAllKeys(elementInternalsMap[0], ['ancestry', 'internals']);
  });

  it('finds internals on node', () => {
    fixture.innerHTML = html`<testutils-element></testutils-element>`;

    walkTree();
    assert.lengthOf(elementInternalsMap, 1);

    const { internals } = elementInternalsMap[0];
    assert.equal(internals.role, 'button');
  });

  it('finds internals in nested node', () => {
    fixture.innerHTML = html` <div>
      <div>
        <testutils-element></testutils-element>
      </div>
    </div>`;

    walkTree();
    assert.lengthOf(elementInternalsMap, 1);

    const { internals } = elementInternalsMap[0];
    assert.equal(internals.role, 'button');
  });

  it('finds all internals', () => {
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
    assert.lengthOf(elementInternalsMap, 2);

    assert.equal(elementInternalsMap[0].internals.role, 'button');
    assert.equal(elementInternalsMap[1].internals.role, 'input');
  });

  it('finds internals in shadow root', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html`
      <div>
        <testutils-element></testutils-element>
      </div>
    `;
    fixture.append(host);

    walkTree();
    assert.lengthOf(elementInternalsMap, 1);

    const { internals } = elementInternalsMap[0];
    assert.equal(internals.role, 'button');
  });

  it('sets the ancestry', () => {
    fixture.innerHTML = html`<testutils-element></testutils-element>`;
    const node = fixture.querySelector('testutils-element');
    const ancestry = getAncestry(node);

    walkTree();
    assert.equal(elementInternalsMap[0].ancestry, ancestry);
  });

  it('sets the ancestry of shadow element', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html`
      <div>
        <testutils-element></testutils-element>
      </div>
    `;
    fixture.append(host);
    const node = shadowRoot.querySelector('testutils-element');
    const ancestry = getAncestry(node);

    walkTree();
    assert.deepEqual(elementInternalsMap[0].ancestry, ancestry);
  });

  it('resolves idref property as ancestry', () => {
    fixture.innerHTML = html`<testutils-element>
      <div id="child"></div>
    </testutils-element>`;
    const node = fixture.querySelector('testutils-element');
    const activeChild = fixture.querySelector('#child');
    node._internals.ariaActiveDescendantElement = activeChild;
    const ancestry = getAncestry(activeChild);

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.deepEqual(internals.ariaActiveDescendantElement, {
      type: 'HTMLElement',
      value: ancestry
    });
  });

  it('ignores unattached idref element', () => {
    fixture.innerHTML = html`<testutils-element></testutils-element>`;
    const node = fixture.querySelector('testutils-element');
    const activeChild = document.createElement('div');
    node._internals.ariaActiveDescendantElement = activeChild;

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.isUndefined(internals.ariaActiveDescendantElement);
  });

  it('resolves idrefs property as array of ancestries', () => {
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

    const { internals } = elementInternalsMap[0];
    assert.deepEqual(internals.ariaLabelledByElements, {
      type: 'NodeList',
      value: [ancestry1, ancestry2]
    });
  });

  it('ignores unattached idrefs element', () => {
    fixture.innerHTML = html`
      <div id="label1">hello</div>
      <testutils-element></testutils-element>
    `;
    const node = fixture.querySelector('testutils-element');
    const label1 = fixture.querySelector('#label1');
    const label2 = document.createElement('div');
    node._internals.ariaLabelledByElements = [label1, label2];
    const ancestry1 = getAncestry(label1);

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.deepEqual(internals.ariaLabelledByElements, {
      type: 'NodeList',
      value: [ancestry1]
    });
  });

  it('ignores prop if all idrefs elements are unattached', () => {
    fixture.innerHTML = html`
      <div id="label1">hello</div>
      <testutils-element></testutils-element>
    `;
    const node = fixture.querySelector('testutils-element');
    const label1 = document.createElement('div');
    const label2 = document.createElement('div');
    node._internals.ariaLabelledByElements = [label1, label2];

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.isUndefined(internals.ariaLabelledByElements);
  });

  it('captures all aria internal properties', () => {
    fixture.innerHTML = html`
      <testutils-element></testutils-element>
      <div id="elm"></div>
    `;
    const node = fixture.querySelector('testutils-element');
    const elm = fixture.querySelector('#elm');

    for (const prop of ariaProps) {
      node._internals[prop] = 'value';
    }
    for (const prop of idrefProps) {
      node._internals[prop] = elm;
    }
    for (const prop of idrefsProps) {
      node._internals[prop] = [elm];
    }
    const ancestry = getAncestry(elm);

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.hasAllKeys(internals, [...ariaProps, ...idrefProps, ...idrefsProps]);

    for (const prop of ariaProps) {
      assert.equal(internals[prop], 'value');
    }
    for (const prop of idrefProps) {
      assert.deepEqual(internals[prop], {
        type: 'HTMLElement',
        value: ancestry
      });
    }
    for (const prop of idrefsProps) {
      assert.deepEqual(internals[prop], {
        type: 'NodeList',
        value: [ancestry]
      });
    }
  });

  it('ignores non-aria internals property', () => {
    fixture.innerHTML = html`<testutils-element></testutils-element>`;
    const node = fixture.querySelector('testutils-element');
    node._internals.ignoredProp = 'ignored';

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.isUndefined(internals.ignoredProp);
  });

  it('captures the internals "form" property', () => {
    fixture.innerHTML = html`<form id="form">
      <gather-internals-element></gather-internals-element>
    </form>`;
    const node = fixture.querySelector('gather-internals-element');
    const form = fixture.querySelector('#form');
    node._internals.form = form;
    const ancestry = getAncestry(form);

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.deepEqual(internals.form, {
      type: 'HTMLElement',
      value: ancestry
    });
  });

  it('captures the internals "labels" property', () => {
    fixture.innerHTML = html`<form id="form">
      <gather-internals-element id="elm"></gather-internals-element>
      <label for="elm">Hello</label>
    </form>`;
    const label = fixture.querySelector('label');
    const ancestry = getAncestry(label);

    walkTree();

    const { internals } = elementInternalsMap[0];
    assert.deepEqual(internals.labels, {
      type: 'NodeList',
      value: [ancestry]
    });
  });

  it('works without needing axe', () => {
    try {
      globalThis.axe = null;

      // this should test each piece of the code, so use shadow dom and an idref prop
      const host = document.createElement('div');
      const shadowRoot = host.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = html`
        <div>
          <testutils-element>
            <div id="child"></div>
          </testutils-element>
        </div>
      `;
      fixture.append(host);
      const node = shadowRoot.querySelector('testutils-element');
      const activeChild = shadowRoot.querySelector('#child');
      node._internals.ariaActiveDescendantElement = activeChild;
      node._internals.ariaLabelledByElements = [activeChild];
      const ancestry = getAncestry(activeChild);

      assert.doesNotThrow(() => {
        walkTree();
      });

      const { internals } = elementInternalsMap[0];
      assert.equal(internals.role, 'button');
      assert.deepEqual(internals.ariaActiveDescendantElement, {
        type: 'HTMLElement',
        value: ancestry
      });
      assert.deepEqual(internals.ariaLabelledByElements, {
        type: 'NodeList',
        value: [ancestry]
      });
    } finally {
      // reset before test ends so global afterEach has axe instance
      globalThis.axe = axeInitial;
    }
  });
});
