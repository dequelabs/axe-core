describe('axe.utils.getAncestry', () => {
  'use strict';
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.getAncestry);
  });

  it('should generate an ancestry selector', () => {
    fixture.innerHTML = '<div>1</div> <p>2</p> <p>3</p>';

    const sel1 = axe.utils.getAncestry(fixture.children[0]);
    assert.equal(sel1, 'html > body > div:nth-child(1) > div:nth-child(1)');
    assert.isNotNull(document.querySelector(sel1));

    const sel2 = axe.utils.getAncestry(fixture.children[1]);
    assert.equal(sel2, 'html > body > div:nth-child(1) > p:nth-child(2)');
    assert.isNotNull(document.querySelector(sel1));

    const sel3 = axe.utils.getAncestry(fixture.children[2]);
    assert.equal(sel3, 'html > body > div:nth-child(1) > p:nth-child(3)');
    assert.isNotNull(document.querySelector(sel1));
  });

  it('should not throw when there is no parent', () => {
    const node = document.createElement('section');
    assert.doesNotThrow(() => axe.utils.getAncestry(node));
  });

  it('generates selectors of nested shadow trees', () => {
    const node = document.createElement('section');
    fixture.appendChild(node);

    const shadowRoot1 = node.attachShadow({ mode: 'open' });
    shadowRoot1.innerHTML = '<div><article><slot /></article</div>';

    const shadowRoot2 = shadowRoot1
      .querySelector('article')
      .attachShadow({ mode: 'open' });
    shadowRoot2.innerHTML = '<h1>Hello world</h1>';

    const target = shadowRoot2.querySelector('h1');
    const sel = axe.utils.getAncestry(target);
    assert.deepEqual(sel, [
      'html > body > div:nth-child(1) > section',
      'div > article',
      'h1'
    ]);
  });

  it('generates selectors of siblings in shadow tree', () => {
    const node = document.createElement('section');
    fixture.appendChild(node);

    const shadowRoot = node.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div>1</div> <div>2</div>';

    const sel1 = axe.utils.getAncestry(shadowRoot.children[0]);
    assert.deepEqual(sel1, [
      'html > body > div:nth-child(1) > section',
      'div:nth-child(1)'
    ]);

    const sel2 = axe.utils.getAncestry(shadowRoot.children[1]);
    assert.deepEqual(sel2, [
      'html > body > div:nth-child(1) > section',
      'div:nth-child(2)'
    ]);
  });
});
