describe('matches.inSectioningContent', () => {
  const inSectioningContent = axe.commons.matches.inSectioningContent;
  const sectioningElms = axe.commons.standards
    .getElementsByContentType('sectioning')
    .concat('main');
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
      assert.isTrue(inSectioningContent(vNode));
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
      assert.isTrue(inSectioningContent(vNode));
    });
  }

  for (const role of sectioningRoles) {
    it(`returns true for a direct child of role=${role}`, () => {
      const vNode = queryFixture(html`
        <div role=${role}>
          <div id="target"></div>
        </div>
      `);
      assert.isTrue(inSectioningContent(vNode));
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
      assert.isTrue(inSectioningContent(vNode));
    });
  }

  it('returns true for sectioning element with role conflict', () => {
    const vNode = queryFixture(html`
      <main role="group" aria-label="true">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </main>
    `);
    assert.isTrue(inSectioningContent(vNode));
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
    assert.isTrue(inSectioningContent(vNode));
  });

  it('returns true for sectioning element internal role with role conflict', () => {
    const vNode = queryFixture(html`
      <testutils-element with-role="main" role="none" tabindex="0">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </testutils-element>
    `);
    assert.isTrue(inSectioningContent(vNode));
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
    assert.isFalse(inSectioningContent(vNode));
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
    assert.isFalse(inSectioningContent(vNode));
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
    assert.isFalse(inSectioningContent(vNode));
  });

  it('returns false for sectioning element with changed role', () => {
    const vNode = queryFixture(html`
      <main role="group">
        <div>
          <div>
            <div id="target"></div>
          </div>
        </div>
      </main>
    `);
    assert.isFalse(inSectioningContent(vNode));
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
    assert.isTrue(inSectioningContent(child2));
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
    assert.throws(() => inSectioningContent(child2));
  });
});
