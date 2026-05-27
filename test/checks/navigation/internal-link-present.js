describe('internal-link-present', () => {
  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should return true when an internal link is found', () => {
    const vNode = queryFixture('<div id="target"><a href="#haha">hi</a></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false when a hashbang URL was used', () => {
    const vNode = queryFixture('<div id="target"><a href="#!foo">hi</a></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false when a hash route URL was used', () => {
    const vNode = queryFixture(
      '<div id="target"><a href="#/home">hi</a></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false when a hashbang + slash route URL was used', () => {
    const vNode = queryFixture(
      '<div id="target"><a href="#!/home">hi</a></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should otherwise return false', () => {
    const vNode = queryFixture(
      '<div id="target"><a href="http://www.deque.com/#haha">hi</a></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return true when internal link is found in shadow dom', () => {
    const params = shadowCheckSetup(
      '<div id="target"></div>',
      '<a href="#haha">hi</a>'
    );
    const vNode = params[2];
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });
});
