describe('frame-focusable-content tests', () => {
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const frameFocusableContent = axe.testUtils.getCheckEvaluate(
    'frame-focusable-content'
  );

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if element has no focusable content', () => {
    const vNode = queryFixture('<div id="target"><span>Hello</span></div>');
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return true if element is empty', () => {
    const vNode = queryFixture('<div id="target"></div>');
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return true if element only has text content', () => {
    const vNode = queryFixture('<div id="target">Hello</div>');
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return false if element has focusable content', () => {
    const vNode = queryFixture(
      '<div id="target"><span tabindex="0">Hello</span></div>'
    );
    assert.isFalse(frameFocusableContent(null, null, vNode));
  });

  it('should return false if element has natively focusable content', () => {
    const vNode = queryFixture(
      '<div id="target"><a href="foo.html">Hello</a></div>'
    );
    assert.isFalse(frameFocusableContent(null, null, vNode));
  });

  it('should return true if element is natively focusable but has tabindex=-1', () => {
    const vNode = queryFixture(
      '<div id="target"><button tabindex="-1">Hello</button></div>'
    );
    assert.isTrue(frameFocusableContent(null, null, vNode));
  });

  it('should return false if element is natively focusable but has tabindex=0', () => {
    const vNode = queryFixture(
      '<div id="target"><button tabindex="0">Hello</button></div>'
    );
    assert.isFalse(frameFocusableContent(null, null, vNode));
  });
});
