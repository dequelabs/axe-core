describe('utils.getElementInternals', () => {
  const getElementInternals = axe.utils.getElementInternals;

  before(() => {
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
  });

  it('should return undefined for element without internals', () => {
    const node = document.createElement('utils-get-element-internals');

    assert.isUndefined(getElementInternals(node));
  });

  it('should get internals from global map', () => {
    const node = document.createElement('utils-get-element-internals');
    const internals = node.attachInternals();
    globalThis.axeInternalsMap = new WeakMap();
    globalThis.axeInternalsMap.set(node, internals);

    assert.strictEqual(getElementInternals(node), internals);
  });

  for (const prop of ['_internals', 'internals', 'internals_']) {
    it(`should get internals from prop "${prop}"`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      node[prop] = internals;

      assert.strictEqual(getElementInternals(node), internals);
    });

    it(`should not get internals from prop "${prop}" getter`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      Object.defineProperty(node, prop, {
        get() {
          return internals;
        }
      });

      assert.isUndefined(getElementInternals(node));
    });
  }

  for (const symbol of ['internals', 'privateInternals']) {
    it(`should get internals from "Symbol('${symbol}')"`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      node[Symbol(symbol)] = internals;

      assert.strictEqual(getElementInternals(node), internals);
    });

    it(`should not get internals from Symbol('${symbol}')" getter`, () => {
      const node = document.createElement('utils-get-element-internals');
      const internals = node.attachInternals();
      Object.defineProperty(node, Symbol(symbol), {
        get() {
          return internals;
        }
      });

      assert.isUndefined(getElementInternals(node));
    });
  }
});
