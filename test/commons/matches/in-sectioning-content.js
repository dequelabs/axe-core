describe('matches.inSectioningContent', () => {
  const inSectioningContent = axe.commons.matches.inSectioningContent;
  const sectioningElms = ['article', 'aside', 'nav', 'section', 'main'];
  const sectioningRoles = [
    'article',
    'complementary',
    'main',
    'navigation',
    'region'
  ];
  const { html, queryFixture } = axe.testUtils;

  for (const elm of sectioningElms) {
    it(`returns true for a direct child of <${elm}>`, () => {
      const vNode = queryFixture(html`
        <${elm}>
          <div id="target"></div>
        </${elm}>
      `);
      assert.isTrue(inSectioningContent(vNode, true));
    });

    it(`returns true for a descendant of <${elm}>`, () => {
      const vNode = queryFixture(html`
        <${elm}>
          <div>
            <div>
              <div id="target"></div>
            </div>
          </div>
        </${elm}>
      `);
      assert.isTrue(inSectioningContent(vNode, true));
    });
  }

  for (const role of sectioningRoles) {
    it(`returns true for a direct child of role=${role}`, () => {
      const vNode = queryFixture(html`
        <div role=${role}>
          <div id="target"></div>
        </div>
      `);
      assert.isTrue(inSectioningContent(vNode, true));
    });

    it(`returns true for a descendant of role=${role}`, () => {
      const vNode = queryFixture(html`
        <div role=${role}>
          <div>
            <div>
              <div id="target"></div>
            </div>
          </div>
        </div>
      `);
      assert.isTrue(inSectioningContent(vNode, true));
    });
  }

  it('returns true for sectioning role with global aria attr', () => {
    const vNode = queryFixture(html`
      <div role="main" aria-label="true">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </div>
    `);
    assert.isTrue(inSectioningContent(vNode, true));
  });

  it('returns true for sectioning element with role conflict', () => {
    const vNode = queryFixture(html`
      <main role="none" aria-label="true">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </main>
    `);
    assert.isTrue(inSectioningContent(vNode, true));
  });

  it('returns true for sectioning element internal role', () => {
    const vNode = queryFixture(html`
      <testutils-element with-role="main">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </testutils-element>
    `);
    assert.isTrue(inSectioningContent(vNode, true));
  });

  it('returns false for descendant of non-sectioning element', () => {
    const vNode = queryFixture(html`
      <div>
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </div>
    `);
    assert.isFalse(inSectioningContent(vNode, true));
  });

  it('returns false for descendant of non-sectioning role', () => {
    const vNode = queryFixture(html`
      <div role="button">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </div>
    `);
    assert.isFalse(inSectioningContent(vNode, true));
  });

  it('returns false for descendant of sectioning element with role=none', () => {
    const vNode = queryFixture(html`
      <main role="none">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </main>
    `);
    assert.isFalse(inSectioningContent(vNode, true));
  });

  it('returns false for descendant of sectioning element with role=presentation', () => {
    const vNode = queryFixture(html`
      <main role="presentation">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </main>
    `);
    assert.isFalse(inSectioningContent(vNode, true));
  });

  it('returns false for non-sectioning element internal role', () => {
    const vNode = queryFixture(html`
      <testutils-element with-role="group">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </testutils-element>
    `);
    assert.isFalse(inSectioningContent(vNode, true));
  });

  it('returns false for sectioning element with changed role', () => {
    const vNode = queryFixture(html`
      <main role="button" tabindex="0">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </main>
    `);
    assert.isFalse(inSectioningContent(vNode, true));
  });

  it('does not test itself', () => {
    const vNode = queryFixture(html`
      <div>
        <main id="target"></main>
      </div>
    `);
    assert.isFalse(inSectioningContent(vNode, true));
  });

  it('allows passing false', () => {
    const vNode = queryFixture(html`
      <main>
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </main>
    `);
    assert.isFalse(inSectioningContent(vNode, false));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'main'
    });
    const child1 = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    const child2 = new axe.SerialVirtualNode({
      nodeName: 'div'
    });

    child1.parent = serialNode;
    child2.parent = child1;
    serialNode.children = [child1];
    child1.children = [child2];
    assert.isTrue(inSectioningContent(child2, true));
  });

  it('throws if in incomplete tree', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    const child1 = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    const child2 = new axe.SerialVirtualNode({
      nodeName: 'div'
    });

    serialNode.parent = undefined;
    child1.parent = serialNode;
    child2.parent = child1;
    serialNode.children = [child1];
    child1.children = [child2];
    assert.throws(() => inSectioningContent(child2, true));
  });

  it('throws if only node is incomplete tree', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'div'
    });

    assert.throws(() => inSectioningContent(serialNode, true));
  });
});
