describe('axe.utils.getShadowSelector', function () {
  var fixture = document.getElementById('fixture');
  var shadowTest = axe.testUtils.shadowSupport.v1 ? it : xit;
  var getShadowSelector = axe.utils.getShadowSelector;

  function generator(node) {
    return node.nodeName.toLowerCase();
  }

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns generated output for light DOM nodes', function () {
    var h1 = document.createElement('h1');
    fixture.appendChild(h1);

    var selector = getShadowSelector(generator, h1);
    assert.equal(selector, 'h1');
  });

  it('passes node and options to generator', function () {
    var called = false;
    var node = document.createElement('h1');
    var options = { hello: 'world' };
    function generator(arg1, arg2) {
      called = true;
      assert.equal(arg1, node);
      assert.equal(arg2, options);
    }

    getShadowSelector(generator, node, options);
    assert.isTrue(called);
  });

  it('passes am empty object if no options are provided', function () {
    var called = false;
    var node = document.createElement('h1');
    function generator(_, arg2) {
      called = true;
      assert.deepEqual(arg2, {});
    }

    getShadowSelector(generator, node);
    assert.isTrue(called);
  });

  shadowTest('returns the output of the generator for light DOM', function () {
    fixture.innerHTML = '<div><h1>Hello world</h1></div>';
    var div = fixture.querySelector('div');
    var h1 = fixture.querySelector('h1');
    var shadowHost = div.attachShadow({ mode: 'open' });
    shadowHost.innerHTML = '<span><slot /></span>';

    assert.equal(getShadowSelector(generator, h1), 'h1');
  });

  shadowTest(
    'returns an array of outputs for each shadow tree host',
    function () {
      var node = document.createElement('section');
      fixture.appendChild(node);

      var shadowRoot1 = node.attachShadow({ mode: 'open' });
      shadowRoot1.innerHTML = '<div><article><slot /></article</div>';

      var shadowRoot2 = shadowRoot1
        .querySelector('article')
        .attachShadow({ mode: 'open' });
      shadowRoot2.innerHTML = '<h1>Hello world</h1>';

      var target = shadowRoot2.querySelector('h1');
      var sel = getShadowSelector(generator, target);
      assert.deepEqual(sel, ['section', 'article', 'h1']);
    }
  );
});
