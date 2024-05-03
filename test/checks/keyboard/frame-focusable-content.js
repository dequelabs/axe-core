describe('frame-focusable-content tests', function () {
  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let frameFocusableContent = axe.testUtils.getCheckEvaluate(
    'frame-focusable-content'
  );

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if element has no focusable content', function () {
    let vNode = queryFixture('<div id="target"><span>Hello</span></div>');
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return true if element is empty', function () {
    let vNode = queryFixture('<div id="target"></div>');
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return true if element only has text content', function () {
    let vNode = queryFixture('<div id="target">Hello</div>');
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return false if element has focusable content', function () {
    let vNode = queryFixture(
      '<div id="target"><span tabindex="0">Hello</span></div>'
    );
    assert.isFalse(frameFocusableContent(null, null, vNode));
  });

  it('should return false if element has natively focusable content', function () {
    let vNode = queryFixture(
      '<div id="target"><a href="foo.html">Hello</a></div>'
    );
    assert.isFalse(frameFocusableContent(null, null, vNode));
  });

  it('should return true if element is natively focusable but has tabindex=-1', function () {
    let vNode = queryFixture(
      '<div id="target"><button tabindex="-1">Hello</button></div>'
    );
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return false if element is natively focusable but has tabindex=0', function () {
    let vNode = queryFixture(
      '<div id="target"><button tabindex="0">Hello</button></div>'
    );
    assert.isFalse(frameFocusableContent(null, null, vNode));
  });
});
