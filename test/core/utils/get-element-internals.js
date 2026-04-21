describe('utils.getElementInternals', () => {
  const getElementInternals = axe.utils.getElementInternals;
  let origElementInternals;

  before(() => {
    origElementInternals = window.ElementInternals;
    customElements.define(
      'utils-get-element-internals',
      class CustomButton extends HTMLElement {
        constructor() {
          super();
        }
      }
    );
  });

  afterEach(() => {
    delete globalThis.axeInternalsMap;
    window.ElementInternals = origElementInternals;
  });

  it('returns undefined for element without internals', () => {
    const node = document.createElement('utils-get-element-internals');

    assert.isUndefined(getElementInternals(node));
  });

  for (const prop of ['_internals', 'internals', 'internals_']) {
    it(`returns internals from prop "${prop}"`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      node[prop] = internals;

      assert.strictEqual(getElementInternals(node), internals);
    });

    it(`should not return internals from prop "${prop}" getter`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      Object.defineProperty(node, prop, {
        get() {
          return internals;
        }
      });

      assert.isUndefined(getElementInternals(node));
    });

    it(`should not return internals from prop "${prop}" if not of type ElementInternals`, () => {
      const node = document.createElement('utils-get-element-internals');
      node[prop] = 'hello world';

      assert.isUndefined(getElementInternals(node));
    });
  }

  for (const symbol of ['internals', 'privateInternals']) {
    it(`returns internals from "Symbol('${symbol}')"`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      node[Symbol(symbol)] = internals;

      assert.strictEqual(getElementInternals(node), internals);
    });

    it(`should not return internals from "Symbol('${symbol}')" getter`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      Object.defineProperty(node, Symbol(symbol), {
        get() {
          return internals;
        }
      });

      assert.isUndefined(getElementInternals(node));
    });

    it(`should not return internals from prop "Symbol('${symbol}')" if not of type ElementInternals`, () => {
      const node = document.createElement('utils-get-element-internals');
      node[Symbol(symbol)] = 'hello world';

      assert.isUndefined(getElementInternals(node));
    });
  }

  it('returns internals from global map', () => {
    const node = document.createElement('utils-get-element-internals');
    const internals = node.attachInternals();
    globalThis.axeInternalsMap = new WeakMap();
    globalThis.axeInternalsMap.set(node, internals);

    assert.strictEqual(getElementInternals(node), internals);
  });

  it(`uses props if element doesn't exist in the global map`, () => {
    const node = document.createElement('utils-get-element-internals');
    const internals = node.attachInternals();
    node._internals = internals;
    globalThis.axeInternalsMap = new WeakMap();

    assert.strictEqual(getElementInternals(node), internals);
  });

  it('uses global map over props', () => {
    const node = document.createElement('utils-get-element-internals');
    const internals = node.attachInternals();
    globalThis.axeInternalsMap = new WeakMap();
    globalThis.axeInternalsMap.set(node, internals);

    // can't attach internals twice so we'll create a fake internals object that is still an instanceof ElementInternals
    node._internals = {};
    Object.setPrototypeOf(node._internals, ElementInternals.prototype);

    assert.isTrue(node._internals instanceof ElementInternals);
    assert.strictEqual(getElementInternals(node), internals);
  });

  it('gets internals when getter and another prop is set', () => {
    const node = document.createElement('utils-get-element-internals');
    const internals = node.attachInternals();
    Object.defineProperty(node, '_internals', {
      get() {
        return internals;
      }
    });
    node.internals = internals;

    assert.strictEqual(getElementInternals(node), internals);
  });

  it('gets internals when getter and another symbol is set', () => {
    const node = document.createElement('utils-get-element-internals');
    const internals = node.attachInternals();
    Object.defineProperty(node, Symbol('internals'), {
      get() {
        return internals;
      }
    });
    node[Symbol('privateInternals')] = internals;

    assert.strictEqual(getElementInternals(node), internals);
  });

  it('guards when window.ElementInternals does not exist', () => {
    delete window.ElementInternals;
    const node = document.createElement('utils-get-element-internals');
    const internals = node.attachInternals();
    node._internals = internals;

    assert.isUndefined(getElementInternals(node));
  });
});
