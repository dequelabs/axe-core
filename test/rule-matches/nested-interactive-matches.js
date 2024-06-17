describe('nested-interactive-matches', function () {
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('nested-interactive');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should match if element has children presentational', function () {
    const vNode = queryFixture('<button id="target"></button>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should match if aria element has children presentational', function () {
    const vNode = queryFixture('<div role="button" id="target"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should not match if element does not have children presentational', function () {
    const vNode = queryFixture('<a href="foo.html" id="target"></a>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should not match if element has no role', function () {
    const vNode = queryFixture('<span id="target"></span>');
    assert.isFalse(rule.matches(null, vNode));
  });
});
