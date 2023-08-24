describe('axe.utils.getShadowSelector', () => {
  const fixture = document.getElementById('fixture');
  const shadowTest = axe.testUtils.shadowSupport.v1 ? it : xit;
  const getShadowSelector = axe.utils.getShadowSelector;

  function generator(node) {
    return node.nodeName.toLowerCase();
  }

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns generated output for light DOM nodes', () => {
    const h1 = document.createElement('h1');
    fixture.appendChild(h1);

    const selector = getShadowSelector(generator, h1);
    assert.equal(selector, 'h1');
  });

  it('passes node and options to generator', () => {
    let called = false;
    const node = document.createElement('h1');
    const options = { hello: 'world' };
    function generatorFn(arg1, arg2) {
      called = true;
      assert.equal(arg1, node);
      assert.equal(arg2, options);
    }

    getShadowSelector(generatorFn, node, options);
    assert.isTrue(called);
  });

  it('passes am empty object if no options are provided', () => {
    let called = false;
    const node = document.createElement('h1');
    function generatorFn(_, arg2) {
      called = true;
      assert.deepEqual(arg2, {});
    }

    getShadowSelector(generatorFn, node);
    assert.isTrue(called);
  });

  shadowTest('returns the output of the generator for light DOM', () => {
    fixture.innerHTML = '<div><h1>Hello world</h1></div>';
    const div = fixture.querySelector('div');
    const h1 = fixture.querySelector('h1');
    const shadowHost = div.attachShadow({ mode: 'open' });
    shadowHost.innerHTML = '<span><slot /></span>';

    assert.equal(getShadowSelector(generator, h1), 'h1');
  });

  shadowTest('returns an array of outputs for each shadow tree host', () => {
    const node = document.createElement('section');
    fixture.appendChild(node);

    const shadowRoot1 = node.attachShadow({ mode: 'open' });
    shadowRoot1.innerHTML = '<div><article><slot /></article</div>';

    const shadowRoot2 = shadowRoot1
      .querySelector('article')
      .attachShadow({ mode: 'open' });
    shadowRoot2.innerHTML = '<h1>Hello world</h1>';

    const target = shadowRoot2.querySelector('h1');
    const sel = getShadowSelector(generator, target);
    assert.deepEqual(sel, ['section', 'article', 'h1']);
  });
});
