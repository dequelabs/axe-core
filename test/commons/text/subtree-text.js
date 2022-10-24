describe('text.subtreeText', function () {
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var subtreeText = axe.commons.text.subtreeText;

  it('concatinated the accessible name for child elements', function () {
    fixtureSetup('<span>foo</span> <span>bar</span> <span>baz</span>');
    var fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
    assert.equal(subtreeText(fixture), 'foo bar baz');
  });

  it('returns `` when the element is not named from contents', function () {
    fixtureSetup('<main>foo bar baz</main>');
    var main = axe.utils.querySelectorAll(axe._tree[0], 'main')[0];
    assert.equal(subtreeText(main), '');
  });

  it('adds spacing around "block-like" elements', function () {
    fixtureSetup(
      '<div>foo</div>' +
        '<h1>bar</h1>' +
        '<p>baz</p>' +
        '<blockquote>fizz</blockquote>' +
        '<pre>buzz</pre>'
    );
    var fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
    assert.equal(subtreeText(fixture), 'foo bar baz fizz buzz ');
  });

  it('does not add spacing around "inline-like" elements', function () {
    fixtureSetup(
      '<a>foo</a>' + '<b>bar</b>' + '<i>baz</i>' + '<s>fizz</s>' + '<u>buzz</u>'
    );
    var fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
    assert.equal(subtreeText(fixture), 'foobarbazfizzbuzz');
  });

  it('returns `` for embedded content', function () {
    fixtureSetup(
      '<video>foo</video>' +
        '<audio>foo</audio>' +
        '<canvas>foo</canvas>' +
        '<iframe>foo</iframe>' +
        '<svg>foo</svg>'
    );
    var children = axe._tree[0].children;
    assert.lengthOf(children, 5);
    children.forEach(function (embeddedContent) {
      assert.equal(subtreeText(embeddedContent), '');
    });
  });

  describe('context.processed', function () {
    beforeEach(function () {
      fixtureSetup('<h1>foo</h1>');
    });

    it('appends the element to context.processed to prevent duplication', function () {
      var h1 = axe.utils.querySelectorAll(axe._tree[0], 'h1')[0];
      var text = h1.children[0];
      var context = { processed: [] };
      subtreeText(h1, context);
      assert.deepEqual(context.processed, [h1, text]);
    });

    it('sets context.processed when it is undefined', function () {
      var h1 = axe.utils.querySelectorAll(axe._tree[0], 'h1')[0];
      var text = h1.children[0];
      var emptyContext = {};
      subtreeText(h1, emptyContext);
      assert.deepEqual(emptyContext.processed, [h1, text]);
    });

    it('returns `` when the element is in the `processed` array', function () {
      var h1 = axe.utils.querySelectorAll(axe._tree[0], 'h1')[0];
      var context = {
        processed: [h1]
      };
      assert.equal(subtreeText(h1, context), '');
    });
  });
});
