describe('no-focusable-content tests', function() {
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var noFocusableContent = axe.testUtils.getCheckEvaluate(
    'no-focusable-content'
  );
  var checkSetup = axe.testUtils.checkSetup;
  var check = checks['no-focusable-content'];
  var checkContext = new axe.testUtils.MockCheckContext();

  afterEach(function() {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if element has no focusable content', function() {
    var vNode = queryFixture('<button id="target"><span>Hello</span></button>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true if element is empty', function() {
    var vNode = queryFixture('<button id="target"></button>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true if element only has text content', function() {
    var vNode = queryFixture('<button id="target">Hello</button>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return false if element has focusable content', function() {
    var params = checkSetup(
      '<button id="target"><span tabindex="0">Hello</span></button>'
    );

    assert.isFalse(noFocusableContent.apply(checkContext, params));
    assert.deepEqual(checkContext._data, null);
    assert.deepEqual(checkContext._relatedNodes, [params[2].children[0]]);
  });

  it('should return false if element has natively focusable content', function() {
    var params = checkSetup(
      '<button id="target"><a href="foo.html">Hello</a></button>'
    );

    assert.isFalse(noFocusableContent.apply(checkContext, params));
    assert.deepEqual(checkContext._data, null);
    assert.deepEqual(checkContext._relatedNodes, [params[2].children[0]]);
  });

  it('should add each focusable child as related nodes', function() {
    var params = checkSetup(
      '<button id="target"><span tabindex="0">Hello</span><a href="foo.html">Hello</a></button>'
    );

    assert.isFalse(noFocusableContent.apply(checkContext, params));
    assert.deepEqual(checkContext._data, null);
    assert.deepEqual(checkContext._relatedNodes, [
      params[2].children[0],
      params[2].children[1]
    ]);
  });

  it('should return false if element has natively focusable content with negative tabindex', function() {
    var params = checkSetup(
      '<button id="target"><a href="foo.html" tabindex="-1">Hello</a></button>'
    );
    axe.utils.getFlattenedTree(document.documentElement);
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { messageKey: 'notHidden' });
    assert.deepEqual(checkContext._relatedNodes, [params[2].children[0]]);
  });

  it('should return true on span with tabindex=-1', function() {
    var vNode = queryFixture('<span id="target" role="text"> some text '
        +'<span tabIndex="-1">JavaScript is able to focus this</span> '
        +'</span>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true on aria-hidden span with tabindex=-1', function() {
    var vNode = queryFixture('<span id="target" role="text"> some text '
        +'<span tabIndex="-1" aria-hidden="true">JavaScript is able to focus this</span> '
        +'</span>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return false on span with tabindex=0', function() {
    var vNode = queryFixture('<span id="target" role="text"> some text '
        +'<span tabIndex="0">anyone is able to focus this</span> '
        +'</span>');
    assert.isFalse(noFocusableContent(null, null, vNode));
  });

});
