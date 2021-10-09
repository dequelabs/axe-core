describe('no-focusable-content tests', function() {
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var noFocusableContent = axe.testUtils.getCheckEvaluate(
    'no-focusable-content'
  );

  afterEach(function() {
    fixture.innerHTML = '';
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
    var vNode = queryFixture(
      '<button id="target"><span tabindex="0">Hello</span></button>'
    );
    assert.isFalse(noFocusableContent(null, null, vNode));
  });

  it('should return false if element has natively focusable content', function() {
    var vNode = queryFixture(
      '<button id="target"><a href="foo.html">Hello</a></button>'
    );
    assert.isFalse(noFocusableContent(null, null, vNode));
  });
  
});
