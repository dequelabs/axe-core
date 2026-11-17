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

  it('is true for the first summary after another element', () => {
    const vNode = queryFixture(html`
      <details>
        <p>Details</p>
        <summary id="target">Summary</summary>
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

  it('is false for details parent in a different DOM tree', () => {
    const vFixture = queryShadowFixture(
      html`
        <div id="shadow">
          <summary>Hello World</summary>
        </div>
      `,
      html`
        <details>
          <slot></slot>
          text
        </details>
      `
    );
    const vNode = axe.utils.querySelectorAll(vFixture, 'summary')[0];
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is true when focusability overrides role=none', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="none">Summary</summary>
        text
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('is true when tabindex=-1 retains a presentational role conflict', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="presentation" tabindex="-1">Summary</summary>
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('is false when a presentational role has no conflict', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="presentation" inert>Summary</summary>
      </details>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is false when the element has an explicit button role', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="button">Summary</summary>
        text
      </details>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is false when the element has an explicit heading role', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="heading">Summary</summary>
        text
      </details>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  ['', 'not-a-valid-role', 'command'].forEach(role => {
    it(`is true when role="${role}" provides no valid semantic role`, () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target" role="${role}">Summary</summary>
        </details>
      `);
      assert.isTrue(rule.matches(null, vNode));
    });
  });

  it('is false for a valid role after an invalid token', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="not-a-valid-role button">Summary</summary>
      </details>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('uses the first valid role when it is presentational', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="none heading">Summary</summary>
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('uses the first valid role before a presentational fallback', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target" role="heading none">Summary</summary>
      </details>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  ['doc-abstract', 'not-a-valid-role doc-abstract'].forEach(role => {
    it(`is false for the valid DPUB role in role="${role}"`, () => {
      const vNode = queryFixture(html`
        <details>
          <summary id="target" role="${role}">Summary</summary>
        </details>
      `);
      assert.isFalse(rule.matches(null, vNode));
    });
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

  it('is true even if summary is the only child', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target">Summary</summary>
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });
});
