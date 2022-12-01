describe('axe.utils.isNodeInContext', () => {
  const { queryFixture } = axe.testUtils;
  const { Context } = axe._thisWillBeDeletedDoNotUse.base;
  const { isNodeInContext } = axe.utils;

  it('is true when the node is included', () => {
    const node = queryFixture(
      `<article> <section> <img id="target"> </section> </article>`
    );
    const context = new Context({ include: [['article']] }, axe._tree);
    assert.isTrue(isNodeInContext(node, context));
  });

  it('is false when the node is not included', () => {
    const node = queryFixture(
      `<article id="target"> <section> <img> </section> </article>`
    );
    const context = new Context({ include: [['section']] }, axe._tree);
    assert.isFalse(isNodeInContext(node, context));
  });

  describe('when the node is excluded', () => {
    it('is false when exclude is closer to the node than include', () => {
      const node = queryFixture(
        `<main> <article> <section> <img id="target"> </section> </article> </main>`
      );
      const context = new Context(
        {
          include: [['article']],
          exclude: [['main'], ['section']]
        },
        axe._tree
      );
      assert.isFalse(isNodeInContext(node, context));
    });

    it('is true when include is closer to the node than exclude', () => {
      const node = queryFixture(
        `<main> <article> <section> <img id="target"> </section> </article> </main>`
      );
      const context = new Context(
        {
          include: [['main'], ['section']],
          exclude: [['article']]
        },
        axe._tree
      );
      assert.isTrue(isNodeInContext(node, context));
    });
  });

  describe('when nodeIndex is undefined', () => {
    it('is true when the node is included', () => {
      const node = queryFixture(`<article> <img id="target">  </article>`);
      delete node.nodeIndex;
      delete node.parent.nodeIndex;
      const context = new Context({ include: [['article']] }, axe._tree);
      assert.isTrue(isNodeInContext(node, context));
    });

    it('is false when the node is not included', () => {
      const node = queryFixture(
        `<article id="target"> <section> <img> </section> </article>`
      );

      delete node.nodeIndex;
      delete node.children[0].nodeIndex;
      const context = new Context({ include: [['section']] }, axe._tree);
      assert.isFalse(isNodeInContext(node, context));
    });
  });
});
