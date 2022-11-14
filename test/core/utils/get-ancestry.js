describe('axe.utils.getAncestry', function () {
  'use strict';
  var fixture = document.getElementById('fixture');
  var shadowTest = axe.testUtils.shadowSupport.v1 ? it : xit;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(axe.utils.getAncestry);
  });

  it('should generate an ancestry selector', function () {
    fixture.innerHTML = '<div>1</div> <p>2</p> <p>3</p>';

    var sel1 = axe.utils.getAncestry(fixture.children[0]);
    assert.equal(sel1, 'html > body > div:nth-child(1) > div:nth-child(1)');
    assert.isNotNull(document.querySelector(sel1));

    var sel2 = axe.utils.getAncestry(fixture.children[1]);
    assert.equal(sel2, 'html > body > div:nth-child(1) > p:nth-child(2)');
    assert.isNotNull(document.querySelector(sel1));

    var sel3 = axe.utils.getAncestry(fixture.children[2]);
    assert.equal(sel3, 'html > body > div:nth-child(1) > p:nth-child(3)');
    assert.isNotNull(document.querySelector(sel1));
  });

  shadowTest('generates selectors of nested shadow trees', function () {
    var node = document.createElement('section');
    fixture.appendChild(node);

    var shadowRoot1 = node.attachShadow({ mode: 'open' });
    shadowRoot1.innerHTML = '<div><article><slot /></article</div>';

    var shadowRoot2 = shadowRoot1
      .querySelector('article')
      .attachShadow({ mode: 'open' });
    shadowRoot2.innerHTML = '<h1>Hello world</h1>';

    var target = shadowRoot2.querySelector('h1');
    var sel = axe.utils.getAncestry(target);
    assert.deepEqual(sel, [
      'html > body > div:nth-child(1) > section',
      'div > article',
      'h1'
    ]);
  });
});
