describe('summary-interactive-matches', () => {
  const rule = axe.utils.getRule('summary-name');
  const { queryFixture, queryShadowFixture, html } = axe.testUtils;

  it('is true for an interactive summary', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target">Summary</summary>
        text
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('is false for summary without a details parent', () => {
    const vNode = queryFixture(html`
      <summary id="target">Summary</summary>
      text
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is false for summary with a details ancestor', () => {
    const vNode = queryFixture(html`
      <details>
        <div>
          <summary id="target">Summary</summary>
          text
        </div>
      </details>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is false for a non-first summary', () => {
    const vNode = queryFixture(html`
      <details>
        <summary>Summary</summary>
        <summary id="target">Summary</summary>
        text
      </details>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is false for s details parent in a different DOM tree', () => {
    const vNode = queryShadowFixture(
      html`
        <div id="shadow">
          <details><slot></slot></details>
        </div>
      `,
      html` <summary id="target">Hello World</summary> `
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is true even if summary has role=none', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="none">Summary</summary>
        text
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('is true the element has a widget role', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="button">Summary</summary>
        text
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('is true the element has a non-interactive role', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="heading">Summary</summary>
        text
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('is true even if summary has tabindex=-1', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" tabindex="-1">Summary</summary>
        text
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  describe('details has no content', () => {
    it('is false if summary is the only child', () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target">Summary</summary>
        </details>
      `);
      assert.isFalse(rule.matches(null, vNode));
    });

    it('is false with a comment sibling', () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target">Summary</summary>
          <!-- Comments don't count -->
        </details>
      `);
      assert.isFalse(rule.matches(null, vNode));
    });

    it('is false with an empty sibling elm', () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target">Summary</summary>
          <div><span></span></div>
        </details>
      `);
      assert.isFalse(rule.matches(null, vNode));
    });

    it('is false with a hidden text element', () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target">Summary</summary>
          <script>
            const hello = 'world';
          </script>
        </details>
      `);
      assert.isFalse(rule.matches(null, vNode));
    });

    it('is true if the content is a graphic', () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target">Summary</summary>
          <div><img alt="" /></div>
        </details>
      `);
      assert.isTrue(rule.matches(null, vNode));
    });

    it('is true if there are is a second summary with content', () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target">Summary</summary>
          <summary>actual content</summary>
        </details>
      `);
      assert.isTrue(rule.matches(null, vNode));
    });
  });
});
