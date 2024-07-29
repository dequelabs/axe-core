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

  it('is true even if summary is the only child', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target">Summary</summary>
      </details>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });
});
