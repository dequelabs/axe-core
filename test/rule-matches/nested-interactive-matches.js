describe('nested-interactive-matches', function() {
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule;

  beforeEach(function() {
    rule = axe._audit.rules.find(function(rule) {
      return rule.id === 'nested-interactive';
    });
  });

  afterEach(function() {
    fixture.innerHTML = '';
  });

  it('should match if element has children presentational', function() {
    var vNode = queryFixture('<button id="target"></button>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should not match if element does not have children presentational', function() {
    var vNode = queryFixture('<a href="foo.html" id="target"></a>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should not match if element has no role', function() {
    var vNode = queryFixture('<span id="target"></span>');
    assert.isFalse(rule.matches(null, vNode));
  });
});
