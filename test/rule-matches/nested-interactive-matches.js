describe('nested-interactive-matches', function () {
  let fixture = document.querySelector('#fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(function () {
    rule = axe.utils.getRule('nested-interactive');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should match if element has children presentational', function () {
    let vNode = queryFixture('<button id="target"></button>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should match if aria element has children presentational', function () {
    let vNode = queryFixture('<div role="button" id="target"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should not match if element does not have children presentational', function () {
    let vNode = queryFixture('<a href="foo.html" id="target"></a>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should not match if element has no role', function () {
    let vNode = queryFixture('<span id="target"></span>');
    assert.isFalse(rule.matches(null, vNode));
  });
});
