describe('internal-link-present', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let checkContext = axe.testUtils.MockCheckContext();
  let shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  let queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should return true when an internal link is found', function () {
    let vNode = queryFixture('<div id="target"><a href="#haha">hi</a></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false when a hashbang URL was used', function () {
    let vNode = queryFixture('<div id="target"><a href="#!foo">hi</a></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false when a hash route URL was used', function () {
    let vNode = queryFixture('<div id="target"><a href="#/home">hi</a></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false when a hashbang + slash route URL was used', function () {
    let vNode = queryFixture('<div id="target"><a href="#!/home">hi</a></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should otherwise return false', function () {
    let vNode = queryFixture(
      '<div id="target"><a href="http://www.deque.com/#haha">hi</a></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('internal-link-present')
        .call(checkContext, null, {}, vNode)
    );
  });

  (shadowSupported ? it : xit)(
    'should return true when internal link is found in shadow dom',
    function () {
      let params = shadowCheckSetup(
        '<div id="target"></div>',
        '<a href="#haha">hi</a>'
      );
      let vNode = params[2];
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('internal-link-present')
          .call(checkContext, null, {}, vNode)
      );
    }
  );
});
