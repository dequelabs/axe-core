describe('no-focusable-content tests', function () {
  var queryFixture = axe.testUtils.queryFixture;
  var noFocusableContent = axe.testUtils.getCheckEvaluate(
    'no-focusable-content'
  );
  var checkSetup = axe.testUtils.checkSetup;
  var check = checks['no-focusable-content'];
  var checkContext = new axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true if element has no focusable content', function () {
    var vNode = queryFixture('<button id="target"><span>Hello</span></button>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true if element is empty', function () {
    var vNode = queryFixture('<button id="target"></button>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true if element only has text content', function () {
    var vNode = queryFixture('<button id="target">Hello</button>');
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true if element has content which is focusable (tabindex=0) and does not have a widget role', function () {
    var params = checkSetup(
      '<button id="target"><span tabindex="0">Hello</span></button>'
    );

    assert.isTrue(noFocusableContent.apply(checkContext, params));
  });

  it('should return true if element has content which has negative tabindex and non-widget role', function () {
    var vNode = queryFixture(
      '<button id="target"><span tabindex="-1">Hello</span></button>'
    );
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return false if element has content which has negative tabindex and an explicit widget role', function () {
    var params = checkSetup(
      '<button id="target"><span role="link" tabindex="-1">Hello</span></button>'
    );

    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { messageKey: 'notHidden' });
    assert.deepEqual(checkContext._relatedNodes, [params[2].children[0]]);
  });

  it('should return false if element has content which is natively focusable and has a widget role', function () {
    var params = checkSetup(
      '<button id="target"><a href="foo.html">Hello</a></button>'
    );

    assert.isFalse(noFocusableContent.apply(checkContext, params));
    assert.deepEqual(checkContext._data, null);
    assert.deepEqual(checkContext._relatedNodes, [params[2].children[0]]);
  });

  it('should add each focusable child as related nodes', function () {
    var params = checkSetup(
      '<button id="target"><input type="checkbox"><a href="foo.html">Hello</a></button>'
    );

    assert.isFalse(noFocusableContent.apply(checkContext, params));
    assert.deepEqual(checkContext._data, null);
    assert.deepEqual(checkContext._relatedNodes, [
      params[2].children[0],
      params[2].children[1]
    ]);
  });

  it('should return false if element has natively focusable widget role content with negative tabindex', function () {
    var params = checkSetup(
      '<button id="target"><a href="foo.html" tabindex="-1">Hello</a></button>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, { messageKey: 'notHidden' });
    assert.deepEqual(checkContext._relatedNodes, [params[2].children[0]]);
  });

  it('should return true if element has content which is natively focusable and has a widget role but is disabled', function () {
    var vNode = queryFixture(
      '<button id="target"><input value="hello" disabled></button>'
    );
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return false if "disabled" is specified on an element which doesn\'t allow it', function () {
    var params = checkSetup(
      '<button id="target"><a href="foo.html" disabled>Hello</a></button>'
    );
    assert.isFalse(noFocusableContent.apply(checkContext, params));
  });

  it('should return true on span with negative tabindex (focusable, does not have a widget role)', function () {
    var vNode = queryFixture(
      '<span id="target" role="text"> some text ' +
        '<span tabIndex="-1">JavaScript is able to focus this</span> ' +
        '</span>'
    );
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true on aria-hidden span with negative tabindex (focusable, does not have a widget role)', function () {
    var vNode = queryFixture(
      '<span id="target" role="text"> some text ' +
        '<span tabIndex="-1" aria-hidden="true">JavaScript is able to focus this</span> ' +
        '</span>'
    );
    assert.isTrue(noFocusableContent(null, null, vNode));
  });

  it('should return true on nested span with tabindex=0 (focusable, does not have a widget role)', function () {
    var vNode = queryFixture(
      '<span id="target" role="text"> some text ' +
        '<span tabIndex="0">anyone is able to focus this</span> ' +
        '</span>'
    );
    assert.isTrue(noFocusableContent(null, null, vNode));
  });
});
