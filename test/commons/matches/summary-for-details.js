describe('matches.summaryForDetails', () => {
  const summaryForDetails = axe.commons.matches.summaryForDetails;
  const { html, queryFixture } = axe.testUtils;

  it('returns true if first of summary for details', () => {
    const vNode = queryFixture(html`
      <details>
        <summary id="target"></summary>
        <summary></summary>
      </details>
    `);
    assert.isTrue(summaryForDetails(vNode));
  });

  it('only matches direct children', () => {
    const vNode = queryFixture(html`
      <details>
        <div>
          <summary></summary>
        </div>
        <summary id="target"></summary>
        <summary></summary>
      </details>
    `);
    assert.isTrue(summaryForDetails(vNode));
  });

  it('returns false if not first summary for details', () => {
    const vNode = queryFixture(html`
      <details>
        <summary></summary>
        <summary id="target"></summary>
      </details>
    `);
    assert.isFalse(summaryForDetails(vNode));
  });

  it('returns false if parent is not a details', () => {
    const vNode = queryFixture(html`
      <div>
        <summary id="target"></summary>
      </div>
    `);
    assert.isFalse(summaryForDetails(vNode));
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'details'
    });
    const child1 = new axe.SerialVirtualNode({
      nodeName: 'summary'
    });
    const child2 = new axe.SerialVirtualNode({
      nodeName: 'summary'
    });

    child1.parent = serialNode;
    child2.parent = serialNode;
    serialNode.children = [child1, child2];
    assert.isTrue(summaryForDetails(child1));
  });
});
