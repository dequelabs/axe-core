describe('text.accessibleDescription', () => {
  const html = axe.testUtils.html;
  const queryFixture = axe.testUtils.queryFixture;
  const accessibleDescription = axe.commons.text.accessibleDescription;

  it('returns an empty string for non-element nodes', () => {
    const target = queryFixture(html`<div id="target">text</div>`);
    assert.equal(accessibleDescription(target.children[0]), '');
  });

  it('returns an empty string when there is no description', () => {
    const target = queryFixture(html`<input id="target" />`);
    assert.equal(accessibleDescription(target), '');
  });

  describe('aria-describedby', () => {
    it('returns the text of the referenced element', () => {
      const target = queryFixture(html`
        <input id="target" aria-describedby="desc" />
        <div id="desc">Hello world</div>
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });

    it('joins multiple references with a space', () => {
      const target = queryFixture(html`
        <input id="target" aria-describedby="desc1 desc2" />
        <div id="desc1">Hello</div>
        <div id="desc2">world</div>
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });

    it('returns an empty string when the reference does not exist', () => {
      const target = queryFixture(html`
        <input id="target" aria-describedby="missing" />
      `);
      assert.equal(accessibleDescription(target), '');
    });

    it('returns an empty string when the reference is empty', () => {
      const target = queryFixture(html`
        <input id="target" aria-describedby="desc" />
        <div id="desc"></div>
      `);
      assert.equal(accessibleDescription(target), '');
    });

    it('includes directly referenced hidden elements', () => {
      const target = queryFixture(html`
        <input id="target" aria-describedby="desc" />
        <div id="desc" aria-hidden="true">Hello world</div>
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });

    it('excludes hidden descendants of a visible reference', () => {
      const target = queryFixture(html`
        <input id="target" aria-describedby="desc" />
        <div id="desc">Hello <span aria-hidden="true">world</span></div>
      `);
      assert.equal(accessibleDescription(target), 'Hello');
    });

    it('takes precedence over aria-description and title', () => {
      const target = queryFixture(html`
        <input
          id="target"
          aria-label="name"
          aria-describedby="desc"
          aria-description="aria description"
          title="title"
        />
        <div id="desc">Hello world</div>
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });

    it('falls back to aria-description when the reference is empty', () => {
      const target = queryFixture(html`
        <input
          id="target"
          aria-describedby="missing"
          aria-description="Hello world"
        />
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });
  });

  describe('aria-description', () => {
    it('returns the sanitized aria-description', () => {
      const target = queryFixture(html`
        <input id="target" aria-description="  Hello   world " />
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });

    it('takes precedence over title', () => {
      const target = queryFixture(html`
        <input
          id="target"
          aria-label="name"
          aria-description="Hello world"
          title="title"
        />
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });
  });

  describe('title', () => {
    it('returns the title when it is not used as the name', () => {
      const target = queryFixture(html`
        <input id="target" aria-label="name" title="Hello world" />
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });

    it('returns an empty string when the title is used as the name', () => {
      const target = queryFixture(html`
        <input id="target" title="Hello world" />
      `);
      assert.equal(accessibleDescription(target), '');
    });

    it('returns an empty string when the title is the same as the name', () => {
      const target = queryFixture(html`
        <input id="target" aria-label="Hello world" title="Hello world" />
      `);
      assert.equal(accessibleDescription(target), '');
    });
  });

  describe('ElementInternals', () => {
    it('returns the text of elementInternals aria-describedby', () => {
      const target = queryFixture(html`
        <div id="desc">Hello world</div>
        <testutils-element
          id="target"
          with-aria-describedby="desc"
        ></testutils-element>
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });

    it('returns elementInternals aria-description', () => {
      const target = queryFixture(html`
        <testutils-element
          id="target"
          with-aria-description="Hello world"
        ></testutils-element>
      `);
      assert.equal(accessibleDescription(target), 'Hello world');
    });
  });
});
