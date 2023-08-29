describe('text.subtreeText', () => {
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const subtreeText = axe.commons.text.subtreeText;

  it('concatinated the accessible name for child elements', () => {
    fixtureSetup('<span>foo</span> <span>bar</span> <span>baz</span>');
    const fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
    assert.equal(subtreeText(fixture), 'foo bar baz');
  });

  it('returns `` when the element is not named from contents', () => {
    fixtureSetup('<main>foo bar baz</main>');
    const main = axe.utils.querySelectorAll(axe._tree[0], 'main')[0];
    assert.equal(subtreeText(main), '');
  });

  it('adds spacing around "block-like" elements', () => {
    fixtureSetup(
      '<div>foo</div>' +
        '<h1>bar</h1>' +
        '<p>baz</p>' +
        '<blockquote>fizz</blockquote>' +
        '<pre>buzz</pre>'
    );
    const fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
    assert.equal(subtreeText(fixture), 'foo bar baz fizz buzz ');
  });

  it('does not add spacing around "inline-like" elements', () => {
    fixtureSetup(
      '<a>foo</a>' + '<b>bar</b>' + '<i>baz</i>' + '<s>fizz</s>' + '<u>buzz</u>'
    );
    const fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
    assert.equal(subtreeText(fixture), 'foobarbazfizzbuzz');
  });

  it('returns `` for embedded content', () => {
    fixtureSetup(
      '<video>foo</video>' +
        '<audio>foo</audio>' +
        '<canvas>foo</canvas>' +
        '<iframe>foo</iframe>' +
        '<svg>foo</svg>'
    );
    const children = axe._tree[0].children;
    assert.lengthOf(children, 5);
    children.forEach(function (embeddedContent) {
      assert.equal(subtreeText(embeddedContent), '');
    });
  });

  describe('name from author', () => {
    it('returns `` with default context', () => {
      fixtureSetup('<main>foo</main>');
      const div = axe.utils.querySelectorAll(axe._tree[0], 'main')[0];
      const context = {};
      assert.equal(subtreeText(div, context), '');
    });

    it('returns content with { inLabelledByContext: true }', () => {
      fixtureSetup('<main>foo</main>');
      const div = axe.utils.querySelectorAll(axe._tree[0], 'main')[0];
      const context = { inLabelledByContext: true };
      assert.equal(subtreeText(div, context), 'foo');
    });

    it('returns content with { subtreeDescendant: true }', () => {
      fixtureSetup('<main>foo</main>');
      const div = axe.utils.querySelectorAll(axe._tree[0], 'main')[0];
      const context = { subtreeDescendant: true };
      assert.equal(subtreeText(div, context), 'foo');
    });

    it('returns `` for roles that have a value, even with inLabelledByContext and subtreeDescendant', () => {
      fixtureSetup('<select><option>foo</option</select>');
      const div = axe.utils.querySelectorAll(axe._tree[0], 'select')[0];
      const context = { inLabelledByContext: true, subtreeDescendant: true };
      assert.equal(subtreeText(div, context), '');
    });
  });

  describe('context.processed', () => {
    beforeEach(() => {
      fixtureSetup('<h1>foo</h1>');
    });

    it('appends the element to context.processed to prevent duplication', () => {
      const h1 = axe.utils.querySelectorAll(axe._tree[0], 'h1')[0];
      const text = h1.children[0];
      const context = { processed: [] };
      subtreeText(h1, context);
      assert.deepEqual(context.processed, [h1, text]);
    });

    it('sets context.processed when it is undefined', () => {
      const h1 = axe.utils.querySelectorAll(axe._tree[0], 'h1')[0];
      const text = h1.children[0];
      const emptyContext = {};
      subtreeText(h1, emptyContext);
      assert.deepEqual(emptyContext.processed, [h1, text]);
    });

    it('returns `` when the element is in the `processed` array', () => {
      const h1 = axe.utils.querySelectorAll(axe._tree[0], 'h1')[0];
      const context = {
        processed: [h1]
      };
      assert.equal(subtreeText(h1, context), '');
    });
  });
});
